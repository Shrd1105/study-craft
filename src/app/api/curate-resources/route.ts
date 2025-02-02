import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import CuratedResource from "@/models/curatedResource";
import { ObjectId } from 'mongodb';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

interface TavilyResponse {
  results: TavilySearchResult[];
  answer?: string;
}

interface Resource {
  title: string;
  url: string;
  description: string;
  benefits: string[];
}

interface ExtractResult {
  url: string;
  raw_content: string;
}

interface ExtractResponse {
  results: ExtractResult[];
}

// Function to search using Tavily API with proper error handling
async function searchTavily(subject: string): Promise<TavilyResponse> {
  try {
    if (!TAVILY_API_KEY) {
      console.error("TAVILY_API_KEY is not configured");
      return { results: [], answer: '' };
    }

    // First use search API to get relevant results
    const searchResponse = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TAVILY_API_KEY}`
      },
      body: JSON.stringify({
        query: `best learning resources and courses for ${subject}`,
        search_depth: "advanced",
        include_answer: true,
        max_results: 10,
        include_domains: [
          "coursera.org",
          "edx.org", 
          "udemy.com",
          "khanacademy.org",
          "freecodecamp.org",
          "w3schools.com",
          "mit.edu",
          "stanford.edu"
        ]
      })
    });

    if (!searchResponse.ok) {
      throw new Error(`Tavily search failed: ${searchResponse.statusText}`);
    }

    const searchData = await searchResponse.json() as TavilyResponse;
    console.log("Tavily search results:", searchData);

    // Then use extract API to get more details about each URL
    const validUrls = searchData.results
      .map((result: TavilySearchResult) => result.url)
      .filter((url: string) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      });

    const extractResponse = await fetch('https://api.tavily.com/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TAVILY_API_KEY}`
      },
      body: JSON.stringify({
        urls: validUrls
      })
    });

    if (!extractResponse.ok) {
      throw new Error(`Tavily extract failed: ${extractResponse.statusText}`);
    }

    const extractData = await extractResponse.json() as ExtractResponse;
    console.log("Tavily extract results:", extractData);

    // Combine search and extract results
    const enhancedResults = searchData.results.map((result: TavilySearchResult) => {
      const extractInfo = extractData.results.find((e: ExtractResult) => e.url === result.url);
      return {
        ...result,
        content: extractInfo?.raw_content || result.content
      };
    });

    return {
      results: enhancedResults,
      answer: searchData.answer
    };
  } catch (error) {
    console.error("Tavily API error:", error);
    throw error;
  }
}

// Function to curate resources using Gemini
async function curateResourcesWithGemini(searchData: TavilyResponse, subject: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const relevantContent = searchData.results
    .filter(result => result.score > 0.7)
    .map(result => ({
      title: result.title,
      url: result.url,
      description: result.content.substring(0, 200) + "..."
    }));

  // Default high-quality resources if search fails
  const defaultResources = [
    {
      title: "freeCodeCamp",
      url: `https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(subject)}`,
      description: "Free coding tutorials and interactive lessons",
      benefits: ["Interactive learning", "Project-based practice"]
    },
    {
      title: "Khan Academy",
      url: `https://www.khanacademy.org/search?search_again=1&page_search_query=${encodeURIComponent(subject)}`,
      description: "Free educational resources and video tutorials",
      benefits: ["Structured learning path", "Video explanations"]
    },
    {
      title: "MIT OpenCourseWare",
      url: `https://ocw.mit.edu/search/?q=${encodeURIComponent(subject)}`,
      description: "Free access to MIT course materials",
      benefits: ["University-level content", "Comprehensive materials"]
    }
  ];

  const prompt = `As an expert educator, curate the top 5 most relevant and high-quality free learning resources for ${subject}.

${searchData.answer ? `Context from search:\n${searchData.answer}\n` : ''}

${relevantContent.length > 0 
  ? `Found resources:\n${JSON.stringify(relevantContent, null, 2)}\n` 
  : `Using default resources:\n${JSON.stringify(defaultResources, null, 2)}\n`
}

Create a curated list of the 5 best resources. For each resource:
1. Verify it's freely accessible
2. Ensure it's suitable for learning ${subject}
3. Include a brief but informative description
4. Add specific benefits for learners

Return the list in this JSON format:
{
  "resources": [
    {
      "title": "Resource name",
      "url": "Resource URL",
      "description": "Brief description",
      "benefits": ["Benefit 1", "Benefit 2"]
    }
  ]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean and parse the response
    const cleanedText = text.replace(/```json\s*|\s*```/g, '').trim();
    const resources = JSON.parse(cleanedText);

    if (!resources.resources || !Array.isArray(resources.resources)) {
      throw new Error("Invalid resources format");
    }

    // Validate each resource has required fields
    resources.resources.forEach((resource: Resource) => {
      if (!resource.title || !resource.url || !resource.description || !Array.isArray(resource.benefits)) {
        throw new Error("Invalid resource format");
      }
    });

    return resources;
  } catch (error) {
    console.error("Error processing Gemini response:", error);
    // Return default resources if there's an error
    return { resources: defaultResources };
  }
}

// Function to transform resource data to match schema
function transformResourceData(resources: Resource[]): Array<{
  title: string;
  link: string;
  type: string;
  description: string;
}> {
  return resources.map(resource => ({
    title: resource.title,
    link: resource.url,
    type: determineResourceType(resource.url),
    description: resource.description
  }));
}

// Helper function to determine resource type
function determineResourceType(url: string): string {
  if (url.includes('youtube.com')) return 'video';
  if (url.includes('github.com')) return 'repository';
  if (url.includes('coursera.org') || url.includes('edx.org')) return 'course';
  if (url.includes('medium.com') || url.includes('dev.to')) return 'article';
  return 'website';
}

// GET endpoint to fetch stored resources
export async function GET(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: NextRequest
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      console.log("No session or user ID found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Fetching resources for user:", session.user.id);
    
    await connectMongoDB();
    
    // Convert string ID to ObjectId
    const userId = new ObjectId(session.user.id);
    console.log("Querying with userId:", userId);

    const resources = await CuratedResource.find({
      userId: userId
    }).lean();

    console.log("Raw MongoDB response:", JSON.stringify(resources, null, 2));

    if (!resources || resources.length === 0) {
      console.log("No resources found for user");
      return NextResponse.json({ resources: [] });
    }

    // Transform the MongoDB documents to plain objects
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedResources = resources.map((resource: any) => {
      try {
        return {
          _id: resource._id.toString(),
          topic: resource.topic,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          resources: resource.resources.map((item: any) => ({
            _id: item._id.toString(),
            title: item.title,
            description: item.description,
            type: item.type,
            link: item.link
          })),
          lastUpdated: resource.lastUpdated,
          createdAt: resource.createdAt,
          updatedAt: resource.updatedAt
        };
      } catch (err) {
        console.error("Error transforming resource:", err);
        console.log("Problematic resource:", resource);
        return null;
      }
    }).filter(Boolean); // Remove any null values from failed transformations

    console.log("Successfully transformed resources:", 
      JSON.stringify(transformedResources, null, 2)
    );

    return NextResponse.json({ resources: transformedResources });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

// POST endpoint to curate new resources
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { subject } = await req.json();
    if (!subject?.trim()) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    // Get resource information
    const searchData = await searchTavily(subject);

    // Generate curated resources
    const curatedResources = await curateResourcesWithGemini(searchData, subject);

    // Transform the resources to match our schema
    const transformedResources = transformResourceData(curatedResources.resources);

    // Save to database
    await connectMongoDB();
    const newResources = new CuratedResource({
      userId: session.user.id,
      topic: subject, // Changed from subject to topic to match schema
      resources: transformedResources,
      lastUpdated: new Date()
    });

    await newResources.save();
    return NextResponse.json({ resources: transformedResources });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to curate resources. Please try again later." },
      { status: 500 }
    );
  }
}
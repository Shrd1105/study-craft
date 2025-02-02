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
  images?: string[];
}

interface ExtractResponse {
  results: ExtractResult[];
  response_time?: number;
}

// Add caching for Tavily results
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const searchCache = new Map();

// Function to search using Tavily API with proper error handling
async function searchTavily(subject: string): Promise<TavilyResponse> {
  try {
    // Check cache first
    const cacheKey = subject.toLowerCase().trim();
    const cachedResult = searchCache.get(cacheKey);
    if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
      return cachedResult.data;
    }

    if (!TAVILY_API_KEY) {
      throw new Error("TAVILY_API_KEY is not configured");
    }

    // First use search API
    const searchResponse = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TAVILY_API_KEY}`
      },
      body: JSON.stringify({
        query: `best learning resources and courses for ${subject}`,
        search_depth: "advanced",
        include_answer: false,
        max_results: 10, // Increased from 5 to 10 to get more results
        include_domains: [
          "coursera.org",
          "edx.org", 
          "udemy.com",
          "khanacademy.org",
          "freecodecamp.org",
          "w3schools.com",
          "codecademy.com",
          "pluralsight.com",
          "youtube.com",
          "medium.com"
        ]
      })
    });

    if (!searchResponse.ok) {
      throw new Error(`Tavily search failed: ${searchResponse.statusText}`);
    }

    const searchData = await searchResponse.json() as TavilyResponse;
    console.log("Tavily search results:", searchData);

    // Then use extract API to get more details
    const validUrls = searchData.results
      .map(result => result.url)
      .filter(url => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      });

    if (validUrls.length > 0) {
      try {
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

        if (extractResponse.ok) {
          const extractData = await extractResponse.json() as ExtractResponse;
          console.log("Tavily extract results:", extractData);

          // Enhance search results with extracted content
          const enhancedResults = searchData.results.map(result => {
            const extractInfo = extractData.results.find(e => e.url === result.url);
            return {
              ...result,
              content: extractInfo?.raw_content || result.content
            };
          });

          searchData.results = enhancedResults;
        }
      } catch (error) {
        console.error("Extract API error:", error);
        // Continue with original search results if extract fails
      }
    }
    
    // Cache the enhanced results
    searchCache.set(cacheKey, {
      timestamp: Date.now(),
      data: searchData
    });

    return searchData;
  } catch (error) {
    console.error("Tavily API error:", error);
    throw error;
  }
}

// Function to curate resources using Gemini
async function curateResourcesWithGemini(searchData: TavilyResponse, subject: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const relevantContent = searchData.results
    .filter(result => result.score > 0.5) // Lowered score threshold to get more results
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
    },
    {
      title: "W3Schools",
      url: `https://www.w3schools.com/search/search.php?q=${encodeURIComponent(subject)}`,
      description: "Interactive tutorials and references",
      benefits: ["Interactive examples", "Beginner-friendly"]
    },
    {
      title: "Codecademy",
      url: `https://www.codecademy.com/search?query=${encodeURIComponent(subject)}`,
      description: "Interactive coding lessons and projects",
      benefits: ["Hands-on practice", "Immediate feedback"]
    }
  ];

  const prompt = `As an expert educator, curate exactly 5 of the most relevant and high-quality free learning resources for ${subject}.

${searchData.answer ? `Context from search:\n${searchData.answer}\n` : ''}

${relevantContent.length > 0 
  ? `Found resources:\n${JSON.stringify(relevantContent, null, 2)}\n` 
  : `Using default resources:\n${JSON.stringify(defaultResources, null, 2)}\n`
}

Create a curated list of exactly 5 best resources. For each resource:
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
}

Important: The response MUST contain exactly 5 resources.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean and parse the response
    const cleanedText = text.replace(/```json\s*|\s*```/g, '').trim();
    const resources = JSON.parse(cleanedText);

    if (!resources.resources || !Array.isArray(resources.resources) || resources.resources.length !== 5) {
      console.log("Invalid number of resources, using defaults");
      return { resources: defaultResources };
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

    // Set timeout for the entire operation
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Operation timed out')), 50000)
    );

    const resultPromise = (async () => {
      const searchData = await searchTavily(subject);
      const curatedResources = await curateResourcesWithGemini(searchData, subject);
      const transformedResources = transformResourceData(curatedResources.resources);

      await connectMongoDB();
      const newResources = new CuratedResource({
        userId: session.user.id,
        topic: subject,
        resources: transformedResources,
        lastUpdated: new Date()
      });

      await newResources.save();
      return transformedResources;
    })();

    const resources = await Promise.race([resultPromise, timeoutPromise]);
    return NextResponse.json({ resources });

  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error && error.message === 'Operation timed out') {
      return NextResponse.json(
        { error: "Request timed out. Please try again." },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: "Failed to curate resources. Please try again later." },
      { status: 500 }
    );
  }
}
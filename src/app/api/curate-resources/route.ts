import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import CuratedResource from "@/models/curatedResource";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

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

// Function to search using Tavily API with proper error handling
async function searchTavily(subject: string): Promise<TavilyResponse> {
  try {
    if (!process.env.TAVILY_API_KEY) {
      console.error("TAVILY_API_KEY is not configured");
      return { results: [], answer: '' };
    }

    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TAVILY_API_KEY}`
      },
      body: JSON.stringify({
        query: `best free learning resources tutorials courses for ${subject}`,
        search_depth: "advanced",
        include_answer: true,
        max_results: 5,
        include_domains: [
          "freecodecamp.org",
          "coursera.org",
          "edx.org",
          "khanacademy.org",
          "w3schools.com",
          "youtube.com",
          "github.com",
          "dev.to",
          "medium.com"
        ]
      })
    });

    if (!response.ok) {
      console.error("Tavily API error:", {
        status: response.status,
        statusText: response.statusText
      });
      return { results: [], answer: '' };
    }

    const data = await response.json();
    return {
      results: data.results || [],
      answer: data.answer || ''
    };
  } catch (error) {
    console.error("Tavily search error:", error);
    return { results: [], answer: '' };
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
    resources.resources.forEach((resource: any) => {
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
function transformResourceData(resources: any[]) {
  return resources.map(resource => ({
    title: resource.title,
    link: resource.url, // Map url to link
    type: determineResourceType(resource.url), // Helper function to determine type
    description: resource.description,
    benefits: resource.benefits
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    const resources = await CuratedResource.find({
      userId: session.user.id
    }).sort({ createdAt: -1 });

    return NextResponse.json({ resources });
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
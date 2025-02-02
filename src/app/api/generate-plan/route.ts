import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import StudyPlan from "@/models/studyPlan";

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
        query: `${subject} curriculum syllabus learning path study guide`,
        search_depth: "advanced",
        include_answer: true,
        max_results: 10,
        include_domains: [
          "edu",
          "org",
          "gov",
          "com"
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Tavily API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData
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

// Function to generate study plan with Gemini
async function generatePlanWithGemini(
  searchData: TavilyResponse, 
  subject: string, 
  daysUntilExam: number, 
  examDate: string
) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  // Extract relevant content from search results
  const relevantContent = searchData.results
    .filter(result => result.score > 0.7)
    .map(result => ({
      title: result.title,
      content: result.content
    }));

  // Fallback content if no search results
  const fallbackContent = {
    title: "General Study Guide",
    content: `Study guide for ${subject} focusing on core concepts and exam preparation.`
  };

  const prompt = `As an expert study planner, create a detailed study plan for ${subject} with ${daysUntilExam} days until the exam on ${examDate}. 

${searchData.answer ? `Context from research:\n${searchData.answer}\n` : ''}

${relevantContent.length > 0 
  ? `Relevant curriculum information:\n${JSON.stringify(relevantContent)}\n` 
  : `Using general curriculum structure:\n${JSON.stringify([fallbackContent])}\n`
}

Create a comprehensive study plan that:
1. Breaks down the subject into logical weekly segments based on the curriculum
2. Provides specific daily tasks and goals
3. Includes realistic time estimates for each task
4. Suggests effective study techniques specific to ${subject}
5. Includes exam preparation strategies for the final weeks

Return the plan in this exact JSON format:
{
  "overview": {
    "subject": "${subject}",
    "duration": "${daysUntilExam} days",
    "examDate": "${examDate}"
  },
  "weeklyPlans": [
    {
      "week": "Week X",
      "goals": ["Primary goal 1", "Primary goal 2"],
      "dailyTasks": [
        {
          "day": "Day Y",
          "tasks": ["Specific task 1", "Specific task 2"],
          "duration": "X hours"
        }
      ]
    }
  ],
  "recommendations": [
    "Study tip 1",
    "Study tip 2"
  ]
}

Ensure the plan is realistic, well-structured, and focused on mastery of the subject.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean and parse the response
    const cleanedText = text.replace(/```json\s*|\s*```/g, '').trim();
    const plan = JSON.parse(cleanedText);
    
    // Validate plan structure
    if (!plan.overview || !plan.weeklyPlans || !plan.recommendations) {
      throw new Error("Invalid plan structure");
    }

    return plan;
  } catch (error) {
    console.error("Error processing Gemini response:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { subject, examDate } = await req.json();
    if (!subject?.trim() || !examDate) {
      return NextResponse.json(
        { error: "Subject and exam date are required" },
        { status: 400 }
      );
    }

    // 3. Calculate days until exam
    const currentDate = new Date().toISOString().split('T')[0];
    const daysUntilExam = Math.ceil(
      (new Date(examDate).getTime() - new Date(currentDate).getTime()) / (1000 * 3600 * 24)
    );

    if (daysUntilExam < 0) {
      return NextResponse.json(
        { error: "Exam date must be in the future" },
        { status: 400 }
      );
    }

    if (daysUntilExam > 365) {
      return NextResponse.json(
        { error: "Exam date must be within one year" },
        { status: 400 }
      );
    }

    // 4. Get curriculum information
    const searchData = await searchTavily(subject);

    // 5. Generate plan using the gathered information
    const plan = await generatePlanWithGemini(
      searchData,
      subject,
      daysUntilExam,
      examDate
    );

    // 6. Save to database
    await connectMongoDB();
    const newPlan = new StudyPlan({
      userId: session.user.id,
      overview: plan.overview,
      weeklyPlans: plan.weeklyPlans,
      recommendations: plan.recommendations,
      isActive: true,
      progress: 0,
      lastUpdated: new Date()
    });

    await newPlan.save();
    return NextResponse.json({ plan: newPlan });
  } catch (error) {
    console.error("Error generating plan:", error);
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    );
  }
}
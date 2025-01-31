import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);


const cleanResponseText = (text: string): string => {
  // Remove markdown code block syntax if present
  text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  // Remove any leading/trailing whitespace
  text = text.trim();
  return text;
};

const validatePlanStructure = (plan: unknown): boolean => {
  if (!plan || typeof plan !== 'object') return false;
  
  const typedPlan = plan as Record<string, unknown>;
  
  if (!typedPlan.overview || typeof typedPlan.overview !== 'object') return false;
  if (!Array.isArray(typedPlan.weeklyPlans)) return false;
  if (!Array.isArray(typedPlan.recommendations)) return false;

  // Validate overview structure
  const overview = typedPlan.overview as Record<string, unknown>;
  const requiredOverviewFields = ['subject', 'duration', 'examDate'];
  if (!requiredOverviewFields.every(field => typeof overview[field] === 'string')) {
    return false;
  }

  // Validate weekly plans structure
  return (typedPlan.weeklyPlans as Record<string, unknown>[]).every((week) => {
    if (!week.week || typeof week.week !== 'string') return false;
    if (!Array.isArray(week.goals)) return false;
    if (!Array.isArray(week.dailyTasks)) return false;

    return (week.dailyTasks as Record<string, unknown>[]).every((task) => {
      return (
        task.day && typeof task.day === 'string' &&
        task.duration && typeof task.duration === 'string' &&
        Array.isArray(task.tasks) &&
        task.tasks.every((t) => typeof t === 'string')
      );
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    const { subject, examDate } = await req.json();

    if (!subject || !examDate) {
      return NextResponse.json(
        { error: "Subject and exam date are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const currentDate = new Date().toISOString().split('T')[0];
    const daysUntilExam = Math.ceil((new Date(examDate).getTime() - new Date(currentDate).getTime()) / (1000 * 3600 * 24));

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

    const prompt = `Create a detailed study plan for ${subject} with ${daysUntilExam} days until the exam date (${examDate}). 

Return the response in this exact JSON format:

{
  "overview": {
    "subject": "${subject}",
    "duration": "${daysUntilExam} days",
    "examDate": "${examDate}"
  },
  "weeklyPlans": [
    {
      "week": "Week 1",
      "goals": [
        "Primary goal 1",
        "Primary goal 2"
      ],
      "dailyTasks": [
        {
          "day": "Day 1",
          "tasks": [
            "Specific task 1",
            "Specific task 2"
          ],
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

Important: Provide only the JSON response without any additional text or markdown formatting.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        throw new Error("Empty response from AI model");
      }

      // Clean the response text
      const cleanedText = cleanResponseText(text);
      
      try {
        // Parse and validate the JSON structure
        const plan = JSON.parse(cleanedText);
        
        // Validate the plan structure
        if (!validatePlanStructure(plan)) {
          throw new Error("Invalid plan structure");
        }

        return NextResponse.json({ plan });
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        return NextResponse.json(
          { error: "Failed to parse the generated study plan. Please try again." },
          { status: 500 }
        );
      }
    } catch (generationError) {
      console.error("Content Generation Error:", generationError);
      return NextResponse.json(
        { error: "Failed to generate study plan. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Request Processing Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
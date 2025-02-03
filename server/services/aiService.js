const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function searchTavily(subject) {
  try {
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
        max_results: 10
      })
    });

    if (!response.ok) {
      throw new Error('Tavily search failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Tavily search error:', error);
    return { results: [], answer: '' };
  }
}

async function curateResourcesWithGemini(searchData, subject) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `As an expert educator, curate exactly 5 of the most relevant and high-quality free learning resources for ${subject}.

${searchData.answer ? `Context from search:\n${searchData.answer}\n` : ''}

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
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text.replace(/```json\s*|\s*```/g, '').trim());
  } catch (error) {
    console.error('Gemini error:', error);
    throw error;
  }
}

async function generatePlanWithGemini(subject, userId, examDate) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  // Calculate days until exam
  const daysUntilExam = Math.ceil(
    (new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const prompt = `Create a detailed study plan for ${subject} with ${daysUntilExam} days until the exam on ${examDate}.

Your task is to create a comprehensive study plan. Return ONLY a valid JSON object with this exact structure:

{
  "overview": {
    "subject": "${subject}",
    "duration": "${daysUntilExam} days",
    "examDate": "${examDate}"
  },
  "weeklyPlans": [
    {
      "week": "Week 1",
      "goals": ["Goal 1", "Goal 2"],
      "dailyTasks": [
        {
          "day": "YYYY-MM-DD (Day X)",
          "tasks": ["Task 1", "Task 2"],
          "duration": "X hours"
        }
      ]
    }
  ],
  "recommendations": ["Tip 1", "Tip 2"]
}

Important: Return ONLY the JSON object, no additional text or formatting.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response text
    const cleanJson = text.replace(/```json\s*|\s*```/g, '').trim();
    
    try {
      // Attempt to parse the JSON
      const parsedPlan = JSON.parse(cleanJson);
      
      // Create a new StudyPlan instance
      const plan = new StudyPlan({
        userId,
        overview: parsedPlan.overview,
        weeklyPlans: parsedPlan.weeklyPlans,
        recommendations: parsedPlan.recommendations,
        isActive: true,
        progress: 0,
        lastUpdated: new Date()
      });

      return plan;
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.log('Raw Response:', text);
      throw new Error('Invalid plan format received from AI');
    }
  } catch (error) {
    console.error('Gemini error:', error);
    throw error;
  }
}

module.exports = {
  searchTavily,
  curateResourcesWithGemini,
  generatePlanWithGemini
}; 
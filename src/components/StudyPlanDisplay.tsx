import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DailyTask {
  day: string;
  tasks: string[];
  duration: string;
}

interface WeeklyPlan {
  week: string;
  goals: string[];
  dailyTasks: DailyTask[];
}

interface StudyPlan {
  overview: {
    subject: string;
    duration: string;
    examDate: string;
  };
  weeklyPlans: WeeklyPlan[];
  recommendations: string[];
}

interface StudyPlanDisplayProps {
  plan: StudyPlan;
}

export default function StudyPlanDisplay({ plan }: StudyPlanDisplayProps) {
  return (
    <Card className="w-full bg-white border-2 border-black rounded-xl">
      <CardHeader className="border-b-2 border-black">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Study Plan for {plan.overview.subject}
        </CardTitle>
        <p className="text-gray-600">Duration: {plan.overview.duration} | Exam Date: {plan.overview.examDate}</p>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[calc(100vh-200px)] w-full pr-4">
          {plan.weeklyPlans.map((weeklyPlan, weekIndex) => (
            <div key={weekIndex} className="mb-12 last:mb-0">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                {weeklyPlan.week}
              </h3>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Goals:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {weeklyPlan.goals.map((goal, index) => (
                    <li key={index} className="text-gray-600">{goal}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Daily Schedule:</h4>
                {weeklyPlan.dailyTasks.map((day, dayIndex) => (
                  <div key={dayIndex} className="mb-3">
                    <h5 className="font-medium text-gray-600">{day.day} ({day.duration})</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {day.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-gray-600">{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Study Tips & Recommendations
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {plan.recommendations.map((tip, index) => (
                <li key={index} className="text-gray-600">{tip}</li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
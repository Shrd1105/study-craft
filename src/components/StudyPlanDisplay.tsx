import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudyPlanDisplayProps {
  plan: string;
}

export default function StudyPlanDisplay({ plan }: StudyPlanDisplayProps) {
  const sections = plan.split('\n\n');

  return (
    <Card className="w-full bg-white border-2 border-black rounded-xl">
      <CardHeader className="border-b-2 border-black">
        <CardTitle className="text-2xl font-semibold text-gray-800">Your Study Plan</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[calc(100vh-200px)] w-full pr-4">
          {sections.map((section, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                {section.split('\n')[0]}
              </h3>
              <ul className="space-y-3 text-gray-600">
                {section.split('\n').slice(1).map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
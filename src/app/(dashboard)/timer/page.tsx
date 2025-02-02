"use client"

import { StudyTimer } from "@/components/timer/StudyTimer";

export default function TimerPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Study Timer</h1>
        <span className="text-sm text-gray-600">
          Track your focus sessions
        </span>
      </div>

      <div className="max-w-4xl mx-auto">
        <StudyTimer />
      </div>
    </div>
  );
} 
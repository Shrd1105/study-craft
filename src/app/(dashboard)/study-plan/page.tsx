"use client"
import StudyPlanForm from '@/components/StudyPlanForm';

export default function StudyPlanPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Study Plan Generator</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Create and manage your study plans</span>
        </div>
      </div>
      <div className="max-w-10xl">
        <StudyPlanForm />
      </div>
    </div>
  );
}
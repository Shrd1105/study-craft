"use client"

import { useState, useEffect } from "react";
import StudyPlanForm from '@/components/StudyPlanForm';
import { StoredPlan } from "@/components/study-plan/StoredPlan";
import { Separator } from "@/components/ui/separator";
import type { StudyPlan } from "@/components/study-plan/StoredPlan";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudyPlanPage() {
  const [storedPlans, setStoredPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStoredPlans();
  }, []);

  const fetchStoredPlans = async () => {
    try {
      const response = await fetch("/api/study-plan");
      if (!response.ok) throw new Error("Failed to fetch plans");
      const data = await response.json();
      setStoredPlans(data.plans);
    } catch (error) {
      console.error("Error fetching stored plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanDelete = (planId: string) => {
    setStoredPlans(plans => plans.filter(plan => plan._id !== planId));
  };

  const handlePlanGenerated = (newPlan: Partial<StudyPlan>) => {
    if (!newPlan.overview) return;
    
    // Create a complete StudyPlan object
    const completePlan: StudyPlan = {
      _id: Date.now().toString(), // Temporary ID until server assigns one
      overview: newPlan.overview,
      weeklyPlans: newPlan.weeklyPlans || [],
      recommendations: newPlan.recommendations || [],
      isActive: true,
      progress: 0
    };
    
    setStoredPlans(plans => [completePlan, ...plans]);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Study Plan Generator</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Create and manage your study plans</span>
        </div>
      </div>
      <div className="max-w-10xl">
        <StudyPlanForm onPlanGenerated={handlePlanGenerated} />
      </div>

      {/* Stored Plans Section */}
      {loading ? (
        <div className="mt-12">
          <Separator className="my-8" />
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-6">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      ) : storedPlans.length > 0 && (
        <div className="mt-12">
          <Separator className="my-8" />
          <h2 className="text-2xl font-bold mb-6">Your Study Plans</h2>
          <div className="space-y-6">
            {storedPlans.map((plan) => (
              <StoredPlan
                key={plan._id}
                plan={plan}
                onDelete={handlePlanDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
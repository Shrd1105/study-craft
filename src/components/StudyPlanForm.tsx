"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StudyPlanDisplay from './StudyPlanDisplay';
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { StudyPlan } from "@/components/study-plan/StoredPlan";
import { apiClient } from '@/lib/api-client';
import { useSession } from 'next-auth/react';

interface StudyPlanFormProps {
  onPlanGenerated: (plan: Partial<StudyPlan>) => void;
}

export default function StudyPlanForm({ onPlanGenerated }: StudyPlanFormProps) {
  const [subject, setSubject] = useState('');
  const [examDate, setExamDate] = useState('');
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.id) {
      toast({
        variant: "error",
        title: "Authentication Required", 
        description: "You must be logged in to generate a study plan",
      });
      return;
    }

    if (!subject.trim() || !examDate) {
      toast({
        variant: "error",
        title: "Missing Information",
        description: "Please fill in all fields",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.createStudyPlan(
        session.user.id,
        subject,
        examDate
      );

      if (response.success && response.plan) {
        onPlanGenerated(response.plan);
        setPlan(response.plan);
        setSubject('');
        setExamDate('');
        toast({
          variant: "success",
          title: "Plan Generated",
          description: "Study plan generated successfully",
        });
      } else {
        throw new Error(response.error || 'Failed to generate plan');
      }
    } catch (error) {
      console.error('Error generating plan:', error);
      toast({
        variant: "error",
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#F2EDE0] p-4 sm:p-6 border-2 border-b-4 border-r-4 border-black rounded-xl">
      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleGeneratePlan} className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
            <Input
              type="text"
              placeholder="Enter your study topic..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-white border-2 border-b-4 border-r-4 border-black text-gray-900 placeholder-gray-400 text-base sm:text-lg p-4 sm:p-6 rounded-xl"
              disabled={isLoading}
            />
            <Input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="bg-white border-2 border-b-4 border-r-4 border-black text-gray-900 text-base sm:text-lg p-4 sm:p-6 rounded-xl"
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-center w-full">
            <Button 
              type="submit" 
              className="w-full sm:w-auto flex justify-center items-center text-base sm:text-lg py-6 px-8 rounded-xl" 
              disabled={isLoading || !subject.trim() || !examDate}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 sm:h-5 w-4 sm:w-5 animate-spin" /> : null}
              {isLoading ? 'Generating Your Plan...' : 'Create Study Plan'}
            </Button>
          </div>
        </form>

        {plan && (
          <div className="mt-6 sm:mt-8">
            <StudyPlanDisplay plan={plan} />
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StudyPlanDisplay from './StudyPlanDisplay';
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface StudyPlan {
  overview: {
    subject: string;
    duration: string;
    examDate: string;
  };
  weeklyPlans: Array<{
    week: string;
    goals: string[];
    dailyTasks: Array<{
      day: string;
      tasks: string[];
      duration: string;
    }>;
  }>;
  recommendations: string[];
}

export default function StudyPlanForm() {
  const [subject, setSubject] = useState('');
  const [examDate, setExamDate] = useState('');
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, examDate }),
      });
      const data = await response.json();
      if (response.ok) {
        setPlan(data.plan);
        toast({
          title: "Study Plan Generated",
          description: "Your study plan is ready!",
          action: <ToastAction altText="View plan">View plan</ToastAction>,
        });
      } else {
        throw new Error(data.error || 'Failed to generate study plan');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#FFFAEC] p-6 border-2 border-b-4 border-r-4 border-black rounded-xl">
      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleGeneratePlan} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Enter your study topic..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-white border-2 border-b-4 border-r-4 border-black text-gray-900 placeholder-gray-400 text-lg p-6 rounded-xl"
            />
            <Input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="bg-white border-2 border-b-4 border-r-4 border-black text-gray-900 text-lg p-6 rounded-xl"
            />
          </div>
          <div className="flex justify-center w-full">
            <Button 
              type="submit" 
              className="flex justify-center items-center bg-[#c1ff72] text-gray-800 text-lg rounded-xl" 
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? 'Generating Your Plan...' : 'Create Study Plan'}
            </Button>
          </div>
        </form>

        {plan && (
          <div className="mt-8">
            <StudyPlanDisplay plan={plan} />
          </div>
        )}
      </div>
    </div>
  );
}
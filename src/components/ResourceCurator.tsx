"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  title: string;
  description: string;
  type: string;
  link: string;
}

interface ResourceCuratorProps {
  onCreateResources: (subject: string) => Promise<void>;
}

export default function ResourceCurator({ onCreateResources }: ResourceCuratorProps) {
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [resources] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    setLoading(true);
    setError(null);
    try {
      await onCreateResources(subject);
      setSubject(""); // Clear input after successful submission
      toast({
        title: "Success",
        description: "Resources generated successfully",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#FFFAEC] p-4 sm:p-6 border-2 border-b-4 border-r-4 border-black rounded-xl">
      <div className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Input
              type="text"
              placeholder="Enter a topic to find learning resources..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 bg-white border-2 border-b-4 border-r-4 border-black text-gray-900 placeholder-gray-400 text-base sm:text-lg p-4 sm:p-6 rounded-xl"
              disabled={loading}
            />
            <Button 
              type="submit" 
              disabled={loading || !subject.trim()} 
              className="w-full sm:w-auto py-6 sm:py-0"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Resources"
              )}
            </Button>
          </div>
        </form>

        {resources.length > 0 && (
          <ScrollArea className="h-[calc(100vh-400px)] sm:h-[calc(100vh-300px)] w-full">
            <div className="grid grid-cols-1 gap-6 sm:gap-10">
              {resources.map((resource, index) => (
                <Card key={index} className="bg-white border-2 border-black border-b-4 border-r-4">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl text-gray-800">{resource.title}</CardTitle>
                    <div className="text-xs sm:text-sm text-gray-500">{resource.type}</div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-gray-600 mb-4">{resource.description}</p>
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-[#7fb236] hover:text-[#6f9826] hover:underline text-sm sm:text-base"
                    >
                      Learn More →
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
        
        {error && (
          <div className="text-red-500 mt-4 p-3 sm:p-4 bg-red-50 rounded-lg border-2 border-red-200 text-sm sm:text-base">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
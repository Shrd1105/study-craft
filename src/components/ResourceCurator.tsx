"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface Resource {
  title: string;
  description: string;
  type: string;
  link: string;
}

export default function ResourceCurator() {
  const [subject, setSubject] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCurateResources = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/curate-resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject }),
      });
      const data = await response.json();
      if (response.ok) {
        setResources(data.resources);
        toast({
          title: "Resources Found",
          description: `Found ${data.resources.length} resources for ${subject}`,
          action: <ToastAction altText="View resources">View resources</ToastAction>,
        });
      } else {
        throw new Error(data.error || 'Failed to fetch resources');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#FFFAEC] p-6 border-2 border-b-4 border-r-4 border-black rounded-xl">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleCurateResources} className="space-y-4 mb-8">
          <Input
            type="text"
            placeholder="Enter a topic to find learning resources..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-white border-2 border-b-4 border-r-4 border-black text-gray-900 placeholder-gray-400 text-lg p-6 rounded-xl"
          />
          <div className="flex justify-center w-full">
            <Button 
              type="submit" 
              className="bg-[#c1ff72] text-gray-800 text-lg rounded-xl" 
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isLoading ? 'Curating Resources...' : 'Find Learning Resources'}
            </Button>
          </div>
        </form>

        {resources.length > 0 && (
          <ScrollArea className="h-[calc(100vh-400px)] w-full">
            <div className="grid grid-cols-1 gap-10">
              {resources.map((resource, index) => (
                <Card key={index} className="bg-white border-2 border-black border-b-4 border-r-4">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">{resource.title}</CardTitle>
                    <div className="text-sm text-gray-500">{resource.type}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-[#7fb236] hover:text-[#6f9826] hover:underline"
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
          <div className="text-red-500 mt-4 p-4 bg-red-50 rounded-lg border-2 border-red-200">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
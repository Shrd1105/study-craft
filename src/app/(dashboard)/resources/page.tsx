"use client"

import { useState, useEffect, useCallback } from "react";
import ResourceCurator from '@/components/ResourceCurator';
import { StoredResources } from "@/components/resources/StoredResources";
import { Separator } from "@/components/ui/separator";
import type { CuratedResource } from "@/components/resources/StoredResources";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/api-client";

export default function ResourcesPage() {
  const { data: session } = useSession();
  const [storedResources, setStoredResources] = useState<CuratedResource[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResources = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      const data = await apiClient.getCuratedResources(session.user.id);
      console.log("Fetched resources data:", data);
      
      if (data.error) {
        console.error("API returned error:", data.error);
        setStoredResources([]);
        return;
      }
      
      if (data.resources && Array.isArray(data.resources)) {
        // Validate the structure of each resource
        const validResources = data.resources.filter((resource: CuratedResource) => {
          return resource && 
                 resource._id && 
                 resource.topic && 
                 Array.isArray(resource.resources);
        });
        
        console.log("Valid resources:", validResources);
        setStoredResources(validResources);
      } else {
        console.error("Invalid resources data structure:", data);
        setStoredResources([]);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
      setStoredResources([]);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleResourceDelete = (resourceId: string) => {
    setStoredResources(resources => resources.filter(resource => resource._id !== resourceId));
  };

  const handleCreateResources = async (subject: string) => {
    if (!session?.user?.id) return;
    try {
      await apiClient.createCuratedResources(session.user.id, subject);
      // Refresh resources after creation
      fetchResources();
    } catch (error) {
      console.error('Error creating resources:', error);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Resource Curator</h1>
        <div className="flex items-center">
          <span className="text-xs sm:text-sm text-gray-600">Find and manage learning resources</span>
        </div>
      </div>
      <div className="w-full max-w-10xl mx-auto">
        <ResourceCurator onCreateResources={handleCreateResources} />
      </div>

      {/* Stored Resources Section */}
      {loading ? (
        <div className="mt-8 sm:mt-12">
          <Separator className="my-6 sm:my-8" />
          <Skeleton className="h-6 sm:h-8 w-36 sm:w-48 mb-4 sm:mb-6" />
          <div className="space-y-4 sm:space-y-6">
            <Skeleton className="h-[150px] sm:h-[200px] w-full" />
            <Skeleton className="h-[150px] sm:h-[200px] w-full" />
          </div>
        </div>
      ) : (
        <div className="mt-8 sm:mt-12">
          <Separator className="my-6 sm:my-8" />
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Your Curated Resources</h2>
          {storedResources.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {storedResources.map((resource) => (
                <StoredResources
                  key={resource._id}
                  resource={resource}
                  onDelete={handleResourceDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>You haven&apos;t curated any resources yet.</p>
              <p className="mt-2">Use the form above to get personalized learning resources!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
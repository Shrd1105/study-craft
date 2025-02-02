"use client"

import { useState, useEffect } from "react";
import ResourceCurator from '@/components/ResourceCurator';
import { StoredResources } from "@/components/resources/StoredResources";
import { Separator } from "@/components/ui/separator";
import type { CuratedResource } from "@/components/resources/StoredResources";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResourcesPage() {
  const [storedResources, setStoredResources] = useState<CuratedResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStoredResources();
  }, []);

  const fetchStoredResources = async () => {
    try {
      const response = await fetch("/api/curate-resources");
      if (!response.ok) throw new Error("Failed to fetch resources");
      const data = await response.json();
      setStoredResources(data.resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResourceDelete = (resourceId: string) => {
    setStoredResources(resources => resources.filter(resource => resource._id !== resourceId));
  };

  const handleResourceGenerated = (newResource: CuratedResource) => {
    setStoredResources(resources => [newResource, ...resources]);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Resource Curator</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Find and manage learning resources</span>
        </div>
      </div>
      <div className="max-w-10xl">
        <ResourceCurator />
      </div>

      {/* Stored Resources Section */}
      {loading ? (
        <div className="mt-12">
          <Separator className="my-8" />
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-6">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      ) : storedResources.length > 0 && (
        <div className="mt-12">
          <Separator className="my-8" />
          <h2 className="text-2xl font-bold mb-6">Your Curated Resources</h2>
          <div className="space-y-6">
            {storedResources.map((resource) => (
              <StoredResources
                key={resource._id}
                resource={resource}
                onDelete={handleResourceDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
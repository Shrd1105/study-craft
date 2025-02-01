"use client"
import ResourceCurator from '@/components/ResourceCurator';

export default function ResourcesPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">AI-Curated Resources</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Discover learning materials</span>
        </div>
      </div>
      <div className="max-w-10xl">
        <ResourceCurator />
      </div>
    </div>
  );
}
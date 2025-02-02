import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

export interface Resource {
  _id: string;
  title: string;
  description: string;
  type: string;
  link: string;
}

export interface CuratedResource {
  _id: string;
  topic: string;
  resources: Resource[];
  lastUpdated: string;
}

interface StoredResourcesProps {
  resource: CuratedResource;
  onDelete: (resourceId: string) => void;
}

export function StoredResources({ resource, onDelete }: StoredResourcesProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/curate-resources/${resource._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete resources');
      }

      onDelete(resource._id);
      toast.success("Resources deleted successfully");
    } catch (error) {
      console.error('Error deleting resources:', error);
      toast.error("Failed to delete resources");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="w-full mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold">
            Resources for {resource.topic}
          </CardTitle>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline">
              {new Date(resource.lastUpdated).toLocaleDateString()}
            </Badge>
            <Badge variant="outline">{resource.resources.length} Resources</Badge>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isDeleting}>
              Delete Resources
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete these curated resources.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resource.resources.map((item) => (
            <Card key={item._id} className="bg-muted">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {item.title}
                  </CardTitle>
                  <Badge>{item.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(item.link, '_blank')}
                >
                  Visit Resource <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 
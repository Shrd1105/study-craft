"use client"
import { useRouter } from 'next/navigation';
import { BookOpen, Brain, BarChart, Clock, Book } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardHome() {
  const router = useRouter();

  const stats = [
    {
      title: "Study Hours",
      value: "12.5",
      description: "Last 7 days",
      icon: <Clock className="h-4 w-4 text-[#7fb236]" />
    },
    {
      title: "Topics Covered",
      value: "8",
      description: "This month",
      icon: <Book className="h-4 w-4 text-[#7fb236]" />
    },
    {
      title: "Resources Saved",
      value: "24",
      description: "Total",
      icon: <BookOpen className="h-4 w-4 text-[#7fb236]" />
    },
    {
      title: "Study Streak",
      value: "5 days",
      description: "Current",
      icon: <BarChart className="h-4 w-4 text-[#7fb236]" />
    }
  ];

  const features = [
    {
      title: "Study Plan Generator",
      description: "Create personalized study plans based on your goals and timeline. Track your progress and adjust as needed.",
      icon: <BookOpen className="h-8 w-8 text-[#7fb236]" />,
      path: "/study-plan",
      metrics: "5 active plans"
    },
    {
      title: "Resource Curator",
      description: "Discover AI-curated learning resources tailored to your topics. Save and organize materials for easy access.",
      icon: <Brain className="h-8 w-8 text-[#7fb236]" />,
      path: "/resources",
      metrics: "150+ resources available"
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Last updated: Just now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <div className="w-8 h-8 bg-[#c1ff72] rounded-sm flex items-center justify-center border-2 border-b-4 border-r-4 border-black">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white"
            onClick={() => router.push(feature.path)}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#c1ff72] rounded-sm flex items-center justify-center border-2 border-b-4 border-r-4 border-black">
                  {feature.icon}
                </div>
                <div>
                  <CardTitle className="text-xl mb-1">{feature.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">{feature.metrics}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
              <div className="mt-4 flex items-center text-[#7fb236] text-sm">
                Learn more →
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 
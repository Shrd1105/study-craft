"use client"

import { useEffect, useState } from 'react';
import { ContributionCalendar } from 'react-contribution-calendar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from 'next-auth/react';

interface StudySession {
  duration: number;
  startTime: string;
  endTime: string;
  mode: string;
}

interface DailySession {
  count: number;
  totalDuration: number;
  sessions: StudySession[];
}

interface StudyStats {
  currentStreak: number;
  bestStreak: number;
  totalDays: number;
  studySessions: {
    [key: string]: DailySession;
  };
}

interface CalendarDataPoint {
  level: number;
  data: {
    count: number;
    duration: number;
    details: string;
  };
}

interface SessionData {
  studySessions: {
    [key: string]: DailySession;
  };
  totalStudyHours: number;
  currentStreak: number;
  bestStreak: number;
  lastStudyDate: string;
}

// Custom theme for the calendar
const customTheme = {
  level0: '#ffffff',
  level1: '#A9C46C',
  level2: '#809D3C',
  level3: '#5D8736',
  level4: '#5D8736',
};

export default function DashboardHome() {
  const { data: session } = useSession();
  const [studyData, setStudyData] = useState<Array<Record<string, CalendarDataPoint>>>([{}]);
  const [stats, setStats] = useState<StudyStats>({
    currentStreak: 0,
    bestStreak: 0,
    totalDays: 0,
    studySessions: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudyData = async () => {
      if (!session?.user?.id) return;
      
      try {
        const response = await fetch('/api/users/stats');
        if (!response.ok) throw new Error('Failed to fetch study data');
        
        const data: SessionData = await response.json();
        
        // Transform data for calendar
        const calendarData: Record<string, CalendarDataPoint> = {};
        
        // Process each study session
        Object.entries(data.studySessions || {}).forEach(([date, sessionData]) => {
          if (sessionData) {
            calendarData[date] = {
              level: Math.min(Math.floor((sessionData.count || 0) / 2), 4),
              data: {
                count: sessionData.count,
                duration: sessionData.totalDuration,
                details: `${sessionData.count} study sessions (${Math.round(sessionData.totalDuration / 60)} minutes)`
              }
            };
          }
        });

        setStudyData([calendarData]);
        setStats({
          currentStreak: data.currentStreak || 0,
          bestStreak: data.bestStreak || 0,
          totalDays: Object.keys(data.studySessions || {}).length,
          studySessions: data.studySessions || {}
        });
      } catch (error) {
        console.error('Error fetching study data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyData();

    // Listen for session completion events
    const handleSessionComplete = () => {
      setTimeout(fetchStudyData, 1000); // Slight delay to ensure server has processed the update
    };

    window.addEventListener('study-session-completed', handleSessionComplete);
    return () => {
      window.removeEventListener('study-session-completed', handleSessionComplete);
    };
  }, [session?.user?.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          {session?.user?.name ? `${session.user.name}'s ` : ''}Study Activity
        </h1>
        <span className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </span>
      </div>

      <Card className="bg-white border-2 border-black p-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Your Study Contributions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full">
            <div className="min-w-full p-4" style={{width: '1200px'}}>
              <ContributionCalendar
                data={studyData}
                dateOptions={{
                  start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                  end: new Date().toISOString().split('T')[0],
                  daysOfTheWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  startsOnSunday: true,
                  includeBoundary: true,
                }}
                styleOptions={{
                  theme: customTheme,
                  cx: 18,
                  cy: 20,
                  cr: 5,
                  textColor: '#1F2328'
                }}
                visibilityOptions={{
                  hideDescription: false,
                  hideMonthLabels: false,
                  hideDayLabels: false,
                }}
                onCellClick={(e) => {
                  const cellData = JSON.parse(e.currentTarget.getAttribute('data-cell') || '{}');
                  if (cellData?.data?.count) {
                    console.log(`${cellData.data.details}`);
                  }
                }}
                scroll={false}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-2 border-black">
          <CardHeader>
            <CardTitle className="text-lg">Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.currentStreak} days</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-black">
          <CardHeader>
            <CardTitle className="text-lg">Total Study Days</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalDays} days</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-black">
          <CardHeader>
            <CardTitle className="text-lg">Best Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.bestStreak} days</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
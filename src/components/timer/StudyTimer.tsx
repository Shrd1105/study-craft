"use client"

import { useEffect, useState } from 'react';
import TimerControls from './TimerControls';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSession } from 'next-auth/react';
import { useTimerStore } from '@/store/timerStore';

export function StudyTimer() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const timer = useTimerStore();
  const [todaysSessions, setTodaysSessions] = useState(0);

  // Timer tick effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.isActive) {
        timer.tick();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [timer]);

  // Fetch today's sessions on mount
  useEffect(() => {
    const fetchTodaysSessions = async () => {
      try {
        const response = await fetch('/api/users/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        
        const today = new Date().toISOString().split('T')[0];
        const todayData = data.studySessions?.[today];
        setTodaysSessions(todayData?.count || 0);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchTodaysSessions();
  }, []);

  // Handle session completion
  useEffect(() => {
    const handleSessionComplete = async () => {
      if (timer.timeLeft === 0 && timer.mode === 'focus' && timer.hasCompleted) {
        try {
          const response = await fetch('/api/study-sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              duration: 60,
              startTime: new Date(Date.now() - 60000).toISOString(),
              endTime: new Date().toISOString(),
              mode: 'focus'
            }),
          });

          if (!response.ok) throw new Error('Failed to save session');
          const data = await response.json();

          // Update today's sessions count
          setTodaysSessions(prev => prev + 1);

          // Show completion alert
          toast({
            title: "Focus Session Complete! 🎉",
            description: `Current streak: ${data.stats.currentStreak} days!`,
            duration: 5000,
          });

          // Update calendar
          window.dispatchEvent(new CustomEvent('study-session-completed'));
        } catch (error) {
          console.error('Error saving session:', error);
          toast({
            title: "Error",
            description: "Failed to save your study session",
            variant: "destructive",
            duration: 5000,
          });
        }
      } else if (timer.timeLeft === 0 && timer.mode === 'break' && timer.hasCompleted) {
        toast({
          title: "Break Time Over",
          description: "Ready to focus again?",
          duration: 5000,
        });
      }
    };

    handleSessionComplete();
  }, [timer.timeLeft, timer.mode, timer.hasCompleted, session?.user?.id, toast]);

  return (
    <Card className="max-w-md mx-auto bg-white border-2 border-black">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          {timer.mode === 'focus' ? 'Focus Time' : 'Break Time'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-6xl font-bold text-center">
          {String(timer.minutes).padStart(2, '0')}:{String(timer.seconds).padStart(2, '0')}
        </div>
        <TimerControls
          isActive={timer.isActive}
          onToggle={timer.isActive ? timer.pauseTimer : timer.startTimer}
          onReset={timer.resetTimer}
        />
        <div className="text-center text-sm text-gray-600">
          Sessions Completed Today: {todaysSessions}
          <br />
          Current Mode: {timer.mode === 'focus' ? 'Focus Time' : 'Break Time'}
        </div>
      </CardContent>
    </Card>
  );
} 
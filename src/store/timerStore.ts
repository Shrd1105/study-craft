import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerState {
  minutes: number;
  seconds: number;
  isActive: boolean;
  mode: 'focus' | 'break';
  timeLeft: number;
  startTime: number | null;
  hasCompleted: boolean; // Track if current session is completed
  sessionStartTime: string | null; // Add this to track session start
}

interface TimerStore extends TimerState {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  completeSession: () => void;
  tick: () => void;
}

const FOCUS_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes 

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      minutes: Math.floor(FOCUS_TIME / 60),
      seconds: 0,
      isActive: false,
      mode: 'focus',
      timeLeft: FOCUS_TIME,
      startTime: null,
      hasCompleted: false,
      sessionStartTime: null,

      startTimer: () => {
        const now = Date.now();
        set({
          isActive: true,
          startTime: now - ((FOCUS_TIME - get().timeLeft) * 1000),
          hasCompleted: false,
          sessionStartTime: new Date().toISOString(), // Track when session started
        });
      },

      pauseTimer: () => {
        set({ isActive: false });
      },

      resetTimer: () => {
        const { mode } = get();
        const newTime = mode === 'focus' ? FOCUS_TIME : BREAK_TIME;
        set({
          timeLeft: newTime,
          minutes: Math.floor(newTime / 60),
          seconds: 0,
          isActive: false,
          startTime: null,
          hasCompleted: false,
          sessionStartTime: null,
        });
      },

      completeSession: () => {
        const { mode, sessionStartTime } = get();
        const newMode = mode === 'focus' ? 'break' : 'focus';
        const newTime = newMode === 'focus' ? FOCUS_TIME : BREAK_TIME;
        
        if (mode === 'focus' && sessionStartTime) {
          // Record completed focus session
          fetch('/api/study-sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              duration: FOCUS_TIME,
              startTime: sessionStartTime,
              endTime: new Date().toISOString(),
              mode: 'focus'
            }),
          }).then(() => {
            // Dispatch event for real-time updates
            window.dispatchEvent(new CustomEvent('study-session-completed'));
          });
        }
        
        set({
          mode: newMode,
          timeLeft: newTime,
          minutes: Math.floor(newTime / 60),
          seconds: 0,
          isActive: false,
          startTime: null,
          hasCompleted: true,
          sessionStartTime: null,
        });
      },

      tick: () => {
        const { isActive, startTime, timeLeft, hasCompleted } = get();
        if (!isActive || !startTime || hasCompleted) return;

        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        const newTimeLeft = Math.max(0, FOCUS_TIME - elapsed);

        if (newTimeLeft !== timeLeft) {
          set({
            timeLeft: newTimeLeft,
            minutes: Math.floor(newTimeLeft / 60),
            seconds: newTimeLeft % 60,
          });

          if (newTimeLeft === 0 && !hasCompleted) {
            get().completeSession();
          }
        }
      },
    }),
    {
      name: 'timer-storage',
      partialize: (state) => ({
        mode: state.mode,
        timeLeft: state.timeLeft,
        sessionStartTime: state.sessionStartTime,
      }),
    }
  )
); 
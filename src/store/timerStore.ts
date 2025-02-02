import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerState {
  timeLeft: number;
  isActive: boolean;
  mode: 'focus' | 'break';
  hasCompleted: boolean;
  minutes: number;
  seconds: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
}

interface TimerStore extends TimerState {
  completeSession: () => void;
  sessionStartTime: string | null;
}

const FOCUS_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes 

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      timeLeft: 1500, // 25 minutes in seconds for focus session
      isActive: false,
      mode: 'focus',
      hasCompleted: false,
      minutes: 25,
      seconds: 0,
      sessionStartTime: null,

      startTimer: () => set({ isActive: true }),
      pauseTimer: () => set({ isActive: false }),

      resetTimer: () => {
        const currentMode = get().mode;
        const newMode = currentMode === 'focus' ? 'break' : 'focus';
        const newTime = newMode === 'focus' ? 1500 : 300; // 25 mins for focus, 5 mins for break
        const newMinutes = newMode === 'focus' ? 25 : 5;
        
        set({
          timeLeft: newTime,
          mode: newMode,
          isActive: false,
          hasCompleted: false,
          minutes: newMinutes,
          seconds: 0,
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
          hasCompleted: true,
          sessionStartTime: null,
        });
      },

      tick: () => {
        const state = get();
        if (state.timeLeft <= 0) {
          set({ isActive: false, hasCompleted: true });
          return;
        }

        const newTimeLeft = state.timeLeft - 0.1;
        const minutes = Math.floor(newTimeLeft / 60);
        const seconds = Math.floor(newTimeLeft % 60);

        set({
          timeLeft: newTimeLeft,
          minutes,
          seconds,
        });
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
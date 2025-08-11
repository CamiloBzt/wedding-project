import { useState, useEffect } from "react";

interface LoadingState {
  isLoading: boolean;
  progress: number;
  error: Error | null;
}

export const useLoadingState = (duration: number = 3000) => {
  const [state, setState] = useState<LoadingState>({
    isLoading: true,
    progress: 0,
    error: null,
  });

  useEffect(() => {
    const increment = 100 / (duration / 50);
    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          return { ...prev, isLoading: false, progress: 100 };
        }
        return { ...prev, progress: Math.min(prev.progress + increment, 100) };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration]);

  const reset = () => {
    setState({ isLoading: true, progress: 0, error: null });
  };

  const setError = (error: Error) => {
    setState({ isLoading: false, progress: 0, error });
  };

  return { ...state, reset, setError };
};

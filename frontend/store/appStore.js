import { create } from 'zustand';

export const useAppStore = create((set) => ({
  leaderboardRefresh: 0,
  bumpLeaderboardRefresh: () =>
    set((state) => ({ leaderboardRefresh: state.leaderboardRefresh + 1 }))
}));

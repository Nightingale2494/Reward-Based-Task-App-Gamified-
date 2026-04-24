'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppStore } from '../store/appStore';

export const useSocket = () => {
  const bump = useAppStore((state) => state.bumpLeaderboardRefresh);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL);
    socket.on('leaderboard:update', bump);

    return () => socket.disconnect();
  }, [bump]);
};

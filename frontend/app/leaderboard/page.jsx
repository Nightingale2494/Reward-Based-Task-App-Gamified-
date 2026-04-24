'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import LeaderboardPodium from '../../components/LeaderboardPodium';
import { api } from '../../lib/api';
import { useSocket } from '../../hooks/useSocket';
import { useAppStore } from '../../store/appStore';

export default function LeaderboardPage() {
  useSocket();
  const refreshTick = useAppStore((state) => state.leaderboardRefresh);
  const [payload, setPayload] = useState({ data: [] });

  useEffect(() => {
    api.get('/leaderboard?limit=20').then((res) => setPayload(res.data));
  }, [refreshTick]);

  return (
    <main>
      <Navbar />
      <section className="max-w-4xl mx-auto p-4">
        <LeaderboardPodium users={payload.data} />
        <div className="card space-y-2">
          {payload.data.map((user, index) => (
            <div key={user._id || user.username} className="flex justify-between border-b border-white/10 py-2 last:border-0">
              <p>#{index + 1} {user.username}</p>
              <p className="text-neon">{user.points} pts</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

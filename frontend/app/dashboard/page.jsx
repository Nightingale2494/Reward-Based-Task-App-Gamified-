'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import ProgressChart from '../../components/ProgressChart';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../lib/api';

const mockProgress = [
  { day: 'Mon', xp: 40 },
  { day: 'Tue', xp: 80 },
  { day: 'Wed', xp: 100 },
  { day: 'Thu', xp: 140 },
  { day: 'Fri', xp: 180 }
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api
      .get('/tasks')
      .then((res) => setTasks(res.data.slice(0, 3)))
      .catch(() => setTasks([]));
  }, []);

  return (
    <main>
      <Navbar />
      <section className="max-w-6xl mx-auto p-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="card"><p className="text-xs text-white/60">Points</p><p className="text-2xl font-bold text-neon">{user?.points ?? 0}</p></div>
          <div className="card"><p className="text-xs text-white/60">Level</p><p className="text-2xl font-bold text-violet">{user?.level ?? 1}</p></div>
          <div className="card"><p className="text-xs text-white/60">Streak</p><p className="text-2xl font-bold">🔥 {user?.streak ?? 0}</p></div>
        </div>

        <ProgressChart data={mockProgress} />

        <div className="card">
          <h3 className="font-semibold mb-2">Daily Task Preview</h3>
          {tasks.length === 0 ? <p className="text-white/70">No tasks yet.</p> : (
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li key={t._id} className="text-sm text-white/80">• {t.title} ({t.points} XP)</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

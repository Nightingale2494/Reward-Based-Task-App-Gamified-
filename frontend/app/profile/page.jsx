'use client';

import Navbar from '../../components/Navbar';
import BadgeGrid from '../../components/BadgeGrid';
import { useAuthStore } from '../../store/authStore';

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <main>
      <Navbar />
      <section className="max-w-4xl mx-auto p-4 space-y-4">
        <div className="card">
          <h2 className="text-2xl font-bold">{user?.username || 'Anonymous Agent'}</h2>
          <p className="text-white/70">Level {user?.level || 1} • {user?.points || 0} XP • 🔥 {user?.streak || 0} day streak</p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold">Achievements</h3>
          <BadgeGrid badges={user?.badges || []} />
        </div>
      </section>
    </main>
  );
}

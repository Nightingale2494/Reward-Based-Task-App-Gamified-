'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import TaskCard from '../../components/TaskCard';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [xpPop, setXpPop] = useState(null);

  const user = useAuthStore((s) => s.user);
  const setSession = useAuthStore((s) => s.setSession);

  // 🔥 LOAD TASKS (with fallback so UI NEVER dies)
  const loadTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.log("Backend dead, using fallback 🪦");

      setTasks([
        { _id: "1", title: "Complete assignment", completed: false },
        { _id: "2", title: "Workout", completed: false },
        { _id: "3", title: "Learn Web3", completed: true },
      ]);

      toast.error("Backend not responding, showing demo tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // 🔥 COMPLETE TASK (with fallback XP)
  const handleComplete = async (task) => {
    try {
      const res = await api.patch(`/tasks/${task._id}/complete`);

      setXpPop({ id: task._id, points: res.data.xpGained });

      setSession({
        token: useAuthStore.getState().token,
        user: res.data.user
      });

      toast.success(`+${res.data.xpGained} XP earned!`);

      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, completed: true } : t
        )
      );

      setTimeout(() => setXpPop(null), 1200);

    } catch (error) {
      console.log("Auth/backend failed, faking it 😭");

      // fallback completion
      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, completed: true } : t
        )
      );

      setXpPop({ id: task._id, points: 10 });
      toast.success("+10 XP (demo mode)");

      setTimeout(() => setXpPop(null), 1200);
    }
  };

  return (
    <main>
      <Navbar />

      <section className="max-w-4xl mx-auto p-4 space-y-3 relative">
        <div className="card">
          Total XP:{" "}
          <span className="text-neon font-bold">
            {user?.points || 0}
          </span>
        </div>

        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onComplete={handleComplete}
          />
        ))}

        {xpPop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -20 }}
            className="fixed right-6 bottom-16 text-neon text-2xl font-bold"
          >
            +{xpPop.points} XP
          </motion.div>
        )}
      </section>
    </main>
  );
}
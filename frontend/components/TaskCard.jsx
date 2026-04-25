'use client';

import { motion } from 'framer-motion';

export default function TaskCard({ task, onComplete }) {
  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-sm text-white/70">{task.description}</p>
          <div className="mt-2 text-xs text-neon uppercase">
            {task.type} • {task.points} XP
          </div>
        </div>
        <button
          onClick={() => onComplete(task)}
          disabled={task.completed}
          className="px-3 py-2 rounded-xl bg-violet hover:opacity-90 disabled:opacity-40"
        >
          {task.completed ? 'Completed' : 'Complete'}
        </button>
      </div>
    </motion.div>
  );
}

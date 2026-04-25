'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressChart({ data }) {
  return (
    <div className="card h-64">
      <h3 className="mb-4 font-semibold">XP Progress</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#8ea2ff" />
          <YAxis stroke="#8ea2ff" />
          <Tooltip />
          <Line type="monotone" dataKey="xp" stroke="#47e5ff" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

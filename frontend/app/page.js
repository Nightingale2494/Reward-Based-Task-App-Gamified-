"use client";

import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/leaderboard"); // adjust port
        const result = await res.json();
        console.log(result);
        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">🏆 Leaderboard</h1>

      {data.length === 0 ? (
        <p>No data yet</p>
      ) : (
        data.map((user, i) => (
          <div key={i} className="card mb-2">
            <p>{user.name}</p>
            <p>{user.points}</p>
          </div>
        ))
      )}
    </div>
  );
}
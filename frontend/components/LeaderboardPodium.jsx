export default function LeaderboardPodium({ users }) {
  const top = users.slice(0, 3);
  return (
    <div className="grid grid-cols-3 gap-3 items-end mb-6">
      {top.map((u, idx) => (
        <div
          key={u._id || u.username}
          className={`card text-center ${idx === 0 ? 'h-44' : idx === 1 ? 'h-36' : 'h-28'}`}
        >
          <div className="text-2xl mb-2">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</div>
          <p className="font-semibold truncate">{u.username}</p>
          <p className="text-neon text-sm">{u.points} pts</p>
        </div>
      ))}
    </div>
  );
}

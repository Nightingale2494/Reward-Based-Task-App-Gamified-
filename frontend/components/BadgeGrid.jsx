export default function BadgeGrid({ badges }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {badges?.map((badge) => (
        <div key={badge._id || badge.name} className="card text-center">
          <div className="text-2xl">{badge.icon}</div>
          <p className="font-semibold mt-2">{badge.name}</p>
          <p className="text-xs text-white/60">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}

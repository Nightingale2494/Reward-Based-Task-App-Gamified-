'use client';

export default function RewardModal({ reward, onClaim, onClose }) {
  if (!reward) return null;

  return (
    <div className="fixed inset-0 bg-black/60 grid place-items-center p-4 z-50">
      <div className="card w-full max-w-md">
        <h3 className="text-xl font-bold">{reward.name}</h3>
        <p className="text-white/70 mt-2">{reward.description}</p>
        <p className="text-neon mt-3">Cost: {reward.cost} XP</p>
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-2 rounded-xl bg-white/10" onClick={onClose}>Cancel</button>
          <button className="px-3 py-2 rounded-xl bg-violet" onClick={() => onClaim(reward)}>
            Claim
          </button>
        </div>
      </div>
    </div>
  );
}

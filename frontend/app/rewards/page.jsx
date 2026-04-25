'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import RewardModal from '../../components/RewardModal';
import { connectFreighterWallet } from '../../lib/freighter';
import { transferTokens } from '../../lib/contract';
import { useAuthStore } from '../../store/authStore';

export default function RewardsPage() {
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);

  const user = useAuthStore((s) => s.user);
  const setSession = useAuthStore((s) => s.setSession);

  // 🔥 STATIC REWARDS (no backend needed)
  useEffect(() => {
    setRewards([
      { _id: "1", name: "Coffee ☕", description: "Get a coffee", cost: 10 },
      { _id: "2", name: "Movie 🎬", description: "Watch a movie", cost: 25 },
      { _id: "3", name: "Pizza 🍕", description: "Eat pizza", cost: 50 }
    ]);
  }, []);

  const handleConnectWallet = async () => {
    try {
      const walletAddress = await connectFreighterWallet();

      setSession({
        token: null,
        user: { walletAddress }
      });

      toast.success('Wallet connected 🚀');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const claim = async (reward) => {
    try {
      if (!user?.walletAddress) {
        toast.error("Connect wallet first 😭");
        return;
      }

      await transferTokens(reward.cost, user.walletAddress);

      toast.success("Tokens sent 🚀");
      setSelectedReward(null);

    } catch (error) {
      console.error(error);
      toast.error("Transfer failed 💀");
    }
  };

  return (
    <main>
      <Navbar />

      <section className="max-w-4xl mx-auto p-4 space-y-3">
        <div className="card flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">Wallet</p>
            <p className="text-neon text-sm break-all">
              {user?.walletAddress || 'Not connected'}
            </p>
          </div>

          <button
            onClick={handleConnectWallet}
            className="px-3 py-2 bg-violet rounded-xl"
          >
            Connect Freighter
          </button>
        </div>

        {rewards.map((reward) => (
          <div key={reward._id} className="card flex items-center justify-between">
            <div>
              <p className="font-semibold">{reward.name}</p>
              <p className="text-sm text-white/70">{reward.description}</p>
            </div>

            <button
              className="px-3 py-2 rounded-xl bg-white/10"
              onClick={() => setSelectedReward(reward)}
            >
              {reward.cost} XP
            </button>
          </div>
        ))}
      </section>

      <RewardModal
        reward={selectedReward}
        onClaim={claim}
        onClose={() => setSelectedReward(null)}
      />
    </main>
  );
}
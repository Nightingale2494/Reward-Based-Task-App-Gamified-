'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import RewardModal from '../../components/RewardModal';
import { api } from '../../lib/api';
import { connectFreighterWallet } from '../../lib/freighter';
import { useAuthStore } from '../../store/authStore';

export default function RewardsPage() {
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);
  const setSession = useAuthStore((s) => s.setSession);
  const auth = useAuthStore((s) => ({ token: s.token, user: s.user }));

  useEffect(() => {
    api.get('/rewards').then((res) => setRewards(res.data));
  }, []);

  const handleConnectWallet = async () => {
    try {
      const walletAddress = await connectFreighterWallet();
      setSession({ token: auth.token, user: { ...auth.user, walletAddress } });
      toast.success('Freighter connected');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const claim = async (rewardId) => {
    try {
      const res = await api.post('/rewards/claim', { rewardId });
      setSession({ token: auth.token, user: res.data.user });
      toast.success('Reward claimed');
      setSelectedReward(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Claim failed');
    }
  };

  return (
    <main>
      <Navbar />
      <section className="max-w-4xl mx-auto p-4 space-y-3">
        <div className="card flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">Wallet</p>
            <p className="text-neon text-sm break-all">{auth.user?.walletAddress || 'Not connected'}</p>
          </div>
          <button onClick={handleConnectWallet} className="px-3 py-2 bg-violet rounded-xl">Connect Freighter</button>
        </div>

        {rewards.map((reward) => (
          <div key={reward._id} className="card flex items-center justify-between">
            <div>
              <p className="font-semibold">{reward.name}</p>
              <p className="text-sm text-white/70">{reward.description}</p>
            </div>
            <button className="px-3 py-2 rounded-xl bg-white/10" onClick={() => setSelectedReward(reward)}>
              {reward.cost} XP
            </button>
          </div>
        ))}
      </section>
      <RewardModal reward={selectedReward} onClaim={claim} onClose={() => setSelectedReward(null)} />
    </main>
  );
}

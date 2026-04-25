"use client";

import { useState } from "react";
import { connectFreighterWallet } from "lib/freighter";
import { addPoints, getPoints } from "lib/contract";

export default function Dashboard() {
  const [wallet, setWallet] = useState("");
  const [points, setPoints] = useState(0);

  const connect = async () => {
    const addr = await connectFreighterWallet();
    setWallet(addr);
  };

  const add = async () => {
    await addPoints(10);
    const pts = await getPoints();
    setPoints(parseInt(pts, 10));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 Reward App</h1>

      <button onClick={connect}>Connect Freighter</button>

      <p>Wallet: {wallet}</p>

      <button onClick={add}>Add 10 Points</button>

      <h2>Points: {points}</h2>
    </div>
  );
}
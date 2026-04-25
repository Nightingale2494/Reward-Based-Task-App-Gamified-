"use client";

import * as StellarSdk from "@stellar/stellar-sdk";
import { connectFreighterWallet, signSorobanTx } from "./freighter";

const {
  TransactionBuilder,
  Networks,
  Contract,
  nativeToScVal,
  rpc
} = StellarSdk;

const CONTRACT_ID = "CDROQKVK2M2AXQTYCVRB55UCMKTZW3RT3ZW2ADXH53GESP3MERPLMOKK";

const RPC_URL = "https://soroban-testnet.stellar.org";

// 🔥 helper to fetch account
const getAccount = async (address) => {
  const res = await fetch(`${RPC_URL}/accounts/${address}`);
  return await res.json();
};

// 🔥 ADD POINTS
export const addPoints = async (amount) => {
  const userAddress = await connectFreighterWallet();

  const account = await getAccount(userAddress);
  const contract = new Contract(CONTRACT_ID);

  const tx = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      contract.call(
        "add_points",
        nativeToScVal(userAddress, { type: "address" }),
        nativeToScVal(amount, { type: "i128" })
      )
    )
    .setTimeout(30)
    .build();

  // simulate via RPC manually
  const simRes = await fetch(`${RPC_URL}/simulateTransaction`, {
    method: "POST",
    body: JSON.stringify({
      transaction: tx.toXDR(),
    }),
  });

  const sim = await simRes.json();

  const preparedTx = rpc.assembleTransaction(tx, sim);

  const signedXDR = await signSorobanTx(
    preparedTx.toXDR(),
    Networks.TESTNET,
    userAddress
  );

  const sendRes = await fetch(`${RPC_URL}/sendTransaction`, {
  method: "POST",
  body: JSON.stringify({
    transaction: signedXDR,
  }),
});

const result = await sendRes.json();
console.log("TX RESULT:", result);

if (result.error) {
  throw new Error(JSON.stringify(result.error));
}

return result;
};

// 📊 GET POINTS
export const getPoints = async () => {
  const userAddress = await connectFreighterWallet();

  const account = await getAccount(userAddress);
  const contract = new Contract(CONTRACT_ID);

  const tx = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      contract.call(
        "get_points",
        nativeToScVal(userAddress, { type: "address" })
      )
    )
    .setTimeout(30)
    .build();

  const simRes = await fetch(`${RPC_URL}/simulateTransaction`, {
    method: "POST",
    body: JSON.stringify({
      transaction: tx.toXDR(),
    }),
  });

  const sim = await simRes.json();
  return sim.result?.retval;
};
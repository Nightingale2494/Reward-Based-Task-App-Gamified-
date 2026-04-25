"use client";

import * as StellarSdk from "@stellar/stellar-sdk";
import { connectFreighterWallet, signSorobanTx } from "./freighter";

const RPC_URL = "https://soroban-testnet.stellar.org";
const NETWORK = StellarSdk.Networks.TESTNET;

// ⚠️ REPLACE THIS WITH YOUR TOKEN CONTRACT ID
const TOKEN_ID = "YOUR_TOKEN_CONTRACT_ID_HERE";

// ⚠️ THIS IS YOUR ADMIN / SENDER WALLET
const FROM_ADDRESS = "YOUR_ADMIN_WALLET_ADDRESS";

export const transferTokens = async (amount, toAddress) => {
  try {
    const userAddress = await connectFreighterWallet();

    const server = new StellarSdk.rpc.Server(RPC_URL);
    const account = await server.getAccount(userAddress);

    const token = new StellarSdk.Contract(TOKEN_ID);

    const tx = new StellarSdk.TransactionBuilder(account, {
      fee: "100",
      networkPassphrase: NETWORK,
    })
      .addOperation(
        token.call(
          "transfer",
          new StellarSdk.Address(FROM_ADDRESS).toScVal(),
          new StellarSdk.Address(toAddress).toScVal(),
          StellarSdk.nativeToScVal(amount, { type: "i128" })
        )
      )
      .setTimeout(30)
      .build();

    const sim = await server.simulateTransaction(tx);
    if (sim.error) {
      console.error(sim);
      throw new Error("Simulation failed");
    }

    const preparedTx = await server.prepareTransaction(tx);

    const signedXDR = await signSorobanTx(
      preparedTx.toXDR(),
      NETWORK,
      userAddress
    );

    const result = await server.sendTransaction(
      StellarSdk.TransactionBuilder.fromXDR(signedXDR, NETWORK)
    );

    console.log("TX SUCCESS:", result);
    return result;

  } catch (err) {
    console.error("TRANSFER ERROR:", err);
    throw err;
  }
};
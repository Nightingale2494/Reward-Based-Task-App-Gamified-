import {
  isConnected,
  requestAccess,
  getAddress,
  signTransaction
} from '@stellar/freighter-api';

// 🔌 Connect wallet
export const connectFreighterWallet = async () => {
  const connected = await isConnected();
  if (!connected.isConnected) {
    throw new Error('Freighter extension not detected.');
  }

  await requestAccess();
  const addr = await getAddress();
  return addr.address;
};

// ✍️ Sign transaction
export const signSorobanTx = async (xdr, networkPassphrase, address) => {
  const signed = await signTransaction(xdr, {
    networkPassphrase,
    address: address
  });

  return signed.signedTxXdr;
};
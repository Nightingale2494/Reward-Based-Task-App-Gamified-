import {
  isConnected,
  requestAccess,
  getAddress,
  signTransaction
} from '@stellar/freighter-api';

export const connectFreighterWallet = async () => {
  const connected = await isConnected();
  if (!connected.isConnected) throw new Error('Freighter extension not detected.');

  await requestAccess();
  const addr = await getAddress();
  return addr.address;
};

export const signSorobanTx = async (xdr, networkPassphrase) => {
  const signed = await signTransaction(xdr, {
    networkPassphrase,
    address: undefined
  });
  return signed.signedTxXdr;
};

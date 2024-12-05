// src/AppContext/CryptoContext.js
import { createContext, useContext, useState } from 'react';
import connectWallet from '../utils/connectWallet';

const CryptoContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCrypto = () => {
  return useContext(CryptoContext);
};

// eslint-disable-next-line react/prop-types
export const CryptoProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);

  // Connect wallet function
  const handleConnectWallet = async (web3Modal) => {
    await connectWallet(web3Modal, setProvider, setAddress);
  };

  // Disconnect / clear wallet data
  const clearWalletData = () => {
    setProvider(null);
    setAddress(null);
  };

  const value = {
    provider,
    address,
    connectWallet: handleConnectWallet,
    clearWalletData, // Add this function to the context
  };

  return <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>;
};

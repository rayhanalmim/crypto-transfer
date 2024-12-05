// src/AppContext/CryptoContext.js
import { ethers } from 'ethers';
import { createContext, useContext, useState } from 'react';

const CryptoContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCrypto = () => {
  return useContext(CryptoContext);
};

// eslint-disable-next-line react/prop-types
export const CryptoProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);

  const connectWallet = async (web3Modal) => {
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      await instance.enable();

      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      setProvider(provider);
      setAddress(userAddress);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setProvider(null);
      setAddress(null);
    }
  };

  const value = {
    provider,
    address,
    connectWallet,
  };

  return <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>;
};

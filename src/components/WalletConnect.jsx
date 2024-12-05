import { useState } from 'react';
import Web3Modal from 'web3modal';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { ethers } from 'ethers';

// eslint-disable-next-line react/prop-types
const WalletConnect = ({ onWalletConnect }) => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      setLoading(true);

      const providerOptions = {
        walletconnect: {
          package: EthereumProvider,
          options: {
            projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Replace with your WalletConnect project ID
            rpc: {
              43113: 'https://api.avax-test.network/ext/bc/C/rpc', // Avalanche Fuji RPC URL
            },
          },
        },
      };

      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
      });

      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);

      await instance.enable();

      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      setAddress(userAddress);
      onWalletConnect(provider); // Pass the provider to the parent component
    } catch (error) {
      console.error('Error connecting wallet:', error);
      onWalletConnect(null); // Ensure the parent knows the connection failed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {address ? (
        <p className="text-lg font-semibold text-green-600">Connected: {address}</p>
      ) : (
        <button
          onClick={connectWallet}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;

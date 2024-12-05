// src/components/WalletConnect/WalletConnect.jsx
import { useState } from 'react';
import Web3Modal from 'web3modal';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { useCrypto } from '../../AppContext/CryptoContext';

const WalletConnect = () => {
  const { connectWallet, address } = useCrypto();
  const [loading, setLoading] = useState(false);

  const handleConnectWallet = async () => {
    setLoading(true);

    const providerOptions = {
      walletconnect: {
        package: EthereumProvider,
        options: {
          projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
          rpc: {
            43113: 'https://api.avax-test.network/ext/bc/C/rpc',
          },
        },
      },
    };

    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });

    await connectWallet(web3Modal, EthereumProvider);

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {address ? (
        <p className="text-lg font-semibold text-green-600">Connected: {address}</p>
      ) : (
        <button
          onClick={handleConnectWallet}
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

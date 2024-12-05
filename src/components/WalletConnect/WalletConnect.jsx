import { useState, useEffect } from 'react';
import { useCrypto } from '../../AppContext/CryptoContext';
import handleConnectWallet from './handleConnectWallet';
import getAccountBalance from '../../utils/getAccountBalance';

const WalletConnect = () => {
    const { connectWallet, address, provider } = useCrypto();
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(null);

    const onConnect = async () => {
        setLoading(true);
        await handleConnectWallet(connectWallet);
        setLoading(false);
    };

    useEffect(() => {
        const fetchBalance = async () => {
            if (address && provider) {
                const accountBalance = await getAccountBalance(provider, address);
                setBalance(accountBalance);
            }
        };

        fetchBalance();
    }, [address, provider]); 

    return (
        <div className="flex flex-col items-center space-y-4">
            {address ? (
                <>
                    <p className="text-lg font-semibold text-green-600">Connected: {address}</p>
                    {balance !== null && (
                        <p className="text-lg font-semibold">Balance: {balance} AVAX</p>
                    )}
                </>
            ) : (
                <button
                    onClick={onConnect}
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

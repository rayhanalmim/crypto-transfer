import { useState, useEffect } from 'react';
import { useCrypto } from '../../AppContext/CryptoContext';
import handleConnectWallet from './handleConnectWallet';
import handleDisconnectWallet from '../../utils/handleDisconnectWallet';
import getAccountBalance from '../../utils/getAccountBalance';

const WalletConnect = () => {
    const { connectWallet,  address, provider, clearWalletData } = useCrypto();
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(null);

    const onConnect = async () => {
        setLoading(true);
        await handleConnectWallet(connectWallet);
        setLoading(false);
    };

    const onDisconnect = () => {
        handleDisconnectWallet(clearWalletData); 
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
        <div className="flex flex-col items-center space-y-6 p-6 rounded-xl shadow-lg">
            {address ? (
                <>
                    <p className="text-xl font-bold text-black">Connected: {address}</p>
                    {balance !== null && (
                        <p className="text-lg font-medium text-black opacity-80">Balance: {balance} AVAX</p>
                    )}
                    <button
                        onClick={onDisconnect}
                        className="mt-4 py-2 px-4 bg-red-500 text-black font-semibold rounded-lg hover:bg-red-600 transition-all"
                    >
                        Disconnect Wallet
                    </button>
                </>
            ) : (
                <button
                    onClick={onConnect}
                    disabled={loading}
                    className={` py-3 px-6 rounded-lg text-white font-semibold text-lg transition-all ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400`}
                >
                    {loading ? 'Connecting...' : 'Connect Wallet'}
                </button>
            )}
        </div>
    );
};

export default WalletConnect;

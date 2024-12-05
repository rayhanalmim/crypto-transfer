// src/components/PaymentForm/PaymentForm.jsx
import { useState } from 'react';
import { ethers } from 'ethers';
import { useCrypto } from '../../AppContext/CryptoContext';


const PaymentForm = () => {
  const { provider } = useCrypto();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [status, setStatus] = useState(null);

  const handlePayment = async () => {
    if (!provider) {
      setStatus('Provider is not connected. Please connect your wallet.');
      return;
    }

    if (!ethers.utils.isAddress(recipient)) {
      setStatus('Please enter a valid recipient address.');
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setStatus('Please enter a valid amount.');
      return;
    }

    try {
      const network = await provider.getNetwork();
      if (network.chainId !== 43113) {
        setStatus('Please connect to the Avalanche Fuji Testnet.');
        return;
      }

      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount),
      });

      await tx.wait();
      setStatus('Payment Successful!');
    } catch (error) {
      setStatus('Payment Failed');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-80"
      />
      <input
        type="text"
        placeholder="Amount in AVAX"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-80"
      />
      <button
        onClick={handlePayment}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Pay
      </button>
      {status && (
        <p className={`text-lg font-semibold ${status.includes('Successful') ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default PaymentForm;

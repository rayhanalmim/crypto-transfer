import { useState } from 'react';
import { ethers } from 'ethers';

// eslint-disable-next-line react/prop-types
const PaymentForm = ({ provider }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [status, setStatus] = useState(null);

  const handlePayment = async () => {
    if (!provider) {
      setStatus('Provider is not connected. Please connect your wallet.');
      return;
    }

    // Validate recipient address
    if (!ethers.utils.isAddress(recipient)) {
      setStatus('Please enter a valid recipient address.');
      return;
    }

    // Validate amount
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setStatus('Please enter a valid amount.');
      return;
    }

    try {
      // Check network
      // eslint-disable-next-line react/prop-types
      const network = await provider.getNetwork();
      console.log('Current Network:', network);
      console.log('Amount to send:', amount);
      console.log('Recipient Address:', recipient);

      if (network.chainId !== 43113) {
        setStatus('Please connect to the Avalanche Fuji Testnet.');
        return;
      }

      // Send transaction
      // eslint-disable-next-line react/prop-types
      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: recipient, // Use the entered recipient address
        value: ethers.utils.parseEther(amount), // Parse amount to wei
      });

      console.log('Transaction sent:', tx);
      await tx.wait();
      console.log('Transaction confirmed:', tx);
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

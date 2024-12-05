import { useState } from 'react';
import { useCrypto } from '../../AppContext/CryptoContext';
import handlePayment from './handlePayment';

const PaymentForm = () => {
    const { provider } = useCrypto();
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [status, setStatus] = useState(null);

    const onPay = async () => {
        await handlePayment(provider, amount, recipient, setStatus);
    };

    return (
        <div className="flex flex-col items-center space-y-4 mt-10">
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
                onClick={onPay}
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

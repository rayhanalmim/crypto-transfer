import { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import PaymentForm from '../components/PaymentForm';

const Home = () => {
  const [provider, setProvider] = useState(null);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Blockchain Transaction</h1>
      <WalletConnect onWalletConnect={setProvider} />
      {provider && <PaymentForm provider={provider} />}
    </div>
  );
};

export default Home;

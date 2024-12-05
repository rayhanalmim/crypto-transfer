// src/pages/Home.jsx

import PaymentForm from "../components/PaymentForm/PaymentForm";
import WalletConnect from "../components/WalletConnect/WalletConnect";

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Blockchain Transaction</h1>
      <WalletConnect />
      <PaymentForm />
    </div>
  );
};

export default Home;

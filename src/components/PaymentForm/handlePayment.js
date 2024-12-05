import { ethers } from 'ethers';

const handlePayment = async (provider, amount, recipient, setStatus) => {
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

export default handlePayment;

import { ethers } from 'ethers';

const connectWallet = async (web3Modal, setProvider, setAddress) => {
    try {
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        await instance.enable();

        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();

        setProvider(provider);
        setAddress(userAddress);
    } catch (error) {
        console.error('Error connecting wallet:', error);
        setProvider(null);
        setAddress(null);
    }
};

export default connectWallet;

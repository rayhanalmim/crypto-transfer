import Web3Modal from 'web3modal';
import { providerOptions } from './providerOptions';

const handleConnectWallet = async (connectWallet, EthereumProvider) => {
    const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
    });

    await connectWallet(web3Modal, EthereumProvider);
};

export default handleConnectWallet;

import { ethers } from 'ethers';

const getAccountBalance = async (provider, address) => {
    try {
        const balance = await provider.getBalance(address);
        return ethers.utils.formatEther(balance); 
    } catch (error) {
        console.error('Error fetching balance:', error);
        return null;
    }
};

export default getAccountBalance;

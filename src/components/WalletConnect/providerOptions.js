import { EthereumProvider } from '@walletconnect/ethereum-provider';

export const providerOptions = {
    walletconnect: {
        package: EthereumProvider,
        options: {
            projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
            rpc: {
                43113: 'https://api.avax-test.network/ext/bc/C/rpc',
            },
        },
    },
};

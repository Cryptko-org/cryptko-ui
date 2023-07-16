import { Environment } from '../app/core/interfaces';

export const environment: Environment = {
  production: false,
  apiUrl: `http://localhost:10000/api`,
  novaposhtaUrl: 'https://api.novaposhta.ua/v2.0/json/',
  blockExplorerUrls: ['https://testnet.bscscan.com/'],
  chainId: '0x61',
  chainName: 'Binance Smart Chain Testnet',
  iconUrls: [
    'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
    'https://cryptologos.cc/logos/bnb-bnb-logo.png',
  ],
  nativeCurrency: {
    name: 'tBNB',
    symbol: 'tBNB',
    decimals: 18,
  },
  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
  requiredChainId: '0x61',
  sendToWalletAddress: '0x75e4c7cdba02d7d7523fea4e148201d2aeae52fc',
};

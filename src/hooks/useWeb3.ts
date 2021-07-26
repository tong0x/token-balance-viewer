import { useEffect } from 'react'
import Web3 from 'web3'

const web3 = new Web3();
const web3ProviderUrl = process.env.WEB3_PROVIDER_ENDPOINT || 'ws://localhost:8546';

// Hook for handling web3 and provider connection + retries
const useWeb3 = () => {
  useEffect(() => {
    refreshProvider();
  }, []);

  const refreshProvider = () => {
    let retries = 0;
    const retry = (event?: any) => {
      if (event) {
        console.error('Web3 provider disconnected or errored.')
        retries += 1
    
        if (retries > 5) {
          console.error(`Max retries of 5 exceeding: ${retries} times tried`)
          return setTimeout(refreshProvider, 5000)
        }
      } else {
        console.error(`Reconnecting web3 provider`)
        refreshProvider()
      }
    };
    const provider = new Web3.providers.WebsocketProvider(web3ProviderUrl);
    provider.on('end', () => retry())
    provider.on('error', () => retry())
  
    web3.setProvider(provider)
    return provider;
  };

  return { web3, refreshProvider };
};

export default useWeb3;
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Loader from "react-loader-spinner"
import { BalanceInputProps } from '@type/props'
import useWeb3 from '@hooks/useWeb3'
import styles from './BalancerInput.module.css'

const etherscan = require('etherscan-api').init(process.env.ETHERSCAN_API_KEY);
const namehash = require('eth-ens-namehash');

// Input component that takes in user's address or ENS name and displays their ERC-20 token balance
const BalanceInput = (props: BalanceInputProps) => {
  const router = useRouter();
  const { web3, refreshProvider } = useWeb3();
  const [address, setAddress] = useState('');
  const [ensName, setEnsName] = useState('');
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const reset = () => {
    setAddress('');
    setEnsName('');
    setBalance('');
  }

  // Perform search on query or token change
  useEffect(() => {
    (async () => {
      if (router.query.q && !Array.isArray(router.query.q)) {
        await onSearch(router.query.q);
      };
    })();
  }, [router.query, props.tokenAddress])

  // Helper for looking up ENS name given address
  const reverseLookup = async (address: string) => {
    try {
      var lookup = address.toLowerCase().substr(2) + '.addr.reverse'
      var ResolverContract = await web3.eth.ens.getResolver(lookup);
      var nh = namehash.hash(lookup);
      var name = await ResolverContract.methods.name(nh).call();
      return name;
    } catch (e) {
      // No ENS name found
      return '';
    }
  }

  // Handles ENS lookup and reverse lookup
  const onSearch = async (value: string) => {
    setError('');
    setLoading(true);
    if (value) {
      let ethAddress: string = '';
      let ensName: string = '';
      
      // Check if input is an ENS name
      if (value.includes('.eth')) {
        ensName = value;
        try {
          ethAddress = await web3.eth.ens.getAddress(value);
        } catch (e) {
          setLoading(false);
          // If websocket connection closes, refresh web3 provider
          if (e.code && e.code === 1006) {
            setError('Websocket connection closed. Refresh the page.');
            return refreshProvider();
          }
          console.error(e);
          return setError('This ENS name does not map to a valid address');
        }
      } else {
        // Check if input is a valid address
        if (web3.utils.isAddress(value)) {
          ensName = await reverseLookup(value);
          ethAddress = value;
        } else {
          setLoading(false);
          return setError('This is not an Ethereum address');
        }
      };

      props.getUserAddress(ethAddress); // Callback for parent component
      // Query etherscan for balance and format it
      try {
        const balance = await etherscan.account.tokenbalance(ethAddress, '', props.tokenAddress);
        const formattedBalance: string = web3.utils.fromWei(`${balance.result}`);
        const clippedBalance: string = `${(+formattedBalance).toFixed(4).replace(/\.0000$/, '')}`;

        setAddress(ethAddress);
        setEnsName(ensName);
        setBalance(clippedBalance);
      } catch (e) {
        setLoading(false);
        console.error(e);
        return setError(e);
      }
    } else {
      reset();
    };
    setLoading(false);
  };

  // Display address, ENS name, and balance
  const renderInfo = () => {
    return (
      <>
        { address && 
          <div className={styles.row}>
            <div className={`${styles.column} ${styles.left}`}> Address: </div> 
            <div className={`${styles.column} ${styles.right}`}> {address} </div>
          </div> 
        }
        { ensName && 
          <div className={styles.row}>
            <div className={`${styles.column} ${styles.left}`}> ENS name: </div> 
            <div className={`${styles.column} ${styles.right}`}> {ensName} </div> 
          </div>
        }
        { balance && 
          <div className={styles.row}>
            <div className={`${styles.column} ${styles.left}`}> Balance: </div> 
            <div className={`${styles.column} ${styles.right}`}> {`${balance} ${props.tokenSymbol}`} </div> 
          </div>
        }
      </>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <div
          className={styles.icon}
        >
          <Image width={'30px'} height={'30px'} alt='Search Icon' src={'/icons/search.svg'}/>
        </div>
        <input 
          className={styles.input} 
          type="text" 
          placeholder="Add your address or ENS name here" 
          onChange={async (e) => {
            router.push({
              pathname: '/',
              query: {
                q: e.target.value
              }
            });
          }}
        />
      </div>
      { loading && 
        <div className={styles.info}>
          <div className={styles.loader}>
            <Loader
              type="Oval"
              color="#00BFFF"
              height={40}
              width={40}
            />
          </div>
        </div>
      }
      { !loading &&
        <div className={styles.info}>
          { error && <h3 className={styles.error}> {error} </h3> }
          { !error && renderInfo() }
        </div>
      }
    </div>
  );
};

export default BalanceInput;
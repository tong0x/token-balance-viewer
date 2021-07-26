import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { Token } from '@type/props'
import tokens from '@utils/tokens'
import BalanceInput from '@components/BalanceInput'
import TokenSelect from '@components/TokenSelect'

export const Home = () => {
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);

  // Callback for getting input address
  const getUserAddress = (inputAddress: string) => {
    console.log(inputAddress);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Token Balance Viewer</title>
        <meta name="description" content="View your favorite ERC20 token's balance!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Token Balance Viewer
        </h1>
        <div className={styles.select}>
          <TokenSelect 
            selectedToken={selectedToken} 
            tokens={tokens}
            onSelect={(token: Token) => setSelectedToken(token)}
          />
        </div>
        <BalanceInput 
          tokenAddress={selectedToken.address}
          tokenSymbol={selectedToken.symbol}
          getUserAddress={getUserAddress}
        />
      </main>
    </div>
  )
};

export default Home;
import Image from 'next/image'
import styles from './TokenSelect.module.css'

import DropdownItem from '@components/DropdownItem'
import { Token, TokenSelectProps } from '@type/props'

// Dropdown menu for selecting ERC 20 tokens
const TokenSelect = (props: TokenSelectProps) => {
  const renderDropdownItems = props.tokens.map((token: Token) => {
    const selected = props.selectedToken.symbol === token.symbol;
    return (
      <div key={token.address} onClick={() => props.onSelect(token)}>
        <DropdownItem symbol={token.symbol} icon={token.icon} selected={selected} />
      </div>
    )
  });

  return (
    <div className={styles.root}>
      <Image width={'40px'} height={'20px'} alt='Token icon' src={props.selectedToken.icon} />
      <div className={styles.name}>
        { props.selectedToken.symbol }
      </div>
      <Image width={'30px'} height={'10px'} alt='Down arrow icon' src={'/icons/down-arrow.svg'} />
      <div className={styles.dropdown}>
        { renderDropdownItems }
      </div>
    </div>
  );
};

export default TokenSelect;
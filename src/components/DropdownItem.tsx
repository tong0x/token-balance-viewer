import Image from 'next/image'
import styles from './DropdownItem.module.css'
import { DropdownItemProps } from '@type/props'

// Menu item in ERC20 token dropdown
const DropdownItem = (props: DropdownItemProps) => {
  return (
    <div 
      key={props.symbol} 
      className={props.selected ? `${styles.dropdownItem} ${styles.selected}` : styles.dropdownItem}
    >
      <Image width={'40px'} height={'20px'} alt='Token icon' src={props.icon} />
      <div className={styles.name}>
        { props.symbol }
      </div>
    </div>
  );
};

export default DropdownItem;
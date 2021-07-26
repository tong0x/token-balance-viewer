export interface BalanceInputProps {
  tokenAddress: string,
  tokenSymbol: string,
  getUserAddress: (currInput: string) => void,
}
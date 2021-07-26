export interface Token {
  symbol: string,
  address: string,
  icon: string
}

export interface TokenSelectProps {
  selectedToken: Token,
  tokens: Token[],
  onSelect: (token: Token) => void
}
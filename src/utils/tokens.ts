import { Token } from "@type/props";

// Example ERC-20 tokens
const tokens: Token[] = [
  { symbol: 'DAI', address: '0x6b175474e89094c44da98b954eedeac495271d0f', icon: '/icons/dai.svg' },
  { symbol: 'ZRX', address: '0xe41d2489571d322189246dafa5ebde1f4699f498', icon: '/icons/zrx.svg' },
  { symbol: 'USDC', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', icon: '/icons/usdc.svg' },
  { symbol: 'BNB', address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52', icon: '/icons/bnb.svg' },
  { symbol: 'UNI', address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', icon: '/icons/uni.svg' }
]

export default tokens;
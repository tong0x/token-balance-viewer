## Instructions for Running Locally

1. Running remote Ethereum node on Infura: create a project in Infura, and copy the endpoint that starts with "wss" associated with the project.

2. Create an API Key on Etherscan. 

3. Create a file named ".env.local" and add this to the file 

4. Run "yarn install" to set up dependencies

5. Run "yarn dev" to start development server


### Environment Variables

Copy this in your ".env.local" file.

```bash
    WEB3_PROVIDER_ENDPOINT=<Infura_Endpoint>
    ETHERSCAN_API_KEY=<Etherscan_API_Key>
```

Substitute <Infura_Endpoint> and <Etherscan_API_Key> with the info you got in step 1 and 2 for instructions.

### Example ERC-20 Tokens

Currently there are 5 tokens listed in src/utils/tokens.ts - DAI, ZRX, USDC, BNB, UNI

### Potential Improvements
- Offer every ERC-20 token as an option through API integrations with coingecko, and allow users to input custom ERC-20 token contract addresses
- Display recent transactions with that token
- Display balances of multiple tokens at once
- Allow user to sign in via wallet and view balances of all of their tokens
- Dark mode

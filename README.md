# ERC-4626 Yield Vault

![Solidity](https://img.shields.io/badge/solidity-^0.8.20-blue)
![Standard](https://img.shields.io/badge/ERC-4626-gold)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

**ERC-4626 Yield Vault** standardizes how yield-bearing tokens work. Instead of custom staking logic, this vault issues Shares (vTokens) representing a pro-rata claim on the underlying asset pool. As the pool grows (via yield), the exchange rate between Shares and Assets changes, benefiting holders.

## Features

-   **Standardized Interface**: Fully compatible with any DeFi protocol supporting ERC-4626.
-   **Auto-Compounding**: Yield is accounted for mathematically; no manual claiming required.
-   **Strategy Pattern**: Separates the vault (accounting) from the strategy (yield generation).

## Usage

```bash
# 1. Install
npm install

# 2. Deploy Vault & Underlying Asset
npx hardhat run deploy.js --network localhost

# 3. User Deposits Assets (Receives Shares)
node deposit.js

# 4. Simulate Yield (Manager adds profit to vault)
node simulate_yield.js

# 5. User Redeems Shares (Receives original + profit)
node redeem.js


import { ethers } from 'ethers';
import {
  UiPoolDataProvider,
  ChainId,
} from '@aave/contract-helpers';
import * as markets from '@bgd-labs/aave-address-book';

// User address
const userAddress = '0x94e96e1b9b8c7ecf8ddb37a379e6bbeffa057c93';

// Total Borrowed: $7,908,193.74
// Available to Borrow: $13,029,271.05
// Supplied Asset Value: $27,383,306.78
// Net Asset Value: $19,475,113.04
// Liquidation Threshold: 80.0%
// Max Loan to Value: 76.5%
// Current Loan to Value: 28.9%
// Utilized Borrowing Power: 38%

// Supplied Assets: 
// WETH (2119.162792), LINK (16267.905637), cbETH (2410.320896), rETH (2242.993476), 
// Borrowed Assets: 
// USDc (7355698.88319), RPL (40778.93349207384)

// Smart Contract : A Provider of Pool Addresses
const poolAddressProvider = markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER;
const poolDataProvider = markets.AaveV3Ethereum.UI_POOL_DATA_PROVIDER;

// Aave: Pool V3
// const aaveV3Address = '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2';

// ------------------------------------------------------------ CONNECTOR: JSON-RCP -- //
// ------------------------------------------------------------ ------------------- -- //

const blastapi = "https://eth-mainnet.public.blastapi.io"; 
const rpcProvider = new ethers.providers.JsonRpcProvider(blastapi,);

// Use a Data Provider Smart Contract
const poolDataProviderContract = new UiPoolDataProvider({
  uiPoolDataProviderAddress: poolDataProvider,
  provider: rpcProvider,
  chainId: ChainId.mainnet,
});

// ---------------------------------------------------------------- FETCH POOL DATA -- // 
// ---------------------------------------------------------------- --------------- -- // 

export async function fetchPoolData() {

  // Object containing array of pool reserves and market base currency data
  // { reservesArray, baseCurrencyData }
  const poolReserves = await poolDataProviderContract.getReservesHumanized({
    lendingPoolAddressProvider: poolAddressProvider,
  });

  return { poolReserves };

}

// --------------------------------------------------------------- FETCH USERS DATA -- // 
// --------------------------------------------------------------- ---------------- -- // 

export async function fetchUsersData() {

  // Object containing array or users aave positions and active eMode category
  // { userReserves, userEmodeCategoryId }
  const userReserves = await poolDataProviderContract.getUserReservesHumanized({
    lendingPoolAddressProvider: poolAddressProvider,
    user: userAddress,
  });

  // Return 
  return { userReserves };

}


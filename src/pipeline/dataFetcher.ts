
import { ethers } from 'ethers';
import {
  UiPoolDataProvider,
  ChainId,
} from '@aave/contract-helpers';
import * as markets from '@bgd-labs/aave-address-book';

import { formatUserSummary, formatReserves } from '@aave/math-utils';
import dayjs from 'dayjs';

// User address to fetch data for, insert address here
const currentAccount = '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2';

// ------------------------------------------------------------ CONNECTOR: JSON-RCP -- //
// ------------------------------------------------------------ ------------------- -- //

const blastapi = "https://eth-mainnet.public.blastapi.io"; 
const rpcProvider = new ethers.providers.JsonRpcProvider(blastapi,);

// Use a Data Provider Smart Contract
const poolDataProviderContract = new UiPoolDataProvider({
  uiPoolDataProviderAddress: markets.AaveV3Ethereum.UI_POOL_DATA_PROVIDER,
  provider: rpcProvider,
  chainId: ChainId.mainnet,
});

// -- 

export async function fetchPoolData() {

  // Object containing array of pool reserves and market base currency data
  // { reservesArray, baseCurrencyData }
  const poolReserves = await poolDataProviderContract.getReservesHumanized({
    lendingPoolAddressProvider: markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
  });

  return { poolReserves };

}

export async function fetchUsersData() {

  // Object containing array or users aave positions and active eMode category
  // { userReserves, userEmodeCategoryId }
  const userReserves = await poolDataProviderContract.getUserReservesHumanized({
    lendingPoolAddressProvider: markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
    user: currentAccount,
  });

  // Return 
  return { userReserves };

}

export async function parsedData() {

  const { poolReserves } = await fetchPoolData();
  const { userReserves } = await fetchUsersData();
  
  const baseCurrencyData = poolReserves.baseCurrencyData;
  const userReservesArray = userReserves.userReserves;
  const currentTimestamp = dayjs().unix();
  const reservesArray = poolReserves.reservesData;

  const formattedReserves = formatReserves({
    reserves: reservesArray,
    currentTimestamp,
    marketReferenceCurrencyDecimals:
      baseCurrencyData.marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
  });

  const userSummary = formatUserSummary({
    currentTimestamp,
    marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    marketReferenceCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
    userReserves: userReservesArray,
    formattedReserves,
    userEmodeCategoryId: userReserves.userEmodeCategoryId,
  });

  console.log({ userSummary, formattedReserves })

}

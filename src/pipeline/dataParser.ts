import { fetchPoolData, fetchUsersData } from './dataFetcher';
import { formatUserSummary, formatReserves } from '@aave/math-utils';
import dayjs from 'dayjs';
import { BigNumber } from 'bignumber.js';
import { UserMetrics } from '../models/data';

export async function parsedData(): Promise<UserMetrics> {

  const { poolReserves } = await fetchPoolData();
  const { userReserves } = await fetchUsersData();
  
  const currentTimestamp = dayjs().unix();
  const baseCurrencyData = poolReserves.baseCurrencyData;
  const poolReservesArray = poolReserves.reservesData;
  
  const userReservesArray = userReserves.userReserves;

  const formattedReserves = formatReserves({
    reserves: poolReservesArray,
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

  // For debugging purposes
  // console.log({ userSummary })

  // -- Parse data to be ready to be inserted

  // Calculate total collateral
  const totalCollateral = new BigNumber(userSummary.totalCollateralUSD);

  // Calculate total borrowed
  const totalBorrowed = new BigNumber(userSummary.totalBorrowsUSD);

  // Extract health factor
  const healthFactor = new BigNumber(userSummary.healthFactor);

  // Determine status based on health factor
  let status;
  if (healthFactor.isGreaterThan(2)) {
    status = 'Excellent';
  } else if (healthFactor.isGreaterThanOrEqualTo(1.6)) {
    status = 'Safe';
  } else if (healthFactor.isGreaterThanOrEqualTo(1.28)) {
    status = 'At Risk';
  } else if (healthFactor.isGreaterThanOrEqualTo(1.0)) {
    status = 'Critical';
  } else {
    status = 'Liquidation';
  }

  const metricsData: UserMetrics = {
    collateral: totalCollateral.toFixed(2),
    borrowed: totalBorrowed.toFixed(2),
    health_index: healthFactor.toFixed(2),
    status: status
  };

  return metricsData;

}


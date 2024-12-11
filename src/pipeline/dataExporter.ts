// src/pipeline/dataExporter.ts
import { Pool } from 'pg';
import { UserMetrics } from '../models/data';

const pool = new Pool({
  user: 'user_1',
  host: 'localhost',
  database: 'datalake',
  password: 'pass_1',
  port: 5432,
});

export async function insertDummyData() {
  const client = await pool.connect();

  try {
    const dummyData = [
      { collateral: 'ETH', borrowed: 1000.5, health_index: 1.5, status: 'Good' },
      { collateral: 'BTC', borrowed: 2000.75, health_index: 1.2, status: 'Excellent' },
      { collateral: 'USDC', borrowed: 500.25, health_index: 0.9, status: 'Warning' },
    ];

    for (const data of dummyData) {
      await client.query(
        'INSERT INTO user_metrics (collateral, borrowed, health_index, status) VALUES ($1, $2, $3, $4)',
        [data.collateral, data.borrowed, data.health_index, data.status]
      );
    }

    console.log('Dummy data inserted successfully');
  } catch (err) {
    console.error('Error inserting dummy data:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

// insertDummyData();

export async function insertUserMetrics(metricsData: UserMetrics) {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO user_metrics (collateral, borrowed, health_index, status)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [
      metricsData.collateral,
      metricsData.borrowed,
      metricsData.health_index,
      metricsData.status
    ];
    await client.query(query, values);
    console.log('User metrics inserted successfully');
  } catch (err) {
    console.error('Error inserting user metrics:', err);
  } finally {
    client.release();
  }
}

// insertUserMetrics();


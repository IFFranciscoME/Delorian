
// src/pipeline/dataExporter.ts
import { Client } from 'pg';

export async function connectAndQueryPostgres() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'datalake',
    user: 'user_1',
    password: 'pass_1'
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const query = `SELECT * FROM user_metrics`;
    const result = await client.query(query);
    
    console.log('user_metrics: ', result);

  } catch (err) {

    console.error('Error connecting to the database', err);
  
  } finally {

    await client.end();
    console.log('Disconnected from PostgreSQL');
    
  }
}

connectAndQueryPostgres();


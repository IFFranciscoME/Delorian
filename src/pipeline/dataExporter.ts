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

    const query = `
      SELECT schemaname, tablename, tableowner
      FROM pg_catalog.pg_tables
      WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'
    `;

    const result = await client.query(query);
    
    console.log('Tables in the database:');
    result.rows.forEach(row => {
      console.log(`Schema: ${row.schemaname}, Table: ${row.tablename}, Owner: ${row.tableowner}`);
    });

  } catch (err) {
    console.error('Error connecting to the database', err);
  } finally {
    await client.end();
    console.log('Disconnected from PostgreSQL');
  }
}

connectAndQueryPostgres();


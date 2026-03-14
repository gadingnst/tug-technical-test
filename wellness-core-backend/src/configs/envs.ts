import * as dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
dotenv.config();

export const CORE_API_BASE_URL =
  process.env.CORE_API_BASE_URL || 'http://localhost:3000';

export const DB_HOST = process.env.DB_HOST || '18.10.1.103';
export const DB_PORT = parseInt(process.env.DB_PORT || '5433', 10);
export const DB_NAME = process.env.DB_NAME || 'wellness_db';
export const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';

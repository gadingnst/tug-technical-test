import * as dotenv from 'dotenv';


dotenv.config();

export const CORE_API_BASE_URL =
  process.env.CORE_API_BASE_URL || 'http://localhost:9100';

export const DB_HOST = process.env.DB_HOST || '10.18.1.103';
export const DB_PORT = parseInt(process.env.DB_PORT || '5433', 10);
export const DB_NAME = process.env.DB_NAME || 'wellness_db';
export const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';

export const BETTER_AUTH_SECRET =
  process.env.BETTER_AUTH_SECRET || 'dev-secret-change-in-production-min-32ch';
export const BETTER_AUTH_URL =
  process.env.BETTER_AUTH_URL || 'http://localhost:9100';

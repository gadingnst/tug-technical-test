import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, bearer } from 'better-auth/plugins';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
} from '@/configs/envs';
import { TRUSTED_ORIGINS } from '@/configs/trusted-origins';

import * as schema from '@/database/schemas';

const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USERNAME,
  password: DB_PASSWORD,
});

const db = drizzle(pool, { schema });

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
  trustedOrigins: TRUSTED_ORIGINS,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin(),
    bearer(),
  ],
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
    },
  },
});

export type Auth = typeof auth;

import { db } from './database.module';
import { sql } from 'drizzle-orm';

async function reset() {
  console.log('Resetting admins...');
  await db.execute(sql`DELETE FROM "user" WHERE email = 'account@gading.dev'`);
  await db.execute(sql`DELETE FROM "admins"`);
  console.log('Reset complete.');
  process.exit(0);
}

reset();

reset();

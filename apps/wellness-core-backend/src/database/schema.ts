import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';

export const wellnessPackages = pgTable('wellness_packages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  duration_minutes: integer('duration_minutes').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

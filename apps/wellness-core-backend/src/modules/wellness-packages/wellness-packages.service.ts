import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DRIZZLE } from '@/database/database.module';
import type { DrizzleDB } from '@/database/database.module';
import { wellnessPackages } from '@/database/schema';
import {
  CreateWellnessPackageInput,
  UpdateWellnessPackageInput,
} from '@wellness/shared-typescript';

@Injectable()
export class WellnessPackagesService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) { }

  async findAll() {
    return this.db.select().from(wellnessPackages);
  }

  async findAllPaginated(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const [data, countResult] = await Promise.all([
      this.db.select().from(wellnessPackages).limit(limit).offset(offset),
      this.db.select({ count: sql<number>`count(*)` }).from(wellnessPackages),
    ]);

    const total = Number(countResult[0].count);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const results = await this.db
      .select()
      .from(wellnessPackages)
      .where(eq(wellnessPackages.id, id));

    if (results.length === 0) {
      throw new NotFoundException(`Package with id ${id} not found`);
    }

    return results[0];
  }

  async create(data: CreateWellnessPackageInput) {
    const results = await this.db
      .insert(wellnessPackages)
      .values({
        name: data.name,
        description: data.description ?? null,
        price: data.price,
        duration_minutes: data.duration_minutes,
      })
      .returning();

    return results[0];
  }

  async update(id: number, data: UpdateWellnessPackageInput) {
    const values: Record<string, any> = {};

    if (data.name !== undefined) values.name = data.name;
    if (data.description !== undefined) values.description = data.description;
    if (data.price !== undefined) values.price = data.price;
    if (data.duration_minutes !== undefined)
      values.duration_minutes = data.duration_minutes;

    if (Object.keys(values).length === 0) {
      return this.findOne(id);
    }

    const results = await this.db
      .update(wellnessPackages)
      .set(values)
      .where(eq(wellnessPackages.id, id))
      .returning();

    if (results.length === 0) {
      throw new NotFoundException(`Package with id ${id} not found`);
    }

    return results[0];
  }

  async remove(id: number) {
    const results = await this.db
      .delete(wellnessPackages)
      .where(eq(wellnessPackages.id, id))
      .returning();

    if (results.length === 0) {
      throw new NotFoundException(`Package with id ${id} not found`);
    }

    return results[0];
  }
}

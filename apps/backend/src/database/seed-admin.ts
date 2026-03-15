import { auth } from '@/modules/auth/auth.provider';
import { db } from '@/database/database.module';
import { admins } from '@/database/schemas';

async function seedAdmin() {
  const email = 'account@gading.dev';
  const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

  console.log('Seeding initial admin user...');

  try {
    // Check if user exists
    const existingAdmins = await db.select().from(admins);
    if (existingAdmins.length > 0) {
      console.log('Admins table already populated, skipping.');
      return;
    }

    // 1. Create User in Better Auth
    const newUser = await auth.api.createUser({
      body: {
        email,
        password,
        name: 'Gading Developer',
        role: 'admin',
      },
    });

    if (!newUser || !newUser.user) {
      throw new Error('Failed to create user in Better Auth');
    }

    // 2. Insert into custom admins table
    await db.insert(admins).values({
      user_id: newUser.user.id,
    });

    console.log('✅ Initial admin created successfully!');
    console.log('----------------------------------------------------');
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}`);
    console.log('----------------------------------------------------');
    console.log('Please save this password securely.');

  } catch (error) {
    console.error('Failed to seed admin:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

void seedAdmin();

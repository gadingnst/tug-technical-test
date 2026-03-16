import { db } from '@/database/database.module';
import { wellnessPackages } from '@/database/schemas';

const packageNames = [
  'Digital Wellness Basic',
  'Mindful Focus Reset',
  'Stress Relief Essentials',
  'Evening Unwind Ritual',
  'Productivity Balance Pack',
  'Sleep Hygiene Starter',
  'Energy Boost Routine',
  'Guided Breathwork Flow',
  'Weekend Recovery Kit',
  'Mindful Movement Session',
  'Workday Calm Bundle',
  'Screen Detox Plan',
  'Recharge & Reflect',
  'Nature Reset Journey',
  'Healthy Habits Builder',
  'Clarity Coaching Mini',
  'Mood Lift Session',
  'Wellness Deep Dive',
  'Holistic Harmony Pack',
  'Focus Sprint Ritual',
];

const packageDescriptions = [
  'Paket wellness untuk membangun kebiasaan sehat dengan langkah ringan.',
  'Sesi fokus terpandu untuk merapikan pikiran dan prioritas harian.',
  'Rangkaian teknik relaksasi untuk meredakan stres harian.',
  'Ritual sore untuk transisi dari aktivitas padat ke waktu istirahat.',
  'Kombinasi strategi agar produktif tanpa kehilangan keseimbangan.',
  'Panduan tidur berkualitas dengan rutinitas yang konsisten.',
  'Latihan singkat untuk mengembalikan energi dan semangat.',
  'Teknik pernapasan terstruktur untuk menenangkan tubuh dan pikiran.',
  'Rencana akhir pekan untuk recovery dan refresh mental.',
  'Sesi gerak ringan dan mindful untuk tubuh lebih rileks.',
  'Toolkit untuk menjaga ketenangan di tengah jadwal padat.',
  'Rencana detoks layar agar fokus kembali stabil.',
  'Sesi refleksi singkat untuk menutup hari dengan tenang.',
  'Aktivasi ulang melalui pendekatan alami dan mindful.',
  'Rangkaian kebiasaan kecil untuk perubahan jangka panjang.',
  'Coaching singkat untuk memperjelas arah dan tujuan.',
  'Sesi pemulihan mood dengan latihan praktis.',
  'Paket intensif untuk eksplorasi wellness lebih dalam.',
  'Kombinasi elemen holistik untuk keseimbangan penuh.',
  'Ritual singkat untuk fokus intens dalam waktu terbatas.',
];

const durationOptions = [30, 45, 60, 75, 90];
const priceOptions = [4900, 6900, 8900, 10900, 12900, 14900];

async function seedWellnessPackages() {
  try {
    const existingPackages = await db.select().from(wellnessPackages);
    if (existingPackages.length >= 20) {
      console.log('Wellness packages already populated, skipping.');
      return;
    }

    const packages = packageNames.map((name, index) => ({
      name,
      description: packageDescriptions[index] ?? null,
      price: priceOptions[index % priceOptions.length],
      duration_minutes: durationOptions[index % durationOptions.length],
    }));

    await db.insert(wellnessPackages).values(packages);
    console.log('✅ Seeded 20 wellness packages successfully.');
  } catch (error) {
    console.error('Failed to seed wellness packages:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

void seedWellnessPackages();

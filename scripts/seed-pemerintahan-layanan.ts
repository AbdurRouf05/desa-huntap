import PocketBase from 'pocketbase';
import { perangkatDesa, layananPublik } from '../lib/dummy-data';

const pb = new PocketBase('https://db-huntap.sagamuda.id');

async function seed() {
  try {
    // Authenticate as admin
    await pb.admins.authWithPassword('admin@desa-sumbermujur.id', 'HuntapSumbermujur2026!');
    console.log('Authenticated successfully.');

    // Seed Officials
    console.log('Seeding Officials...');
    for (let i = 0; i < perangkatDesa.length; i++) {
      const item = perangkatDesa[i];
      try {
        await pb.collection('officials').create({
          name: item.name,
          position: item.position,
          sort_order: i + 1,
        });
        console.log(`Created official: ${item.name}`);
      } catch (err: any) {
        console.error(`Failed to create official ${item.name}:`, err.message);
      }
    }

    // Seed Services
    console.log('Seeding Services...');
    for (let i = 0; i < layananPublik.length; i++) {
      const item = layananPublik[i];
      try {
        await pb.collection('services').create({
          title: item.title,
          description: `<p>${item.description}</p>`,
          requirements: item.requirements,
          icon: item.icon,
          sort_order: i + 1,
        });
        console.log(`Created service: ${item.title}`);
      } catch (err: any) {
        console.error(`Failed to create service ${item.title}:`, err.message);
      }
    }

    console.log('Seeding completed.');
  } catch (err: any) {
    console.error('Failed to authenticate or seed:', err.message);
  }
}

seed();

import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';

const pb = new PocketBase('https://db-huntap.sagamuda.id');

async function fixMuseumImages() {
  try {
    await pb.admins.authWithPassword('admin@desa-sumbermujur.id', 'HuntapSumbermujur2026!');
    console.log('Authenticated successfully.');

    const filePath = path.resolve(process.cwd(), 'public', '1.jpeg');
    if (!fs.existsSync(filePath)) {
      console.log('Could not find public/1.jpeg');
      return;
    }

    const buffer = fs.readFileSync(filePath);
    
    const items = await pb.collection('museum_items').getFullList();
    for (const item of items) {
      if (!item.image) {
        const formData = new FormData();
        formData.append('image', new Blob([buffer]), '1.jpeg');
        await pb.collection('museum_items').update(item.id, formData);
        console.log(`Updated image for museum item: ${item.name}`);
      } else {
        console.log(`Museum item ${item.name} already has an image.`);
      }
    }

    console.log('\nMuseum images fixed successfully!');
  } catch (err: any) {
    console.error('Error fixing data:', err.message);
  }
}

fixMuseumImages();

import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';

const pb = new PocketBase('https://db-huntap.sagamuda.id');

async function fixData() {
  try {
    await pb.admins.authWithPassword('admin@desa-sumbermujur.id', 'HuntapSumbermujur2026!');
    console.log('Authenticated successfully.');

    // 1. Fix Gallery: Delete all gallery items and create just one
    console.log('\n--- Fixing Gallery ---');
    const galleryItems = await pb.collection('gallery').getFullList();
    for (const item of galleryItems) {
      await pb.collection('gallery').delete(item.id);
      console.log(`Deleted gallery item: ${item.id}`);
    }

    const filePath = path.resolve(process.cwd(), 'public', '1.jpeg');
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      
      // Create ONE new gallery item
      const galleryFormData = new FormData();
      galleryFormData.append('title', 'Grebeg Suro dan Ruwat Air');
      galleryFormData.append('album', 'Kegiatan');
      galleryFormData.append('image', new Blob([buffer]), '1.jpeg');
      await pb.collection('gallery').create(galleryFormData);
      console.log('Created single gallery item for Grebeg Suro');

      // 2. Fix News: Update the Grebeg Suro news item with the thumbnail
      console.log('\n--- Fixing News ---');
      try {
        const grebegNews = await pb.collection('news').getFirstListItem(`slug="tradisi-grebeg-suro-sumbermujur"`);
        const newsFormData = new FormData();
        newsFormData.append('thumbnail', new Blob([buffer]), '1.jpeg');
        await pb.collection('news').update(grebegNews.id, newsFormData);
        console.log('Updated thumbnail for Grebeg Suro news article');
      } catch (err: any) {
        console.log('Could not find or update Grebeg Suro news:', err.message);
      }
    } else {
      console.log('Could not find public/1.jpeg');
    }

    console.log('\nData fixed successfully!');
  } catch (err: any) {
    console.error('Error fixing data:', err.message);
  }
}

fixData();

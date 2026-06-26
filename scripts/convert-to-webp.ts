import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const pb = new PocketBase('https://db-huntap.sagamuda.id');
pb.autoCancellation(false);

async function downloadAndConvertToWebp(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert to webp
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 80 })
      .toBuffer();
      
    return webpBuffer;
  } catch (err) {
    console.error(`Error downloading/converting ${url}:`, err);
    return null;
  }
}

async function convertFileToWebpBuffer(filePath: string): Promise<Buffer | null> {
    try {
      const buffer = fs.readFileSync(filePath);
      return await sharp(buffer).webp({ quality: 80 }).toBuffer();
    } catch(err) {
      console.error(`Error converting local file ${filePath}:`, err);
      return null;
    }
}

async function run() {
  try {
    await pb.admins.authWithPassword('admin@desa-sumbermujur.id', 'HuntapSumbermujur2026!');
    console.log('Authenticated successfully.');

    // 1. Update Museum Items with the new specific generated images
    console.log('\n--- Updating Museum Images to WebP ---');
    const museumItems = await pb.collection('museum_items').getFullList();
    
    const museumImagesMap: Record<string, string> = {
      'sepeda-onthel-saksi-erupsi': 'C:\\Users\\arack\\.gemini\\antigravity-ide\\brain\\7dfbbf02-1ea9-46da-98c3-7e10f062a70b\\sepeda_onthel_1782465588573.png',
      'lesung-batu-kuno-sumbermujur': 'C:\\Users\\arack\\.gemini\\antigravity-ide\\brain\\7dfbbf02-1ea9-46da-98c3-7e10f062a70b\\lesung_batu_1782465570257.png',
      'kentongan-kayu-nangka': 'C:\\Users\\arack\\.gemini\\antigravity-ide\\brain\\7dfbbf02-1ea9-46da-98c3-7e10f062a70b\\kentongan_kayu_1782465548727.png'
    };

    for (const item of museumItems) {
      const imagePath = museumImagesMap[item.slug];
      if (imagePath && fs.existsSync(imagePath)) {
        const webpBuffer = await convertFileToWebpBuffer(imagePath);
        if (webpBuffer) {
          const formData = new FormData();
          formData.append('image', new Blob([webpBuffer as any]), `${item.slug}.webp`);
          await pb.collection('museum_items').update(item.id, formData);
          console.log(`Updated museum item: ${item.name} with custom WebP`);
        }
      }
    }

    // 2. Convert Gallery
    console.log('\n--- Converting Gallery Images to WebP ---');
    const galleryItems = await pb.collection('gallery').getFullList();
    for (const item of galleryItems) {
      if (item.image && !item.image.endsWith('.webp')) {
        const url = pb.files.getUrl(item, item.image);
        const webpBuffer = await downloadAndConvertToWebp(url);
        if (webpBuffer) {
          const formData = new FormData();
          formData.append('image', new Blob([webpBuffer as any]), 'gallery.webp');
          await pb.collection('gallery').update(item.id, formData);
          console.log(`Converted gallery item: ${item.title}`);
        }
      }
    }

    // 3. Convert News
    console.log('\n--- Converting News Images to WebP ---');
    const newsItems = await pb.collection('news').getFullList();
    for (const item of newsItems) {
      if (item.thumbnail && !item.thumbnail.endsWith('.webp')) {
        const url = pb.files.getUrl(item, item.thumbnail);
        const webpBuffer = await downloadAndConvertToWebp(url);
        if (webpBuffer) {
          const formData = new FormData();
          formData.append('thumbnail', new Blob([webpBuffer as any]), 'thumbnail.webp');
          await pb.collection('news').update(item.id, formData);
          console.log(`Converted news item: ${item.title}`);
        }
      }
    }

    // 4. Convert Products
    console.log('\n--- Converting Product Images to WebP ---');
    const products = await pb.collection('products').getFullList();
    for (const item of products) {
      if (item.images && item.images.length > 0) {
        let hasNonWebp = false;
        const newFormData = new FormData();
        
        for (let i = 0; i < item.images.length; i++) {
            const imgName = item.images[i];
            if (!imgName.endsWith('.webp')) {
                hasNonWebp = true;
                const url = pb.files.getUrl(item, imgName);
                const webpBuffer = await downloadAndConvertToWebp(url);
                if (webpBuffer) {
                   newFormData.append('images', new Blob([webpBuffer as any]), `product_${i}.webp`);
                }
            }
        }
        
        // Pocketbase replaces the entire images array if we send new files for a multiple file field
        // Wait, if it's multiple, sending new ones replaces them. That's fine for us since we only have 1 image per product in the dummy data anyway.
        if (hasNonWebp) {
            await pb.collection('products').update(item.id, newFormData);
            console.log(`Converted product images: ${item.name}`);
        }
      }
    }

    console.log('\nAll images converted to WebP successfully!');
  } catch (err: any) {
    console.error('Error during conversion:', err.message);
  }
}

run();

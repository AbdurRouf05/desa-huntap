import PocketBase from 'pocketbase';
import { 
  dummyNewsCategories, 
  dummyNews, 
  dummyUmkmStores, 
  dummyProducts, 
  dummyGallery, 
  dummyMuseumItems 
} from '../lib/dummy-data';
import fs from 'fs';
import path from 'path';

const pb = new PocketBase('https://db-huntap.sagamuda.id');

async function downloadBlob(url: string): Promise<Blob | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.blob();
  } catch (err) {
    return null;
  }
}

async function seed() {
  try {
    // Authenticate as admin
    await pb.admins.authWithPassword('admin@desa-sumbermujur.id', 'HuntapSumbermujur2026!');
    console.log('Authenticated successfully.');

    // 1. Seed News Categories
    console.log('\n--- Seeding News Categories ---');
    const categoryIds: Record<string, string> = {};
    for (const cat of dummyNewsCategories) {
      try {
        const record = await pb.collection('news_categories').create({
          name: cat.name,
          slug: cat.slug,
          is_active: cat.isActive,
        });
        categoryIds[cat.slug] = record.id;
        console.log(`Created news category: ${cat.name}`);
      } catch (err: any) {
        console.error(`Failed to create category ${cat.name}:`, err.message);
      }
    }

    // 2. Seed News
    console.log('\n--- Seeding News ---');
    for (const n of dummyNews) {
      try {
        const formData = new FormData();
        formData.append('title', n.title);
        formData.append('slug', n.slug);
        formData.append('excerpt', n.excerpt);
        formData.append('content', n.content);
        if (categoryIds[n.category]) {
          formData.append('category', categoryIds[n.category]);
        }
        formData.append('author', n.author);
        formData.append('is_published', n.isPublished ? 'true' : 'false');
        formData.append('views', n.views.toString());

        // Handle thumbnail
        if (n.slug === 'festival-budaya-desa-huntap') {
          const filePath = path.resolve(process.cwd(), 'public', '1.jpeg');
          if (fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath);
            const blob = new Blob([buffer]);
            formData.append('thumbnail', blob, '1.jpeg');
            console.log(`Attached local 1.jpeg to ${n.slug}`);
          }
        } else if (n.thumbnail && n.thumbnail.startsWith('http')) {
          const blob = await downloadBlob(n.thumbnail);
          if (blob) {
            formData.append('thumbnail', blob, 'thumb.jpg');
          }
        }

        await pb.collection('news').create(formData);
        console.log(`Created news: ${n.title}`);
      } catch (err: any) {
        console.error(`Failed to create news ${n.title}:`, err.message);
      }
    }

    // 3. Seed UMKM Stores
    console.log('\n--- Seeding UMKM Stores ---');
    // First, create the user's specific store
    let userStoreId = '';
    try {
      const userStore = await pb.collection('umkm_stores').create({
        name: "Toko Abdur Rouf",
        slug: "toko-abdur-rouf",
        owner_name: "Abdur Rouf",
        phone: "6283132974120",
        address: "Desa Huntap Sumbermujur",
        description: "Menyediakan berbagai macam produk UMKM khas desa Sumbermujur.",
        is_verified: true,
      });
      userStoreId = userStore.id;
      console.log(`Created user store: Toko Abdur Rouf`);
    } catch (err: any) {
      console.error(`Failed to create user store:`, err.message);
    }

    // 4. Seed Products
    console.log('\n--- Seeding Products ---');
    for (const p of dummyProducts) {
      try {
        const formData = new FormData();
        if (userStoreId) {
          formData.append('store', userStoreId);
        }
        formData.append('name', p.name);
        formData.append('slug', p.slug);
        formData.append('description', p.description);
        formData.append('price', p.price.toString());
        formData.append('discount_price', (p.discountPrice || 0).toString());
        formData.append('category', p.category);
        formData.append('stock', p.stock.toString());
        formData.append('is_featured', p.isFeatured ? 'true' : 'false');

        // Attach image if URL
        if (p.images && p.images.length > 0 && p.images[0].startsWith('http')) {
          const blob = await downloadBlob(p.images[0]);
          if (blob) {
            formData.append('images', blob, 'product.jpg');
          }
        } else {
          // fallback to 1.jpeg if local doesn't exist just to have an image
          const filePath = path.resolve(process.cwd(), 'public', '1.jpeg');
          if (fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath);
            const blob = new Blob([buffer]);
            formData.append('images', blob, '1.jpeg');
          }
        }

        await pb.collection('products').create(formData);
        console.log(`Created product: ${p.name}`);
      } catch (err: any) {
        console.error(`Failed to create product ${p.name}:`, err.message);
      }
    }

    // 5. Seed Gallery
    console.log('\n--- Seeding Gallery ---');
    for (const g of dummyGallery) {
      try {
        const formData = new FormData();
        formData.append('title', g.title);
        formData.append('album', g.album);
        
        // Attach an image since it's required
        const filePath = path.resolve(process.cwd(), 'public', '1.jpeg');
        if (fs.existsSync(filePath)) {
          const buffer = fs.readFileSync(filePath);
          const blob = new Blob([buffer]);
          formData.append('image', blob, '1.jpeg');
        }

        await pb.collection('gallery').create(formData);
        console.log(`Created gallery item: ${g.title}`);
      } catch (err: any) {
        console.error(`Failed to create gallery item ${g.title}:`, err.message);
      }
    }

    // 6. Seed Museum
    console.log('\n--- Seeding Museum ---');
    for (const m of dummyMuseumItems) {
      try {
        const formData = new FormData();
        formData.append('name', m.name);
        formData.append('slug', m.slug);
        formData.append('era', m.era);
        formData.append('condition', m.condition);
        formData.append('location', m.location);
        formData.append('description', m.description);

        if (m.image && m.image.startsWith('http')) {
          const blob = await downloadBlob(m.image);
          if (blob) {
            formData.append('image', blob, 'museum.jpg');
          }
        } else {
          const filePath = path.resolve(process.cwd(), 'public', '1.jpeg');
          if (fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath);
            const blob = new Blob([buffer]);
            formData.append('image', blob, '1.jpeg');
          }
        }

        await pb.collection('museum_items').create(formData);
        console.log(`Created museum item: ${m.name}`);
      } catch (err: any) {
        console.error(`Failed to create museum item ${m.name}:`, err.message);
      }
    }

    console.log('\nSeeding completed successfully!');
  } catch (err: any) {
    console.error('Failed to authenticate or seed:', err.message);
  }
}

seed();

const fs = require('fs');
const files = [
  'app/cp/(dashboard)/museum/tambah/page.tsx',
  'app/cp/(dashboard)/museum/[id]/page.tsx',
  'app/cp/(dashboard)/berita/tambah/page.tsx',
  'app/cp/(dashboard)/berita/[id]/page.tsx',
  'app/cp/(dashboard)/galeri/page.tsx',
  'app/cp/(dashboard)/toko/pemilik/tambah/page.tsx',
  'app/cp/(dashboard)/toko/pemilik/edit/[id]/page.tsx'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('ImageUpload')) {
    content = content.replace(/(import .*;\n)+/m, match => match + 'import { ImageUpload } from "@/components/admin/ImageUpload";\n');
  }

  content = content.replace(/<label htmlFor="([^"]+)"[\s\S]*?<input id="\1"[^>]*>[\s\S]*?<\/label>/g, (match, id) => {
    let nameMatch = match.match(/name="([^"]+)"/);
    let nameStr = nameMatch ? ` name="${nameMatch[1]}"` : '';
    
    // Attempt to extract existing image preview if it's an edit page
    // Look for previous image url pattern, e.g. defaultValue or something.
    // Actually, in the edit pages, we fetch `item` or `article`. We can pass it manually later.
    return `<ImageUpload id="${id}"${nameStr} />`;
  });

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}

/**
 * Converts a given File (Image) to WebP format using the browser's Canvas API.
 * This function significantly reduces file size and saves S3 storage space.
 * 
 * @param file The original image file from input
 * @param quality The quality of the WebP image (0.0 to 1.0), default 0.8
 * @param maxWidth The maximum width to scale down to, default 1920
 * @returns A Promise resolving to the compressed WebP File object
 */
export async function convertToWebP(file: File, quality = 0.8, maxWidth = 1920): Promise<File> {
  if (!file.type.startsWith('image/')) {
    throw new Error('File provided is not an image');
  }

  // Skip conversion for SVG or GIFs to preserve animation/vectors
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas to Blob conversion failed'));
              return;
            }
            
            // Create a new File object from the blob
            const newFilename = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const webpFile = new File([blob], newFilename, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            
            resolve(webpFile);
          },
          'image/webp',
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}

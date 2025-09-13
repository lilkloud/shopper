import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Sample image URLs (replace with actual product image URLs)
const imageUrls = [
  'https://res.cloudinary.com/demo/image/upload/v1557121724/sample.jpg',
  'https://res.cloudinary.com/demo/image/upload/v1557121724/sample2.jpg',
  'https://res.cloudinary.com/demo/image/upload/v1557121724/sample3.jpg',
  'https://res.cloudinary.com/demo/image/upload/v1557121724/sample4.jpg',
  'https://res.cloudinary.com/demo/image/upload/v1557121724/sample5.jpg',
  'https://res.cloudinary.com/demo/image/upload/v1557121724/sample6.jpg',
];

// Download images
async function downloadImage(url, filename) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    const writer = createWriteStream(path.join(imagesDir, filename));

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Error downloading ${url}:`, error.message);
  }
}

// Download all images
async function downloadAllImages() {
  try {
    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const filename = `product-${i + 1}.jpg`;
      console.log(`Downloading ${filename}...`);
      await downloadImage(url, filename);
    }
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

downloadAllImages();

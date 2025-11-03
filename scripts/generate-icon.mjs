import sharp from 'sharp';
import { resolve } from 'path';
import { mkdir } from 'fs/promises';

const size = 512;
const inputPath = resolve('public', 'nobg.png');
const outputDir = resolve('app');
const outputPath = resolve(outputDir, 'icon.png');

const circleSvg = Buffer.from(
  `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white" />
    </svg>`
);

async function generateIcon() {
  await mkdir(outputDir, { recursive: true });

  await sharp(inputPath)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toFile(outputPath);

  console.log(`Generated icon at ${outputPath}`);
}

generateIcon().catch((error) => {
  console.error('Failed to create icon:', error);
  process.exit(1);
});

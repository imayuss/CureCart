import { PrismaClient } from '@prisma/client';
import ImageKit from "imagekit";
import fs from "fs";
import https from "https";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || ""
});

const DEFAULT_IMAGE_URL = "https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/hx2gxivwmeoxxxsc1hix.png";

async function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const data: any[] = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', (err) => reject(err));
  });
}

async function main() {
  console.log("Downloading default image from 1mg...");
  const imageBuffer = await downloadImage(DEFAULT_IMAGE_URL);
  
  console.log("Uploading to ImageKit...");
  const uploadResult = await imagekit.upload({
    file: imageBuffer,
    fileName: "no_preview_available.png",
    folder: "/curecart/medicines"
  });

  const fileId = uploadResult.fileId;
  const url = uploadResult.url;

  console.log(`✅ Uploaded successfully!`);
  console.log(`URL: ${url}`);
  console.log(`FILE ID: ${fileId}`);
  
  console.log("Backfilling all medicines missing an image in the database...");
  const updateResult = await prisma.medicine.updateMany({
    where: {
      image: null
    },
    data: {
      image: url,
      imageFileId: fileId
    }
  });

  console.log(`✅ Success! Updated ${updateResult.count} medicines with the default image.`);
  console.log(`\n\n>> PLEASE ADD THIS TO THE API DELETE LOGIC: ${fileId} <<\n\n`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

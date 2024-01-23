import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import sharp from 'sharp';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (typeof url !== 'string' || !url.includes('dalle')) {
    return res.status(400).json({ message: 'Invalid URL' });
  }

  try {
    const response = await fetch(url);
    const buffer = await response.buffer();

    sharp(buffer)
      .resize({ width: 800 }) // 例として、幅800ピクセルにリサイズ
      .toFormat('jpeg', { quality: 80 }) // JPEG形式に変換し、品質を80に設定
      .toBuffer()
      .then(data => {
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(data);
      });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


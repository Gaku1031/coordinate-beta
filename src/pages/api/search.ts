import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageAnnotatorClient, protos } from '@google-cloud/vision';

async function extractKeywords(imageData: string): Promise<string[]> {
  const client = new ImageAnnotatorClient({
    keyFilename: '/Users/gakuinoue/workspace/coordinate-beta/coordinate-beta-aae8c823afad.json'
  });

  try {
    const [result] = await client.labelDetection({ 
      image: { content: imageData },
      imageContext: {
        languageHints: ['ja']
      } 
    });
    const labels = result.labelAnnotations;
    return labels
      ? labels.map((label: protos.google.cloud.vision.v1.IEntityAnnotation) => label.description ?? '')
      : [];
  } catch (error) {
    console.error('Error during label detection:', error);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const imageData = req.body.imageData;
    const content = imageData.replace(/^data:image\/\w+;base64,/, "");
    const keywords = await extractKeywords(content);
    res.status(200).json({ keywords });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

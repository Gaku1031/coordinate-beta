import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageAnnotatorClient } from '@google-cloud/vision';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // const client = new ProductSearchClient();
    const client = new ImageAnnotatorClient();
    const projectId = 'vision-api-319008';
    const location = 'us-west1';
    const productSetId = 'productSetId';
    const productCategory = 'apparel';

    const content = req.body.imageData;

    const request = {
      image: { content },
      features: [{ type: 'PRODUCT_SEARCH' }],
      imageContext: {
        productSearchParams: {
          project_id: projectId,
          location,
          product_set: productSetId,
          product_categories: [productCategory]
        },
      },
    };

    const [response] = await client.batchAnnotateImages({ requests: [request] } as any);

    // 検索結果を取得
    const results = response.responses?.[0].productSearchResults?.results;

    res.status(200).json({ results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

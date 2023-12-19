import axios from 'axios';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

type ImageData = {
  url: string;
};

export const useGenerateImage = () => {
  const generateImage = useCallback(async (text: string, setImages: React.Dispatch<React.SetStateAction<string[]>>) => {
    try {
      const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      };

      const requestBody = {
        model: "dall-e-3",
        prompt: text,
        n: 1,
        response_format: "url",
      };

      const response = await axios.post<{ data: ImageData[] }>('https://api.openai.com/v1/images/generations', requestBody, { headers });
      setImages(response.data.data.map((imgData: ImageData) => imgData.url));
    } catch (error) {
      toast.error("Error generating image:");
      console.error(error);
    }
  }, []);

  return generateImage;
};

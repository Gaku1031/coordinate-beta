import React, { FC, useState } from 'react'
import { ImageUploadForm } from './presentation'
import axios from 'axios';

export const Container: FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    setImage(e.target.files[0]);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

    const render = new FileReader();
    render.onloadend = async () => {
      try {
        const base64Image = render.result as string;
        const response = await axios.post('/api/search', { imageData: base64Image });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    render.readAsDataURL(image);
  };

  return (
    <ImageUploadForm 
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
    />
  )
}

import React, { FC, useState } from 'react'
import { Search } from './presentation'
import axios from 'axios';
import { BingSearchResult } from '@/types/BingSearchResult';
import { useRouter } from 'next/router';

export const Container: FC = () => {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<BingSearchResult[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageChangeWithReset = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > 1048576) {
        alert('画像のサイズは1MB以下にしてください。');
        return;
      }
      handleImageChange(e);
    }
  };

  const handleButtonClick = () => {
    router.push('/');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
  
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      try {
        // APIリクエストURLを確認（必要に応じてフルURLに変更）
        const response = await axios.post('/api/search', { imageData: base64Image });
        const keywords = response.data.keywords.join(' ');
  
        const query = keywords + ' メンズ, ' + '男性向けファッション, ' + 'オンラインショップ, ' + 'ファッションショッピングサイト';

        // 検索結果を取得
        const results = await searchBing(query);
        setSearchResults(results);
      } catch (error) {
        console.error("Error in submitting image:", error);
      }
    };
  };

  const searchBing = async (query: string) => {
    const url = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}&count=50&responseFilter=Webpages&safeSearch=Strict`;
    const headers = {
      'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_BING_SEARCH_API_KEY
    };
  
    try {
      const response = await axios.get(url, { headers });
      return response.data.webPages.value;
    } catch (error) {
      console.error("Bing Search API error", error);
      // エラーメッセージを返すか、エラー処理を実行する
      throw error;
    }
  };

  return (
    <Search 
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      handleImageChangeWithReset={handleImageChangeWithReset}
      handleButtonClick={handleButtonClick}
      imagePreview={imagePreview}
      searchResults={searchResults}
    />
  )
}

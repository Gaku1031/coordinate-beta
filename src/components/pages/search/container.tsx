import React, { FC, useState } from 'react'
import { Search } from './presentation'
import axios from 'axios';
import { BingSearchResult } from '@/types/BingSearchResult';

export const Container: FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [searchResults, setSearchResults] = useState<BingSearchResult[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

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
  
        const query = keywords + ', ファッションショッピングサイト 日本人男性';

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
      searchResults={searchResults}
    />
  )
}

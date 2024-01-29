import { FC, useState } from 'react'
import { App } from './presentation'
import { useGenerateImage } from '@/hooks/useGenerateImage'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export const Container: FC = () => {
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [text, setText] = useState("");
  const [showFooterForm, setShowFooterForm] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedKeyword_1, setSelectedKeyword_1] = useState("");
  const [selectedKeyword_2, setSelectedKeyword_2] = useState("");
  const [selectedKeyword_3, setSelectedKeyword_3] = useState("");
  const [selectedKeyword_4, setSelectedKeyword_4] = useState("");
  const router = useRouter();

  // ラジオボタンのデータ配列
  const ageButton = [
    { value: 'teens', label: '10代' },
    { value: 'twenties', label: '20代' },
    { value: 'thirties', label: '30代' },
    { value: 'forties', label: '40代' },
    { value: 'fifties', label: '50代' },
    { value: 'sixties', label: '60代' },
  ];
  const heightButton = [
    { value: '141~150', label: '141cm~150cm' }, 
    { value: '151~160', label: '151cm~160cm' },
    { value: '161~170', label: '161cm~170cm' },
    { value: '171~180', label: '171cm~180cm' },
    { value: '181~190', label: '181cm~190cm' },
  ];
  const weightButton = [
    { value: '31~40', label: '31kg~40kg' }, 
    { value: '41~50', label: '41kg~50kg' },
    { value: '51~60', label: '51kg~60kg' },
    { value: '61~70', label: '61kg~70kg' },
    { value: '71~80', label: '71kg~80kg' },
    { value: '81~90', label: '81kg~90kg' },
    { value: '91~100', label: '91kg~100kg' },
  ];
  const seasonButton = [
    { value: 'spring', label: '春服' },
    { value: 'summer', label: '夏服' },
    { value: 'autumn', label: '秋服' },
    { value: 'winter', label: '冬服' },
  ];

  const handleAgeChange = useCallback((value: string) => {
    setSelectedKeyword_1(value);
  }, []);

  const handleHeightChange = useCallback((value: string) => {
    setSelectedKeyword_2(value);
  }, []);

  const handleWeightChange = useCallback((value: string) => {
    setSelectedKeyword_3(value);
  }, []);

  const handleSeasonChange = useCallback((value: string) => {
    setSelectedKeyword_4(value);
  }, []);

  const toggleFooterForm = () => {
    setShowFooterForm(!showFooterForm);
  };

  const generateImage = useGenerateImage();

  const handleGenerateImage = useCallback(async () => {
    setShowFooterForm(!showFooterForm);
    setLoading(true);
    try {
      const generatedText = `Create a full-body fashion coordination image for a male user in their ${selectedKeyword_1}, with a height in the range of ${selectedKeyword_2} cm, and a weight in the range of ${selectedKeyword_3} kg. The outfit should be suitable for ${selectedKeyword_4}. The image should feature a front-facing, single male model. Please ensure a plain background to highlight the outfit.`;
      await generateImage(generatedText, setImages);
    } catch (error) {
      toast.error('予期せぬエラーが発生しました')
    } finally {
      setLoading(false);
    }
  }, [selectedKeyword_1, selectedKeyword_2, selectedKeyword_3, selectedKeyword_4, generateImage, showFooterForm]);

  const handleDownload = async (imageUrl: string) => {
    setDownloadLoading(true);
    try {
      let blob;
  
      if (imageUrl.includes('dalle')) {
        // 'dalle'が含まれる場合のプロキシ経由での取得
        const response = await fetch(`/api/proxy?url=${encodeURIComponent(imageUrl)}`);
        blob = await response.blob();
      } else {
        // 'dalle'が含まれない場合の直接取得
        const response = await fetch(imageUrl);
        blob = await response.blob();
        toast('ダウンロードに失敗しました')
      }
  
      // ダウンロード処理
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = imageUrl.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      router.push('/search');
    } catch (error) {
      toast('ダウンロードに失敗しました');
    } finally {
      setDownloadLoading(false);
    }
  };

  const navigateFusion = () => {
    router.push('http://localhost:7870');
  }

  return (
    <App 
      showFooterForm={showFooterForm}
      toggleFooterForm={toggleFooterForm}
      loading={loading}
      downloadLoading={downloadLoading}
      text={text}
      setText={setText}
      images={images}
      handleGenerateImage={handleGenerateImage}
      ageButton={ageButton}
      heightButton={heightButton}
      weightButton={weightButton}
      seasonButton={seasonButton}
      selectedKeyword_1={selectedKeyword_1}
      selectedKeyword_2={selectedKeyword_2}
      selectedKeyword_3={selectedKeyword_3}
      selectedKeyword_4={selectedKeyword_4}
      handleAgeChange={handleAgeChange}
      handleHeightChange={handleHeightChange}
      handleWeightChange={handleWeightChange}
      handleSeasonChange={handleSeasonChange}
      handleDownload={handleDownload}
      navigateFusion={navigateFusion}
    />
  )
}

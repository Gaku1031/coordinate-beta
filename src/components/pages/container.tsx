import { FC, useState } from 'react'
import { App } from './presentation'
import { useGenerateImage } from '@/hooks/useGenerateImage'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

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

  // ラジオボタンのデータ配列
  const genderButton = [
    { value: 'male', label: '男性' }, 
    { value: 'female', label: '女性' }
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
    { value: '春', label: '春服' },
    { value: '夏', label: '夏服' },
    { value: '秋', label: '秋服' },
    { value: '冬', label: '冬服' },
  ]

  const handleGenderChange = useCallback((value: string) => {
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
      const generatedText = `性別: ${selectedKeyword_1}, 身長: ${selectedKeyword_2}cm, 体重: ${selectedKeyword_3}kgのユーザーに似合う全身の${selectedKeyword_4}コーディネート画像を生成してください。`;
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
    } catch (error) {
      toast('ダウンロードに失敗しました');
    } finally {
      setDownloadLoading(false);
    }
  };

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
      genderButton={genderButton}
      heightButton={heightButton}
      weightButton={weightButton}
      seasonButton={seasonButton}
      selectedKeyword_1={selectedKeyword_1}
      selectedKeyword_2={selectedKeyword_2}
      selectedKeyword_3={selectedKeyword_3}
      selectedKeyword_4={selectedKeyword_4}
      handleGenderChange={handleGenderChange}
      handleHeightChange={handleHeightChange}
      handleWeightChange={handleWeightChange}
      handleSeasonChange={handleSeasonChange}
      handleDownload={handleDownload}
    />
  )
}

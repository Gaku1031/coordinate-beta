import 'tailwindcss/tailwind.css';
import { FC } from 'react'
import Image from 'next/image';
import Loader from '../layout/Loader';
import { LiaDownloadSolid } from "react-icons/lia";
import Link from 'next/link';

type Props = {
  showFooterForm: boolean;
  toggleFooterForm: () => void;
  loading: boolean;
  downloadLoading: boolean;
  text: string;
  setText: (text: string) => void;
  images: string[];
  handleGenerateImage: () => Promise<void>;
  genderButton: { value: string; label: string }[];
  heightButton: { value: string; label: string }[];
  weightButton: { value: string; label: string }[];
  seasonButton: { value: string; label: string }[];
  selectedKeyword_1: string;
  selectedKeyword_2: string;
  selectedKeyword_3: string;
  selectedKeyword_4: string;
  handleGenderChange: (value: string) => void;
  handleHeightChange: (value: string) => void;
  handleWeightChange: (value: string) => void;
  handleSeasonChange: (value: string) => void;
  handleDownload: (imageUrl: string) => Promise<void>;
};

export const App: FC<Props> = ({ 
  showFooterForm, 
  toggleFooterForm, 
  loading, 
  downloadLoading,
  images,
  handleGenerateImage,
  genderButton,
  heightButton,
  weightButton,
  seasonButton,
  selectedKeyword_1,
  selectedKeyword_2,
  selectedKeyword_3,
  selectedKeyword_4,
  handleGenderChange,
  handleHeightChange,
  handleWeightChange,
  handleSeasonChange,
  handleDownload,
}) => {
  return (
    <>
      {/* ダウンロード中のローディングオーバーレイ */}
      {downloadLoading && (
          <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-100">
            <Loader /> {/* ここでローダーを表示 */}
          </div>
      )}
      <div className={`flex flex-col p-6 bg-custom-gradient h-[100vh] gap-4 ${downloadLoading ? 'pointer-events-none' : ''}`} style={{ backgroundImage: 'url(/img/main.png)' }}>
        {loading && <Loader height={'100vh'} />}

        {images.map((url) => (
          <div key={url} className="relative group">
            <img src={url} alt={`Generated image ${url}`} className="w-full h-auto" />
            <button
              onClick={() => handleDownload(url)}
              className="absolute flex items-center top-0 right-0 bg-white shadow bg-opacity-75 p-1 text-xs text-gray-700 font-bold cursor-pointer transition-opacity duration-300 opacity-100 z-100"
            >
              <p>ダウンロード</p>
              <LiaDownloadSolid />
            </button>
          </div>
        ))}

        {!showFooterForm &&
          <nav className="bg-black rounded-full shadow w-80 px-8 py-4 z-50 fixed bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center justify-between">
              <button onClick={toggleFooterForm}>
                <Image
                  src="/Icon/search.svg"
                  alt="search-icon"
                  width={30}
                  height={30}
                />
              </button>
              <Link
                  href="/search"
              >
                <button>
                  <Image
                    src="/Icon/shop.svg"
                    alt="shop-icon"
                    width={40}
                    height={40}
                  />
                </button>
              </Link>
              <button>
                <Image
                  src="/Icon/user.svg"
                  alt="user-icon"
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </nav>
        }
        {showFooterForm &&
          <div className='bottom-0 fixed inset-x-0 transform bg-black border-white p-5 rounded-t-2xl transition-transform duration-300'>
            <div className='absolute right-4 top-4'>
              <button onClick={toggleFooterForm}>
                <Image 
                  src='/Icon/close.svg'
                  alt='close-icon'
                  width={40}
                  height={40}
                />
              </button>
            </div>
            {/* セレクトボックス */}
            <div className='mt-4 grid grid-cols-2 gap-4'>
              <div>
                <label className="font-semibold text-white">性別</label>
                <select 
                  id="gender_select" 
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  value={selectedKeyword_1} 
                  onChange={(e) => handleGenderChange(e.target.value)}
                >
                  {genderButton.map((item_1) => (
                    <option key={item_1.label} value={item_1.value}>
                      {item_1.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
              <label className="font-semibold text-white">身長</label>
                <select 
                  id="height_select" 
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  value={selectedKeyword_2} 
                  onChange={(e) => handleHeightChange(e.target.value)}
                >
                  {heightButton.map((item_2) => (
                    <option key={item_2.label} value={item_2.value}>
                      {item_2.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold text-white">体重</label>
                <select 
                  id="weight_select" 
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  value={selectedKeyword_3} 
                  onChange={(e) => handleWeightChange(e.target.value)}
                >
                  {weightButton.map((item_3) => (
                    <option key={item_3.label} value={item_3.value}>
                      {item_3.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold text-white">コーデ</label>
                <select 
                  id="season_select" 
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  value={selectedKeyword_4} 
                  onChange={(e) => handleSeasonChange(e.target.value)}
                >
                  {seasonButton.map((item_4) => (
                    <option key={item_4.label} value={item_4.value}>
                      {item_4.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={handleGenerateImage} className='flex justify-center items-center mx-auto mt-4 bg-white rounded-full w-25 h-10'>
              <span className='flex items-center justify-center px-8 py-4 text-black'>
                生成
              </span>
            </button>
          </div>
        }
      </div>
    </>
  )
}

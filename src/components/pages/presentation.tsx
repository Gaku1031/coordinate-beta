import "tailwindcss/tailwind.css";
import { FC } from "react";
import Image from "next/image";
import Loader from "../layout/Loader";
import { LiaDownloadSolid } from "react-icons/lia";
import Link from "next/link";

type Props = {
  showFooterForm: boolean;
  toggleFooterForm: () => void;
  loading: boolean;
  downloadLoading: boolean;
  text: string;
  setText: (text: string) => void;
  images: string[];
  handleGenerateImage: () => Promise<void>;
  ageButton: { value: string; label: string }[];
  heightButton: { value: string; label: string }[];
  weightButton: { value: string; label: string }[];
  seasonButton: { value: string; label: string }[];
  selectedKeyword_1: string;
  selectedKeyword_2: string;
  selectedKeyword_3: string;
  selectedKeyword_4: string;
  handleAgeChange: (value: string) => void;
  handleHeightChange: (value: string) => void;
  handleWeightChange: (value: string) => void;
  handleSeasonChange: (value: string) => void;
  handleDownload: (imageUrl: string) => Promise<void>;
  navigateFusion: () => void;
};

export const App: FC<Props> = ({
  showFooterForm,
  toggleFooterForm,
  loading,
  downloadLoading,
  images,
  handleGenerateImage,
  ageButton,
  heightButton,
  weightButton,
  seasonButton,
  selectedKeyword_1,
  selectedKeyword_2,
  selectedKeyword_3,
  selectedKeyword_4,
  handleAgeChange,
  handleHeightChange,
  handleWeightChange,
  handleSeasonChange,
  handleDownload,
  navigateFusion,
}) => {
  return (
    <>
      {/* ダウンロード中のローディングオーバーレイ */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-100">
          <Loader />
        </div>
      )}
      {downloadLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-100">
          <Loader />
        </div>
      )}
      <div
        className={`flex flex-col p-6 bg-custom-gradient h-[100vh] gap-4 ${
          downloadLoading ? "pointer-events-none" : ""
        }`}
        style={{ backgroundImage: "url(/img/main.png)" }}
      >
        {loading && <Loader height={"100vh"} />}

        <div className="fixed inset-0 flex justify-center items-center">
          <p className="text-4xl text-black font-futura tracking-widest">
            MATCH
          </p>
        </div>

        {images.map((url) => (
          <div key={url} className="relative group">
            <img
              src={url}
              alt={`Generated image ${url}`}
              className="w-full h-auto"
            />
            <button
              onClick={() => handleDownload(url)}
              className="absolute flex items-center top-0 right-0 bg-white shadow bg-opacity-75 p-1 text-xs text-gray-700 font-bold cursor-pointer transition-opacity duration-300 opacity-100 z-100"
            >
              <p>ダウンロード</p>
              <LiaDownloadSolid />
            </button>
          </div>
        ))}

        {!showFooterForm && (
          <nav className="fixed z-50 w-80 h-16 max-w-lg -translate-x-1/2 bg-black border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
              <div className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <Link href="/search">
                  <button
                    data-tooltip-target="tooltip-search"
                    type="button"
                    className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
                  >
                    <svg
                      className="w-5 h-5 mb-1 text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                  <p className="text-[10px] text-white text-center">
                    商品検索
                  </p>
                </Link>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={toggleFooterForm}
                  data-tooltip-target="tooltip-new"
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 font-medium bg-white rounded-full group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4 text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                  <span className="sr-only">New item</span>
                </button>
              </div>
              <div
                id="tooltip-new"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Create new item
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>

              <button
                onClick={navigateFusion}
                data-tooltip-target="tooltip-profile"
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <div className="mb-2">
                  <Image
                    src="/Icon/face.svg"
                    alt="face-icon"
                    width={20}
                    height={20}
                  />
                </div>
                <span className="text-[10px] text-white text-center">
                  顔合成
                </span>
              </button>

              <div
                id="tooltip-profile"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Profile
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </nav>
        )}
        {showFooterForm && (
          <div className="bottom-0 fixed inset-x-0 transform bg-black border-white p-5 rounded-t-2xl transition-transform duration-300">
            <div className="absolute right-4 top-4">
              <button onClick={toggleFooterForm}>
                <Image
                  src="/Icon/close.svg"
                  alt="close-icon"
                  width={40}
                  height={40}
                />
              </button>
            </div>
            {/* セレクトボックス */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-white">年代</label>
                <select
                  id="gender_select"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  value={selectedKeyword_1}
                  onChange={(e) => handleAgeChange(e.target.value)}
                >
                  {ageButton.map((item_1) => (
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
            <button
              onClick={handleGenerateImage}
              className="flex justify-center items-center mx-auto mt-4 bg-white rounded-full w-25 h-10"
            >
              <span className="flex items-center justify-center px-8 py-4 text-black">
                生成
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

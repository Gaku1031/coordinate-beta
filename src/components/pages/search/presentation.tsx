import React, { FC } from "react";
import { BingSearchResult } from "@/types/BingSearchResult";
import Image from "next/image";

type Props = {
  handleSubmit: (e: React.FormEvent) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonClick: () => void;
  imagePreview: string | null;
  searchResults: BingSearchResult[];
  handleImageChangeWithReset: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Search: FC<Props> = ({
  handleSubmit,
  handleImageChange,
  handleButtonClick,
  imagePreview,
  searchResults,
  handleImageChangeWithReset,
}) => {
  return (
    <div className={`bg-custom-gradient ${searchResults.length > 0 ? 'h-full' : 'h-screen'} p-6`} style={{ backgroundImage: 'url(/img/search.png)' }}>
      <div className="flex items-center justify-center">
        <button
          onClick={handleButtonClick}
          className="flex items-center justify-center rounded bg-slate-200 p-2"
        >
          <Image src="/Icon/arrow_left.svg" alt="戻る" width={16} height={16} />
        </button>
        <h1 className="text-center text-white font-normal text-base flex-grow">
          検索ページ
        </h1>
        <div className="p-2" style={{ width: 16, height: 16 }}></div> {/* ボタンと同じ幅のスペース */}
      </div>
      <p className="text-slate-200 text-center text-sm mt-2">
        画像をアップロードして検索
      </p>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex items-center justify-center w-full">
          {!imagePreview && (
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    {!imagePreview && (
                      <>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">クリック または ドラッグ＆ドロップ</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF, <span className="font-semibold">1MB以下のファイル</span></p>
                      </>
                    )}
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChangeWithReset} />
            </label>
          )}
          {/* 画像プレビューの表示 */}
          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          )}
        </div> 
        <div className="flex justify-end">
          <button type="submit" className="inline-flex mt-2 items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none">
            検索
          </button> 
        </div>      
      </form>
      {/* 検索結果の表示 */}
      {searchResults.length > 0 && (
        <div className="bg-white px-4 py-2 mt-4 rounded-lg">
          {searchResults.map((result, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <a
                href={result.displayUrl}
                target="_blank"
                className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
              >
                {result.name}
              </a>
              <p className="text-gray-600">{result.snippet}</p>
              {result.imageUrl && (
                <Image
                  src={result.imageUrl}
                  alt={result.name}
                  width={100}
                  height={100}
                  className="mt-2"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

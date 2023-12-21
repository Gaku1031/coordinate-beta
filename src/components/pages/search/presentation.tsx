import React, { FC } from "react";
import { BingSearchResult } from "@/types/BingSearchResult";
import Image from "next/image";

type Props = {
  handleSubmit: (e: React.FormEvent) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: BingSearchResult[];
};

export const Search: FC<Props> = ({
  handleSubmit,
  handleImageChange,
  searchResults,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">検索</button>
      </form>
      {/* 検索結果の表示 */}
      <div>
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
    </>
  );
};

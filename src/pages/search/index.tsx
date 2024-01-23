import { NextPage } from "next";
import Head from "next/head";
import React, { FC } from "react";

import { Search } from "@/components/pages/search";

const Component: FC = () => (
  <>
    <Head>
      <title>画像検索画面</title>
    </Head>

    <Search />
  </>
);

const Page: NextPage = () => {
  return <Component />;
};

export default Page;

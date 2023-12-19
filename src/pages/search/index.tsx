"use client";

import { NextPage } from "next";
import Head from "next/head";
import React, { FC } from "react";

import { ImageUploadForm } from "@/components/organisms/search";

const Component: FC = () => (
  <>
    <Head>
      <title>画像検索画面</title>
    </Head>

    <ImageUploadForm />
  </>
);

const Page: NextPage = () => {
  return <Component />;
};

export default Page;

import 'tailwindcss/tailwind.css';
import { NextPage } from "next";
import Head from "next/head";
import React, { FC } from "react";

import { App } from "@/components/pages";

const Component: FC = () => (
  <>
    <Head>
      <title>ホーム画面</title>
    </Head>

    <App />
  </>
);

const Page: NextPage = () => {
  return <Component />;
};

export default Page;

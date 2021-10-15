import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";

type Props = {
  children?: ReactNode;
  title?: string;
};

const HomeLayout = ({ children, title = "Bakia" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    <div className="h-content">{children}</div>
  </div>
);

export default HomeLayout;

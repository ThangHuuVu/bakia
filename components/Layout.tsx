import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Bakia" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    <div className="">{children}</div>
    <Footer />
  </div>
);

export default Layout;

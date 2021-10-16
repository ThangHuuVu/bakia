import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Bakia" }: Props) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    <div className="min-h-screen mx-auto max-w-content">{children}</div>
    <Footer />
  </>
);

export default Layout;

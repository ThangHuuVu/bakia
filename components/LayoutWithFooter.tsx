import React, { ReactNode } from "react";
import Head from "next/head";
import Footer from "./Footer";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/Header"), { ssr: false });

type Props = {
  children?: ReactNode;
  title?: string;
};

const LayoutWithFooter = ({ children, title = "Bakia" }: Props) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <title>{title}</title>
    </Head>
    <Header />
    <div className="min-h-screen mx-auto max-w-content">{children}</div>
    <Footer />
  </>
);

export default LayoutWithFooter;

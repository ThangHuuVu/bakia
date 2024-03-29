import React, { ReactNode } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/Header"), { ssr: false });

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Bakia" }: Props) => (
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
    <div className="flex justify-center h-content md:h-md-content">{children}</div>
  </>
);

export default Layout;

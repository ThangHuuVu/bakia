import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Bakia" }: Props) => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <title>{title}</title>
    </Head>
    <Header />
    <div className="h-content md:h-md-content">{children}</div>
  </div>
);

export default Layout;

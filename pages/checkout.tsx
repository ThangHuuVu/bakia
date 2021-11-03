import Layout from "@/components/Layout";
import dynamic from "next/dynamic";

const Checkout = dynamic(() => import("@/components/Checkout"), { ssr: false });

const CheckoutPage = () => {
  return (
    <Layout title="Checkout">
      <Checkout />
    </Layout>
  );
};

export default CheckoutPage;

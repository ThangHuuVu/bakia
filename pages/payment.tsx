import Layout from "@/components/Layout";
import dynamic from "next/dynamic";

const Payment = dynamic(() => import("@/components/Payment"), { ssr: false });

const PaymentPage = () => {
  return (
    <Layout title="Payment">
      <Payment />
    </Layout>
  );
};

export default PaymentPage;

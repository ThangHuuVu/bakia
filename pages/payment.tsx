import { getPaymentContent } from "@/lib/cms/datocms";
import dynamic from "next/dynamic";
import { InferGetStaticPropsType } from "next";
import LayoutWithFooter from "@/components/LayoutWithFooter";

const Payment = dynamic(() => import("@/components/Payment"), { ssr: false });

export const getStaticProps = async ({ preview = false }) => {
  const paymentContent = await getPaymentContent(preview);

  return {
    props: {
      paymentContent,
    },
  };
};

const PaymentPage = ({ paymentContent }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <LayoutWithFooter title="Payment">
      <Payment paymentContent={paymentContent} />
    </LayoutWithFooter>
  );
};

export default PaymentPage;

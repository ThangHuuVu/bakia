import Layout from "@/components/Layout";
import { getDiscountCodeDescription } from "@/lib/cms/datocms";
import { getDiscountCode } from "@/lib/db";
import { Discount } from "@/lib/types/discount";
import { InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";

const Checkout = dynamic(() => import("@/components/Checkout"), { ssr: false });

export const getStaticProps = async ({ preview = false }) => {
  const discountCode = await getDiscountCode();
  const { title, detail } = await getDiscountCodeDescription(preview);
  const discount: Discount = {
    code: discountCode,
    detail,
    title,
  };

  return {
    props: {
      discount,
    },
    revalidate: 60,
  };
};

const CheckoutPage = ({ discount }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="Checkout">
      <Checkout discount={discount} />
    </Layout>
  );
};

export default CheckoutPage;

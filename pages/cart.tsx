import LayoutWithFooter from "@/components/LayoutWithFooter";
import { getDiscountCodeDescription } from "@/lib/cms/datocms";
import { getDiscountCode } from "@/lib/db";
import { Discount } from "@/lib/types/discount";
import { InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("@/components/Cart"), { ssr: false });

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

const CartPage = ({ discount }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <LayoutWithFooter title="Cart">
      <Cart discount={discount} />
    </LayoutWithFooter>
  );
};

export default CartPage;

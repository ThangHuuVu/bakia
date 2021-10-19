import CustomizeLab from "@/components/CustomizeLab";
import Layout from "@/components/Layout";
import { getAllCategories } from "@/lib/db";
import { InferGetStaticPropsType } from "next";

const CustomPage = ({ fallbackData }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Custom">
    <CustomizeLab fallbackData={fallbackData} />
  </Layout>
);

export const getStaticProps = async () => {
  const fallbackData = await getAllCategories();

  return {
    props: {
      fallbackData,
    },
  };
};
export default CustomPage;

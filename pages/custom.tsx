import CustomizeLab from "@/components/CustomizeLab";
import Layout from "@/components/Layout";
import { getAllCategories, getGene } from "@/lib/db";
import { InferGetStaticPropsType } from "next";

const CustomPage = ({ categories, gene }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Custom - Bakia">
    <CustomizeLab categories={categories} gene={gene} />
  </Layout>
);

export const getStaticProps = async () => {
  const categories = await getAllCategories();
  const gene = await getGene();

  return {
    props: {
      categories,
      gene,
    },
  };
};
export default CustomPage;

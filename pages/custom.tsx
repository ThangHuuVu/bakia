import Layout from "@/components/Layout";
import { getCategories, getGene } from "@/lib/db";
import { InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";

const CustomizeLab = dynamic(() => import("@/components/CustomizeLab"), { ssr: false });

const CustomPage = ({ categories, gene }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Custom - Bakia">
    <CustomizeLab categories={categories} gene={gene} />
  </Layout>
);

export const getStaticProps = async () => {
  const categories = await getCategories();
  const gene = await getGene();

  return {
    props: {
      categories,
      gene,
    },
    revalidate: 60,
  };
};
export default CustomPage;

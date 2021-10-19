import prisma from "./prisma";

export const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          variants: true,
        },
      },
    },
  });
  return categories.map((category) => ({
    ...category,
    thumbnail: `${process.env.IMG_URL}/Big+item/Desktop/${category.thumbnail}`,
    products: category.products.map(({ updatedAt, createdAt, variants, ...rest }) => ({
      ...rest,
      variants: variants.map(({ createdAt, updatedAt, ...variantRest }) => ({ ...variantRest })),
    })),
  }));
};

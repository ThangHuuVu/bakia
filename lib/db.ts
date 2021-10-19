import prisma from "./prisma";

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          include: {
            variants: {},
          },
        },
      },
    });
    const res = categories.map((category) => ({
      ...category,
      thumbnail: `${process.env.IMG_URL}/Big+item/Desktop/${category.thumbnail}`,
    }));
    return res;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getGene = async () => {
  try {
    const gene = await prisma.gene.findFirst({
      select: {
        name: true,
        description: true,
        price: true,
        image: true,
        currency: {
          select: { id: true, name: true, abbreviationSign: true },
        },
      },
    });
    return gene;
  } catch (e) {
    console.error(e);
    return null;
  }
};

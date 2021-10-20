import prisma from "./prisma";
import { ArrayElement } from "./types/common";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        children: true,
        products: {
          include: {
            variants: {
              include: {
                color: true,
                product: {
                  include: {
                    category: true,
                  },
                },
              },
            },
            category: true,
          },
        },
      },
    });
    return categories.map<ArrayElement<typeof categories>>((category) => ({
      ...category,
      thumbnail: `${process.env.IMG_URL}/Big+item/Desktop/${category.thumbnail}`,
      children: category.children.map((child) => ({
        ...child,
        thumbnail: `${process.env.IMG_URL}/Big+item/Desktop/${child.thumbnail}`,
      })),
      products: category.products.map((product) => ({
        ...product,
        variants: product.variants.map((variant) => ({
          ...variant,
          thumbnail: `${process.env.IMG_URL}/${variant.thumbnail}`,
          image: `${process.env.IMG_URL}/${variant.image}`,
        })),
      })),
    }));
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

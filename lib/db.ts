import prisma from "./prisma";
import { ArrayElement } from "./types/common";
import { CartItem } from "@/lib/types/cart";
import { ShippingInfo } from "@/lib/types/payment";
import { PaymentInfo } from "@/lib/types/payment";
import { OrderStatus } from "@prisma/client";

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
        id: true,
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

export const getDiscountCode = async () => {
  try {
    const discountCode = await prisma.discountCode.findFirst();
    return discountCode;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createOrder = async (
  items: CartItem[],
  shippingInfo: ShippingInfo,
  paymentInfo: PaymentInfo
) => {
  try {
    const allOrders = await prisma.order.count();
    const order = await prisma.order.create({
      data: {
        id: `BAKIA-${allOrders + 1}`,
        paymentMethod: paymentInfo.paymentSource.type,
        accountHolderName: paymentInfo.paymentSource.accountName,
        accountNumber: paymentInfo.paymentSource.accountNumber,
        status: OrderStatus.PENDING,
        total: items.reduce((res, current) => {
          return res + current.total || 0;
        }, 0),
        user: {
          create: {
            fullName: shippingInfo.fullName,
            phoneNumber: shippingInfo.phoneNumber,
            email: shippingInfo.email,
            address: shippingInfo.address,
            gender: shippingInfo.gender,
            area: shippingInfo.area,
            note: shippingInfo.note,
            shippingMethod: shippingInfo.shippingMethod,
          },
        },
        items: {
          create: items.map((item) => ({
            total: item.total,
            discountCode: {
              connect: { id: item.discountCodeId },
            },
            gene: {
              connect: { id: item.gene.id },
            },
            productVariants: {
              connect: item.selectedVariants.map((variant) => ({ id: variant.id })),
            },
          })),
        },
      },
    });
    return order;
  } catch (e) {
    console.error(e);
    return null;
  }
};

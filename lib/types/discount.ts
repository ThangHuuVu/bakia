import { DiscountCode } from "@prisma/client";

export type Discount = {
  code: DiscountCode
  title: string;
  detail: string;
};

import { GeneType, VariantType } from "@/lib/types/custom";
import { DiscountCode } from "@prisma/client";

export type CartItem = {
  id: string;
  selectedVariants: VariantType[];
  gene: GeneType;
  quantity: number;
  discountCode?: DiscountCode;
  discountCodeString?: string;
  createdAt?: Date;
  updatedAt?: Date;
  total?: number;
  selected?: boolean;
};

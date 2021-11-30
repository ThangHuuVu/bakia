import { GeneType, VariantType } from "@/lib/types/custom";

export type CartItem = {
  id: string;
  selectedVariants: VariantType[];
  gene: GeneType;
  quantity: number;
  discountCode?: string;
  discountCodeId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  total?: number;
  selected?: boolean;
};

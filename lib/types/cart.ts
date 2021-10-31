import { GeneType, VariantType } from "@/lib/types/custom";

export type CartItem = {
  id: string;
  selectedVariants: VariantType[];
  gene: GeneType;
  discountCode?: string;
  quantity: number;
};

export type Cart = {
  items?: CartItem[];
};

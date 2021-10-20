import { CategoryType, GeneType } from "@/lib/types/custom";
import { CustomizeLabProvider } from "./context";
import { CustomizeLab } from "./CustomizeLab";

export interface CustomizeLabProps {
  categories: CategoryType[];
  gene: GeneType;
}

export default function CustomizeLabWrapper({ categories, gene }: CustomizeLabProps) {
  return (
    <CustomizeLabProvider categories={categories}>
      <CustomizeLab gene={gene} categories={categories} />
    </CustomizeLabProvider>
  );
}

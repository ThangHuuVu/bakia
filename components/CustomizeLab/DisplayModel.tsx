import { GeneType, VariantType } from "@/lib/types/custom";
import { useEffect, useState } from "react";
import ModelImages from "../ModelImages";

interface DisplayModelProps {
  gene: GeneType;
  selectedVariants: VariantType[];
  currentVariant?: VariantType;
  width: number;
  height: number;
  attachId?: boolean;
}

const useDisplayVariants = (selectedVariants: VariantType[], currentVariant: VariantType) => {
  const [displayVariants, setDisplayVariants] = useState<VariantType[]>([]);
  useEffect(() => {
    const nextVariants = [
      currentVariant,
      ...selectedVariants.filter(
        (variant) => variant.product.categoryId !== currentVariant?.product.categoryId
      ),
    ];
    const isBaseSelected = (id: number) => {
      return nextVariants.some((variant) => variant.productId === id);
    };
    if (currentVariant) {
      setDisplayVariants([
        ...nextVariants.filter(
          (variant) => !variant.product.baseId || isBaseSelected(variant.product.baseId)
        ),
      ]);
    } else {
      setDisplayVariants(selectedVariants);
    }
  }, [selectedVariants, currentVariant]);
  return displayVariants.sort((a, b) => a.product.category.layer - b.product.category.layer);
};

const DisplayModel = ({
  gene,
  selectedVariants,
  width,
  height,
  currentVariant,
  attachId,
}: DisplayModelProps) => {
  const displayVariants = useDisplayVariants(selectedVariants, currentVariant);

  return (
    <ModelImages
      width={width}
      height={height}
      gene={gene}
      displayVariants={displayVariants}
      attachId={attachId}
    />
  );
};

export default DisplayModel;

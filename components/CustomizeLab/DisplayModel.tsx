import { GeneType, VariantType } from "@/lib/types/custom";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    <>
      {gene && (
        <div className="absolute">
          <Image src={gene.image} width={width} height={height} alt={gene.description} id="gene" />
        </div>
      )}
      {Boolean(displayVariants?.length) &&
        displayVariants.map((variant) => (
          <div key={variant.id} className="absolute">
            <Image
              id={attachId && `variant_${variant.id.toString()}`}
              src={variant.image}
              width={width}
              height={height}
              alt={variant.name}
            />
          </div>
        ))}
    </>
  );
};

export default DisplayModel;

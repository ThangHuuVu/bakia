import { GeneType, VariantType } from "@/lib/types/custom";
import Image from "next/image";
import { useEffect, useState } from "react";

interface DisplayModelProps {
  gene: GeneType;
  selectedVariants: VariantType[];
  currentVariant?: VariantType;
  width: number;
  height: number;
}

const useDisplayVariants = (selectedVariants: VariantType[], currentVariant: VariantType) => {
  const [displayVariants, setDisplayVariants] = useState<VariantType[]>([]);
  useEffect(() => {
    if (currentVariant) {
      setDisplayVariants([
        currentVariant,
        ...selectedVariants
          .filter((variant) => variant.product.categoryId !== currentVariant.product.categoryId)
          .filter((variant) => variant.product.baseId === currentVariant.productId),
      ]);
    } else {
      setDisplayVariants(selectedVariants);
    }
  }, [selectedVariants, currentVariant]);
  return displayVariants;
};

const DisplayModel = ({
  gene,
  selectedVariants,
  width,
  height,
  currentVariant,
}: DisplayModelProps) => {
  const displayVariants = useDisplayVariants(selectedVariants, currentVariant);

  return (
    <>
      {gene && (
        <Image
          src="/static/assets/bakia_model.png"
          width={width}
          height={height}
          alt={gene.description}
        />
      )}
      {Boolean(displayVariants?.length) &&
        displayVariants.map((variant) => (
          <div
            key={variant.id}
            className="absolute"
            style={{ zIndex: variant.product.category.layer || 0 }}
          >
            <Image src={variant.image} width={width} height={height} alt={variant.name} />
          </div>
        ))}
    </>
  );
};

export default DisplayModel;

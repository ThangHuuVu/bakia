import Image from "next/image";
import { GeneType, VariantType } from "@/lib/types/custom";

interface ModelImagesProps {
  gene: GeneType;
  displayVariants: VariantType[];
  width: number;
  height: number;
  attachId?: boolean;
}
const ModelImages = ({ gene, displayVariants, width, height, attachId }: ModelImagesProps) => {
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

export default ModelImages;

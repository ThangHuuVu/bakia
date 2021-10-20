import Image from "next/image";
import { format } from "@/lib/currency";
import { useCustomizeLab } from "./context";
import { SelectPanel } from "./SelectPanel";
import { CustomizeLabProps } from ".";

export const CustomizeLab = ({ categories, gene }: CustomizeLabProps) => {
  const { selectedVariants, currentVariant } = useCustomizeLab();
  return (
    <div className="relative h-full px-4 overflow-hidden">
      <div className="flex w-full h-[3.25rem] items-center justify-between mb-5">
        <div className="flex items-center w-1/2 h-full gap-2">
          <svg
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.75 0.75C6.884 0.75 0.5 7.134 0.5 15C0.5 22.866 6.884 29.25 14.75 29.25C22.616 29.25 29 22.866 29 15C29 7.134 22.616 0.75 14.75 0.75ZM16.175 22.125H13.325V13.575H16.175V22.125ZM16.175 10.725H13.325V7.875H16.175V10.725Z"
              fill="#4D5254"
            />
          </svg>
          <div className="flex flex-col">
            {gene && (
              <p className="text-base leading-5 tracking-[-0.3px]">{`${format(
                gene.price,
                gene.currency.abbreviationSign
              )}`}</p>
            )}
            <p className="text-s3 text-[#4D5254]">Nhấn xem thông tin</p>
          </div>
        </div>
        <button className="flex items-center justify-center w-1/2 h-full text-lg italic font-bold uppercase rounded-lg bg-main">
          hoàn thành
        </button>
      </div>
      <div className="flex items-center justify-center w-full px-auto">
        {gene && (
          <Image
            src="/static/assets/bakia_model.png"
            width={348}
            height={545}
            alt={gene.description}
          />
        )}
        {Boolean(selectedVariants?.length) &&
          selectedVariants.map((variant) => (
            <div
              key={variant.id}
              className="absolute"
              style={{ zIndex: variant.product.category.layer || 0 }}
            >
              <Image src={variant.image} width={348} height={545} alt={variant.name} />
            </div>
          ))}
        {currentVariant && (
          <div className="absolute" style={{ zIndex: currentVariant.product.category.layer || 0 }}>
            <Image src={currentVariant.image} width={348} height={545} alt={currentVariant.name} />
          </div>
        )}
      </div>
      <SelectPanel categories={categories} />
    </div>
  );
};

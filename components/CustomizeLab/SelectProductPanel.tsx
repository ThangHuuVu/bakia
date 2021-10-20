import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { VariantColor } from ".prisma/client";
import { ProductType } from "@/lib/types/custom";
import { useCustomizeLab } from "./context";

interface SelectProductPanelProps {
  products: ProductType[];
}

const MAX_COLOR_COUNT = 5;

export const SelectProductPanel = ({ products }: SelectProductPanelProps) => {
  const {
    selectedVariants,
    currentColor,
    currentVariant,
    currentProduct,
    onProductClick,
    onSelectProductVariant,
  } = useCustomizeLab();

  const [colorSlides, setColorSlides] = useState<VariantColor[][]>([]);

  const hasColor = products.some((product) => product.variants.some((variant) => variant.colorId));

  useEffect(() => {
    const colors = currentProduct
      ? currentProduct.variants
          .filter((variant) => variant.color)
          .map((variant) => variant.color as VariantColor)
      : Boolean(products?.length)
      ? products[0].variants
          .filter((variant) => variant.color)
          .map((variant) => variant.color as VariantColor)
      : [];
    let slides: VariantColor[][] = [];
    if (colors.length) {
      for (let i = 0; i <= colors.length; i += MAX_COLOR_COUNT) {
        slides.push(colors.slice(i, i + MAX_COLOR_COUNT));
      }
    }
    setColorSlides(slides);
  }, [currentProduct, products]);

  const isButtonDisabled = Boolean(
    (currentProduct === null && selectedVariants.length === 0) ||
      (currentVariant && selectedVariants.some((variant) => variant.id === currentVariant.id))
  );

  return (
    <div className="w-full h-full flex flex-col justify-between space-y-[0.75rem] px-2 pb-4">
      <div className="flex flex-col justify-between min-h-[9.125rem] mb-[1.375rem] mt-[0.875rem] flex-grow gap-3">
        {hasColor && <ColorSlider colorSlides={colorSlides} />}
        <div className="flex items-center gap-1 overflow-x-scroll overflow-y-hidden">
          <div
            key={0}
            className={`w-[4.875rem] h-[4.875rem] flex-shrink-0 flex items-center justify-center border rounded-lg ${
              !currentProduct ? "border border-black border-solid" : "border-none"
            } bg-background cursor-pointer`}
            onClick={() => onProductClick(0)}
          />
          {products.map((product) => {
            const matchingVariant =
              product.variants.find((variant) => variant.colorId === currentColor?.id) ||
              product.variants[0];
            return (
              <div
                key={product.id}
                className={`w-[4.875rem] h-[4.875rem] flex-shrink-0 flex items-center justify-center border rounded-lg ${
                  selectedVariants.some((variant) => variant.productId === product.id)
                    ? "border-2 border-solid border-darkMint"
                    : currentProduct?.id === product.id
                    ? "border border-black border-solid"
                    : "border-none"
                }`}
              >
                <div
                  className="w-16 h-16 cursor-pointer"
                  onClick={() => onProductClick(product.id)}
                >
                  <Image
                    src={matchingVariant.thumbnail}
                    alt={product.name}
                    width={64}
                    height={64}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="flex items-center justify-center text-xl italic font-black uppercase rounded-lg h-[3.125rem]
          text-black bg-main disabled:bg-grey3 disabled:text-opacity-[0.4]"
        disabled={isButtonDisabled}
        onClick={onSelectProductVariant}
      >
        chọn
      </button>
    </div>
  );
};

const ColorSlider = ({ colorSlides }: { colorSlides: VariantColor[][] }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const { currentColor, onColorClick } = useCustomizeLab();
  return (
    <div
      className="h-[3.125rem] flex overflow-hidden items-center mx-4 gap-1"
      style={{ width: "calc(100% - 2rem)" }}
    >
      <div
        className={`flex-none`}
        style={{
          cursor: isBeginning ? "none" : "pointer",
          opacity: isBeginning ? 0.4 : 1,
        }}
        onClick={() => swiperInstance?.slidePrev()}
      >
        <svg
          width="15"
          height="26"
          viewBox="0 0 15 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.3137 1.68629L2.00002 13L13.3137 24.3137"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <Swiper
        setWrapperSize
        onAfterInit={(swiper) => {
          setSwiperInstance(swiper);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        slidesPerView="auto"
        className="w-full h-full color-swiper"
      >
        {colorSlides.map((slide, idx) => (
          <SwiperSlide
            key={idx}
            className="flex gap-[0.875rem] w-full h-full items-center flex-auto mx-2"
          >
            {slide?.map((color) => (
              <div
                key={color.id}
                style={{ background: color.code }}
                className={`h-[2.5rem] w-[2.5rem] rounded-full cursor-pointer p-1 border  border-solid flex-none ${
                  currentColor?.id === color.id ? "outline-solidBlack" : "outline-none"
                }`}
                onClick={() => onColorClick(color)}
              />
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`flex-none`}
        style={{
          cursor: isEnd ? "none" : "pointer",
          opacity: isEnd ? 0.4 : 1,
        }}
        onClick={() => {
          swiperInstance?.slideNext();
        }}
      >
        <svg
          width="15"
          height="26"
          viewBox="0 0 15 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.94115 24.3137L13.2549 13L1.94115 1.68629"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
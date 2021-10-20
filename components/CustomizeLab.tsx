import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import { format } from "@/lib/currency";
import { getCategories } from "@/lib/db";
import { Category, VariantColor } from ".prisma/client";
import { Awaited } from "@/lib/types/common";
import { CategoryType, GeneType, ProductType, VariantType } from "@/lib/types/custom";

SwiperCore.use([Pagination]);

const MAX_CATEGORY_COUNT = 6;
const MAX_COLOR_COUNT = 5;

interface CustomizeLabProps {
  categories: CategoryType[];
  gene: GeneType;
}

export default function CustomizeLab({ categories, gene }: CustomizeLabProps) {
  const [selectedVariants, setSelectedVariants] = useState<VariantType[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(null);
  const [currentCategory, setCurrentCategory] = useState<CategoryType | null>(null);
  const [currentVariant, setCurrentVariant] = useState<VariantType | null>(null);
  const [currentColor, setCurrentColor] = useState<VariantColor | null>(null);
  const onCategoryClick = useCallback(
    (id: number) => {
      const nextCategory = categories.find((category) => category.id === id);
      if (nextCategory) {
        setCurrentCategory(nextCategory);
      }
    },
    [categories]
  );
  const onBackButtonClick = useCallback(() => {
    const nextCategory = categories.find((category) => category.id === currentCategory?.parentId);
    if (nextCategory) {
      setCurrentCategory(nextCategory);
    } else {
      setCurrentCategory(null);
    }
    setCurrentProduct(null);
    setCurrentVariant(null);
  }, [categories, currentCategory]);
  const onProductClick = useCallback(
    (id: number) => {
      if (id === 0) {
        setCurrentProduct(null);
      } else {
        const nextProduct = currentCategory?.products.find((product) => product.id === id);
        if (nextProduct) {
          setCurrentProduct(nextProduct);
        }
      }
    },
    [currentCategory]
  );
  const onSelectProduct = useCallback(() => {
    if (currentVariant === null) {
      setSelectedVariants([
        ...selectedVariants.filter((variant) => variant.product.categoryId !== currentCategory?.id),
      ]);
    } else {
      setSelectedVariants([
        ...selectedVariants.filter((variant) => variant.product.categoryId !== currentCategory?.id),
        currentVariant,
      ]);
    }
  }, [currentCategory, currentVariant, selectedVariants]);
  const onColorClick = useCallback((color: VariantColor) => {
    setCurrentColor(color);
  }, []);
  useEffect(() => {
    if (currentProduct) {
      setCurrentVariant(
        currentProduct.variants.find((v) => v.colorId === currentColor?.id) ||
          currentProduct.variants[0]
      );
    } else {
      setCurrentVariant(null);
    }
  }, [currentProduct, currentColor]);

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
      <SelectPanel
        selectedVariants={selectedVariants}
        currentProduct={currentProduct}
        currentCategory={currentCategory}
        categories={categories}
        onCategoryClick={onCategoryClick}
        onProductClick={onProductClick}
        onBackButtonClick={onBackButtonClick}
        onSelectProduct={onSelectProduct}
        onColorClick={onColorClick}
        currentColor={currentColor}
        currentVariant={currentVariant}
      />
    </div>
  );
}

interface SelectPanelProps {
  categories: Awaited<ReturnType<typeof getCategories>>;
  selectedVariants: VariantType[];
  currentProduct: ProductType | null;
  currentCategory: CategoryType | null;
  currentColor: VariantColor | null;
  currentVariant: VariantType | null;
  onCategoryClick: (id: number) => void;
  onProductClick: (id: number) => void;
  onBackButtonClick: () => void;
  onSelectProduct: () => void;
  onColorClick: (color: VariantColor) => void;
}

const SelectPanel = ({
  selectedVariants,
  currentProduct,
  currentCategory,
  currentColor,
  currentVariant,
  categories,
  onCategoryClick,
  onProductClick,
  onBackButtonClick,
  onSelectProduct,
  onColorClick,
}: SelectPanelProps) => {
  const topCategories = categories.filter((c) => c.parentId === null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={`absolute w-full h-[21.25rem] transform ${
        isOpen ? "translate-y-0" : "translate-y-[20rem]"
      } transition-transform bottom-0 left-1/2 -translate-x-1/2 px-2 z-30`}
    >
      <div className=" h-full w-full bg-white rounded-t-[0.625rem] pt-[1.875rem]">
        <div className={isOpen ? "flex flex-col items-center prose h-full" : "hidden"}>
          {currentCategory ? (
            <>
              <div
                className="flex items-center justify-between w-full px-2 mx-4 border-b h-9"
                style={{ width: "calc(100% - 2rem)" }}
              >
                <button
                  className="flex items-center justify-center gap-2 cursor-pointer"
                  onClick={onBackButtonClick}
                >
                  <svg
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.6364 6.66071H4.63636L8.59091 2.77679C9.13636 2.24107 9.13636 1.4375 8.59091 0.901786C8.04545 0.366071 7.22727 0.366071 6.68182 0.901786L0.409091 7.0625C-0.136364 7.59821 -0.136364 8.40179 0.409091 8.9375L6.68182 15.0982C7.22727 15.6339 8.04545 15.6339 8.59091 15.0982C9.13636 14.5625 9.13636 13.7589 8.59091 13.2232L4.63636 9.33929H22.6364C23.3182 9.33929 24 8.80357 24 8C24 7.19643 23.3182 6.66071 22.6364 6.66071Z"
                      fill="black"
                    />
                  </svg>
                  <p>Quay lại</p>
                </button>
                <h3>{currentCategory.name}</h3>
              </div>
              <div className="w-full h-full">
                {currentCategory.children.length ? (
                  <div className="grid grid-cols-3 grid-row-2 gap-x-[1.875rem] mt-[1.125rem] gap-y-2 h-full px-[3.25rem]">
                    {currentCategory.children.map((category) => (
                      <CategoryButton
                        key={category.id}
                        category={category}
                        onCategoryClick={() => onCategoryClick(category.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <SelectProductPanel
                    selectedVariants={selectedVariants}
                    products={currentCategory.products}
                    currentColor={currentColor}
                    currentVariant={currentVariant}
                    currentProduct={currentProduct}
                    onProductClick={onProductClick}
                    onSelectProduct={onSelectProduct}
                    onColorClick={onColorClick}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center w-full">
              <h2>Customize Lab</h2>
              <p>Tùy chỉnh ngoại hình- sáng tạo Bakia của bạn</p>
              <Swiper
                className="w-full h-full"
                pagination={{ el: ".swiper-pagination", type: "bullets" }}
              >
                <SwiperSlide>
                  <div className="w-full h-full px-[3.25rem] grid grid-cols-3 grid-rows-2 gap-x-[1.875rem] mt-[1.125rem] gap-y-2 pb-2">
                    {topCategories.slice(0, MAX_CATEGORY_COUNT).map((category) => (
                      <CategoryButton
                        key={category.id}
                        category={category}
                        onCategoryClick={() => onCategoryClick(category.id)}
                      />
                    ))}
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full px-[3.25rem] grid grid-cols-3 grid-rows-2 gap-x-[1.875rem] mt-[1.125rem] gap-y-2  pb-2">
                    {topCategories
                      .slice(MAX_CATEGORY_COUNT, topCategories.length)
                      .map((category) => (
                        <CategoryButton
                          key={category.id}
                          category={category}
                          onCategoryClick={() => onCategoryClick(category.id)}
                        />
                      ))}
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="swiper-pagination" />
            </div>
          )}
        </div>
      </div>
      <button
        className="absolute transform -translate-x-1/2 left-1/2 w-[3.75rem] h-[3.75rem] flex items-center justify-center rounded-full bg-white top-[-1.875rem]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            width="24"
            height="14"
            viewBox="0 0 24 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.68629 1.31371L12 12.6274L23.3137 1.31371"
              stroke="black"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="13"
            viewBox="0 0 24 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.3137 12.3137L12 0.999994L0.686289 12.3137"
              stroke="black"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

interface SelectProductPanelProps {
  selectedVariants: VariantType[];
  products: ProductType[];
  currentProduct: ProductType | null;
  currentColor: VariantColor | null;
  currentVariant: VariantType | null;
  onProductClick: (id: number) => void;
  onSelectProduct: () => void;
  onColorClick: (color: VariantColor) => void;
}

const SelectProductPanel = ({
  selectedVariants,
  currentColor,
  currentVariant,
  products,
  currentProduct,
  onProductClick,
  onSelectProduct,
  onColorClick,
}: SelectProductPanelProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [colorSlides, setColorSlides] = useState<VariantColor[][]>([]);
  const hasColor = products.some((product) => product.variants.some((variant) => variant.colorId));
  useEffect(() => {
    if (currentProduct) {
      const colors = currentProduct.variants
        .filter((variant) => variant.color)
        .map((variant) => variant.color as VariantColor);
      let slides: VariantColor[][] = [];
      if (colors) {
        for (let i = 0; i <= colors.length; i += MAX_COLOR_COUNT) {
          slides.push(colors.slice(i, i + MAX_COLOR_COUNT));
        }
      }
      setColorSlides(slides);
    }
  }, [currentProduct]);
  const isButtonDisabled = Boolean(
    (currentProduct === null && selectedVariants.length === 0) ||
      (currentVariant && selectedVariants.some((variant) => variant.id === currentVariant.id))
  );

  return (
    <div className="w-full h-full flex flex-col justify-between space-y-[0.75rem] px-2 pb-4">
      <div className="flex flex-col justify-between min-h-[9.125rem] mb-[1.375rem] mt-[0.875rem] flex-grow gap-3">
        {hasColor && (
          <div
            className="h-[3.125rem] flex overflow-hidden items-center mx-4 gap-1"
            style={{ width: "calc(100% - 2rem)" }}
          >
            <div
              className="flex-none cursor-pointer prev"
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
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              slidesPerView={"auto"}
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
              className="flex-none cursor-pointer next"
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
        )}
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
        onClick={onSelectProduct}
      >
        chọn
      </button>
    </div>
  );
};

interface CategoryButtonProps {
  category: Category;
  onCategoryClick: () => void;
}

const CategoryButton = ({ category, onCategoryClick }: CategoryButtonProps) => {
  return (
    <div
      className="flex flex-col items-center w-full cursor-pointer max-h-[5.25rem]"
      onClick={onCategoryClick}
    >
      <Image src={category.thumbnail} alt={category.name} width={60} height={60} />
      <span className="mt-1 text-base leading-5 text-center tracking-[-0.019rem]">
        {category.name}
      </span>
    </div>
  );
};

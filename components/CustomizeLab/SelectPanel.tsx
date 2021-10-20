import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import { getCategories } from "@/lib/db";
import { Awaited } from "@/lib/types/common";
import { useCustomizeLab } from "./context";
import { CategoryButton } from "./CategoryButton";
import { SelectProductPanel } from "./SelectProductPanel";

SwiperCore.use([Pagination]);

const MAX_CATEGORY_COUNT = 6;

interface SelectPanelProps {
  categories: Awaited<ReturnType<typeof getCategories>>;
}

export const SelectPanel = ({ categories }: SelectPanelProps) => {
  const { currentCategory, onBackButtonClick, onCategoryClick } = useCustomizeLab();
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
                  <SelectProductPanel products={currentCategory.products} />
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

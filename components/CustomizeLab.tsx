import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import { format } from "@/lib/currency";
import { getAllCategories, getGene } from "@/lib/db";

SwiperCore.use([Pagination]);
const MAX_COUNT = 6;
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
interface CustomizeLabProps {
  categories: Awaited<ReturnType<typeof getAllCategories>>;
  gene: Awaited<ReturnType<typeof getGene>>;
}
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export default function CustomizeLab({ categories, gene }: CustomizeLabProps) {
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
            <p className="text-base leading-5 tracking-[-0.3px]">{`${format(
              gene.price,
              gene.currency.abbreviationSign
            )}`}</p>
            <p className="text-s3 text-[#4D5254]">Nhấn xem thông tin</p>
          </div>
        </div>
        <button className="flex items-center justify-center w-1/2 h-full text-lg italic font-bold uppercase rounded-lg bg-main">
          hoàn thành
        </button>
      </div>
      <div className="flex items-center justify-center w-full px-auto">
        <Image
          src="/static/assets/bakia_model.png"
          width={348}
          height={545}
          alt={gene.description}
        />
      </div>
      <SelectPanel categories={categories} />
    </div>
  );
}
interface SelectPanelProps {
  categories: Awaited<ReturnType<typeof getAllCategories>>;
}

const SelectPanel = ({ categories }: SelectPanelProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const topCategories = categories.filter((category) => category.parentId === null);
  const onCategoryClick = (id: number) => {
    console.log(id);
  };

  return (
    <div
      className={`absolute w-full h-[21.25rem] transform ${
        isOpen ? "translate-y-0" : "translate-y-[20rem]"
      } transition-transform bottom-0 left-1/2 -translate-x-1/2 px-2`}
    >
      <div className=" h-full w-full bg-white rounded-t-[0.625rem] pt-[1.875rem]">
        <div className={isOpen ? "flex flex-col items-center prose" : "hidden"}>
          <h2>Customize Lab</h2>
          <p>Tùy chỉnh ngoại hình- sáng tạo Bakia của bạn</p>
          <Swiper className="w-full" pagination={{ el: ".swiper-pagination", type: "bullets" }}>
            <SwiperSlide>
              <div className="w-full px-[3.25rem] grid grid-cols-3 grid-rows-2 gap-x-[1.875rem] mt-[1.125rem] gap-y-2">
                {topCategories.slice(0, MAX_COUNT).map((category) => (
                  <CategoryButton
                    key={category.id}
                    category={category}
                    onCategoryClick={() => onCategoryClick(category.id)}
                  />
                ))}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full px-[3.25rem] grid grid-cols-3 grid-rows-2 gap-x-[1.875rem] mt-[1.125rem] gap-y-2">
                {topCategories.slice(MAX_COUNT, topCategories.length).map((category) => (
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

interface CategoryButtonProps {
  category: ArrayElement<Awaited<ReturnType<typeof getAllCategories>>>;
  onCategoryClick: () => void;
}
const CategoryButton = ({ category, onCategoryClick }: CategoryButtonProps) => {
  return (
    <div
      className="w-[3.75rem] flex flex-col items-center cursor-pointer"
      onClick={onCategoryClick}
    >
      <Image src={category.thumbnail} alt={category.name} width={60} height={60} />
      <span className="mt-1">{category.name}</span>
    </div>
  );
};

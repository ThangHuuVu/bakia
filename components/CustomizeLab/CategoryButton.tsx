import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryButtonProps {
  category: Category;
  onCategoryClick: () => void;
}

export const CategoryButton = ({ category, onCategoryClick }: CategoryButtonProps) => {
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

import { VariantColor } from ".prisma/client";
import { Container } from "@/lib/types/common";
import { CategoryType, ProductType, VariantType } from "@/lib/types/custom";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type State = {
  currentCategory: CategoryType | null;
  currentProduct: ProductType | null;
  currentVariant: VariantType | null;
  selectedVariants: VariantType[];
  currentColor: VariantColor | null;
  onCategoryClick: (id: number) => void;
  onProductClick: (id: number) => void;
  onBackButtonClick: () => void;
  onSelectProductVariant: () => void;
  onColorClick: (color: VariantColor) => void;
};

const initialState: State = {
  currentCategory: null,
  currentProduct: null,
  currentVariant: null,
  selectedVariants: [],
  currentColor: null,
  onCategoryClick: (id: number) => {},
  onProductClick: (id: number) => {},
  onBackButtonClick: () => {},
  onSelectProductVariant: () => {},
  onColorClick: (color: VariantColor) => {},
};

const CustomContext = createContext<State>(initialState);

export function useCustomizeLab() {
  return useContext(CustomContext);
}

interface CustomizeLabProviderProps extends Container {
  categories: CategoryType[];
}

export function CustomizeLabProvider({ categories, children }: CustomizeLabProviderProps) {
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
  const onSelectProductVariant = useCallback(() => {
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
  const onColorClick = useCallback(
    (color: VariantColor) => {
      if (currentProduct) {
        setCurrentColor(color);
      } else {
        setCurrentColor(null);
      }
    },
    [currentProduct]
  );
  useEffect(() => {
    if (currentProduct) {
      const nextVariant =
        currentProduct.variants.find((v) => v.colorId === currentColor?.id) ||
        currentProduct.variants[0];
      setCurrentVariant(nextVariant);
      setCurrentColor(nextVariant.color);
    } else {
      setCurrentVariant(null);
      setCurrentColor(null);
    }
  }, [currentProduct, currentColor]);

  const value: State = {
    currentCategory,
    currentProduct,
    currentVariant,
    selectedVariants,
    currentColor,
    onBackButtonClick,
    onCategoryClick,
    onColorClick,
    onProductClick,
    onSelectProductVariant,
  };
  return <CustomContext.Provider value={value}>{children}</CustomContext.Provider>;
}
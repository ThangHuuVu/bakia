import { VariantColor } from "@prisma/client";
import { Container } from "@/lib/types/common";
import { CategoryType, GeneType, ProductType, VariantType } from "@/lib/types/custom";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import useAddToCart from "./useAddToCart";

type State = {
  categories: CategoryType[];
  gene: GeneType;
  currentCategory: CategoryType | null;
  currentProduct: ProductType | null;
  allProducts: ProductType[];
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
  categories: [],
  gene: null,
  currentCategory: null,
  currentProduct: null,
  allProducts: [],
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
  gene: GeneType;
}

export function CustomizeLabProvider({ categories, gene, children }: CustomizeLabProviderProps) {
  const [selectedVariants, setSelectedVariants] = useState<VariantType[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(null);
  const [currentCategory, setCurrentCategory] = useState<CategoryType | null>(null);
  const [currentVariant, setCurrentVariant] = useState<VariantType | null>(null);
  const [currentColor, setCurrentColor] = useState<VariantColor | null>(null);

  const allProducts = useMemo(
    () => categories.flatMap((category) => category.products),
    [categories]
  );
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
    const variantToRemove = selectedVariants.find(
      (variant) => variant.product.categoryId === currentCategory.id
    );
    if (currentVariant === null) {
      // deselect
      setSelectedVariants([
        ...selectedVariants
          .filter((variant) => variant.id !== variantToRemove?.id)
          .filter((variant) => variant.product.baseId !== variantToRemove?.productId),
      ]);
    } else {
      // select
      setSelectedVariants([
        ...selectedVariants
          .filter((variant) => variant.id !== variantToRemove?.id)
          .filter((variant) => variant.product.baseId !== variantToRemove?.productId),
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
  const { modifyingCartItem } = useAddToCart(selectedVariants, gene);
  useEffect(() => {
    if (Boolean(modifyingCartItem)) {
      setSelectedVariants(modifyingCartItem.selectedVariants);
    }
  }, [modifyingCartItem]);

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
    categories,
    gene,
    currentCategory,
    currentProduct,
    currentVariant,
    allProducts,
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

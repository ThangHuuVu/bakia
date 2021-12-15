import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { CartItem } from "@/lib/types/cart";
import { useRouter } from "next/router";
import { GeneType, VariantType } from "@/lib/types/custom";
import { useCallback } from "react";

const useAddToCart = (selectedVariants: VariantType[], gene: GeneType) => {
  const router = useRouter();
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const { id } = router.query;
  const modifyingCartItem = Boolean(id) && cart.find((item) => item.id === id);
  const addToCart = useCallback(() => {
    let newItem: CartItem;
    if (Boolean(modifyingCartItem)) {
      newItem = {
        ...modifyingCartItem,
        selectedVariants,
        updatedAt: new Date(),
      };
    } else {
      newItem = {
        id: uuidv4(),
        selectedVariants,
        gene,
        quantity: 1,
        discountCode: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    setCart([...cart.filter((item) => item.id !== newItem.id), newItem]);

    router.push("/checkout");
  }, [cart, modifyingCartItem, setCart, router, gene, selectedVariants]);

  return { modifyingCartItem, addToCart };
};
export default useAddToCart;

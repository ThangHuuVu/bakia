import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { CartItem } from "@/lib/types/cart";
import ItemCard from "./CheckoutItemCard";
import DiscountDialog from "./DiscountDialog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Discount } from "@/lib/types/discount";
import { useRouter } from "next/router";
import Link from "next/link";
import { DiscountCode } from "@prisma/client";

interface CheckoutProps {
  discount: Discount;
}

const useCheckoutItem = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const latestCartItem = cart.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )[0];
  const [checkoutItem, setCheckoutItem] = useState<CartItem>(latestCartItem);

  const saveItem = useCallback(
    (total: number, selected = false) => {
      setCart([
        ...cart.filter((item) => item.id !== checkoutItem.id),
        { ...checkoutItem, total, selected },
      ]);
    },
    [cart, setCart, checkoutItem]
  );
  const updateCheckoutItem = useCallback(
    (item: Partial<CartItem>) => {
      setCheckoutItem({ ...checkoutItem, ...item });
    },
    [checkoutItem]
  );

  useEffect(() => {
    setCheckoutItem(latestCartItem);
  }, [latestCartItem]);

  return [checkoutItem, updateCheckoutItem, saveItem] as const;
};

export type DisplayValue = ReturnType<typeof useDisplayValue>;
const useDisplayValue = (item: CartItem, discountCode: DiscountCode) => {
  const { gene, selectedVariants, quantity, discountCode: itemDiscountCode } = item;
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  const price = useMemo(() => {
    return (
      gene.price +
      selectedVariants.map((variant) => variant.price).reduce((a, b) => a + b, 0) -
      discountAmount
    );
  }, [gene, selectedVariants, discountAmount]);

  const total = useMemo(() => {
    return price * quantity;
  }, [price, quantity]);

  const isDiscountCodeValid = itemDiscountCode?.code === discountCode?.code;

  useEffect(() => {
    setDiscountAmount(
      isDiscountCodeValid
        ? selectedVariants
            // exclude outfit
            .filter((variant) => variant.product.category.id !== 11)
            .map((variant) => variant.price)
            .reduce((a, b) => a + b, 0)
        : 0
    );
  }, [isDiscountCodeValid, selectedVariants]);

  return { price, discountAmount, isDiscountCodeValid, total };
};

const Checkout = ({ discount }: CheckoutProps) => {
  const [isDiscountPopupShow, setDiscountPopupShow] = useState<boolean>(false);
  const [checkoutItem, updateCheckoutItem, saveItem] = useCheckoutItem();
  const displayValue = useDisplayValue(checkoutItem, discount.code);
  const router = useRouter();

  console.log(checkoutItem);
  const onChangeDiscountCode = useCallback(
    (discountCodeString: string) => {
      if (discountCodeString === discount?.code?.code) {
        updateCheckoutItem({
          discountCode: discount.code,
          discountCodeString,
          quantity: 1,
        });
      } else {
        updateCheckoutItem({
          discountCode: null,
          discountCodeString,
        });
      }
    },
    [discount, updateCheckoutItem]
  );
  const onChangeQuantity = useCallback(
    (quantity) => updateCheckoutItem({ quantity }),
    [updateCheckoutItem]
  );

  return (
    <>
      <div className="flex flex-col justify-between h-full md:max-w-content md:w-full md:mt-10 md:max-h-[40.75rem]">
        <Link href="/custom">
          <a className="items-center hidden gap-4 md:flex">
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0909 4.10714H3.09091L5.72727 1.51786C6.09091 1.16071 6.09091 0.625 5.72727 0.267857C5.36364 -0.0892857 4.81818 -0.0892857 4.45455 0.267857L0.272727 4.375C-0.0909091 4.73214 -0.0909091 5.26786 0.272727 5.625L4.45455 9.73214C4.81818 10.0893 5.36364 10.0893 5.72727 9.73214C6.09091 9.375 6.09091 8.83929 5.72727 8.48214L3.09091 5.89286H15.0909C15.5455 5.89286 16 5.53571 16 5C16 4.46429 15.5455 4.10714 15.0909 4.10714Z"
                fill="black"
              />
            </svg>
            Quay lại Customize Lab
          </a>
        </Link>
        {checkoutItem && (
          <ItemCard
            onChangeDiscountCode={onChangeDiscountCode}
            onChangeQuantity={onChangeQuantity}
            item={checkoutItem}
            displayValue={displayValue}
          />
        )}
        <div className="flex flex-col justify-between w-full px-[0.938rem] py-[0.813rem] bg-white md:bg-transparent md:flex-row md:items-center md:justify-end md:gap-4">
          <div className="flex gap-1 mb-2 md:mb-0">
            Bạn còn 01 code giảm giá chưa sử dụng. <br />
            <button className="underline text-darkMint" onClick={() => setDiscountPopupShow(true)}>
              Xem code
            </button>
          </div>
          <div className="flex items-center justify-between w-full md:w-auto md:gap-4">
            <Link href="/cart">
              <a
                className="button-txt w-[10.25rem] h-[3.25rem] rounded-lg border border-solid border-black grid place-content-center cursor-pointer md:button-txt md:h-[2.625rem] md:w-40"
                onClick={(e) => {
                  e.preventDefault();
                  saveItem(displayValue.total);
                  router.push("/cart");
                }}
              >
                <span>xem giỏ hàng</span>
              </a>
            </Link>
            <Link href="/payment">
              <a
                className="button-txt w-[10.25rem] h-[3.25rem] rounded-lg bg-main grid place-content-center  md:button-txt md:h-[2.625rem] md:w-40"
                onClick={(e) => {
                  e.preventDefault();
                  saveItem(displayValue.total, true);
                  router.push("/payment");
                }}
              >
                <span>thanh toán</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <DiscountDialog
        showButton
        discount={discount}
        open={isDiscountPopupShow}
        onButtonClick={() => {
          onChangeDiscountCode(discount.code.code);
          setDiscountPopupShow(false);
        }}
        onClose={() => {
          setDiscountPopupShow(false);
        }}
      />
    </>
  );
};

export default Checkout;

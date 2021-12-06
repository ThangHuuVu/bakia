import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { CartItem } from "@/lib/types/cart";
import ItemCard from "./CheckoutItemCard";
import DiscountDialog from "./DiscountDialog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Discount } from "@/lib/types/discount";
import { useRouter } from "next/router";
import Link from "next/link";

interface CheckoutProps {
  discount: Discount;
}

const Checkout = ({ discount }: CheckoutProps) => {
  const [isDiscountPopupShow, setDiscountPopupShow] = useState<boolean>(false);
  const onOpenDiscountPopup = () => {
    setDiscountPopupShow(true);
  };

  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const latestCartItem = cart.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )[0];
  const [checkoutItem, setCheckoutItem] = useState<CartItem>(latestCartItem);

  useEffect(() => {
    setCheckoutItem(latestCartItem);
  }, [latestCartItem]);

  const saveItem = useCallback(
    (selected = false) => {
      setCart([
        ...cart.filter((item) => item.id !== checkoutItem.id),
        { ...checkoutItem, selected },
      ]);
    },
    [cart, setCart, checkoutItem]
  );

  const router = useRouter();
  const isDiscountValid = useMemo(
    () =>
      Boolean(
        checkoutItem.discountCode && discount.code && checkoutItem.discountCode === discount.code
      ),
    [checkoutItem, discount]
  );

  const onChangeDiscountCode = useCallback(
    (discountCode) => {
      setCheckoutItem({
        ...checkoutItem,
        discountCode,
        quantity: discountCode === discount.code ? 1 : checkoutItem.quantity,
      });
    },
    [checkoutItem, discount]
  );
  const onChangeQuantity = useCallback(
    (quantity) => setCheckoutItem({ ...checkoutItem, quantity }),
    [checkoutItem]
  );
  const onSetTotal = useCallback(
    (total: number) => setCheckoutItem({ ...checkoutItem, total }),
    [checkoutItem]
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
        {latestCartItem && (
          <ItemCard
            onChangeDiscountCode={onChangeDiscountCode}
            onChangeQuantity={onChangeQuantity}
            item={checkoutItem}
            isDiscountValid={isDiscountValid}
            onSetTotal={onSetTotal}
          />
        )}
        <div className="flex flex-col justify-between w-full px-[0.938rem] py-[0.813rem] bg-white md:bg-transparent md:flex-row md:items-center md:justify-end md:gap-4">
          <div className="flex gap-1 mb-2 md:mb-0">
            Bạn còn 01 code giảm giá chưa sử dụng. <br />
            <button className="underline text-darkMint" onClick={onOpenDiscountPopup}>
              Xem code
            </button>
          </div>
          <div className="flex items-center justify-between w-full md:w-auto md:gap-4">
            <Link href="/cart">
              <a
                className="button-txt w-[10.25rem] h-[3.25rem] rounded-lg border border-solid border-black grid place-content-center cursor-pointer md:button-txt md:h-[2.625rem] md:w-40"
                onClick={(e) => {
                  e.preventDefault();
                  saveItem();
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
                  saveItem(true);
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
        content={discount}
        open={isDiscountPopupShow}
        onButtonClick={() => {
          onChangeDiscountCode(discount.code);
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

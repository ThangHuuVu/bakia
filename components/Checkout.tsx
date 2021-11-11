import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { CartItem } from "@/lib/types/cart";
import ItemCard from "./ItemCard";
import DiscountDialog from "./DiscountDialog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Discount } from "@/lib/types/discount";
import { useRouter } from "next/router";

interface CheckoutProps {
  discount: Discount;
}

const Checkout = ({ discount }: CheckoutProps) => {
  const [isDiscountPopupShow, setDiscountPopupShow] = useState<boolean>(false);
  const onOpenDiscountPopup = () => {
    setDiscountPopupShow(true);
  };

  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const latestCartItem = cart.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())[0];
  const [checkoutItem, setCheckoutItem] = useState<CartItem>(latestCartItem);

  useEffect(() => {
    setCheckoutItem(latestCartItem);
  }, [latestCartItem]);

  const saveItem = useCallback(() => {
    setCart([...cart.filter((item) => item.id !== checkoutItem.id), checkoutItem]);
  }, [cart, setCart, checkoutItem]);

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

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        {latestCartItem && (
          <ItemCard
            onChangeDiscountCode={onChangeDiscountCode}
            onChangeQuantity={onChangeQuantity}
            item={checkoutItem}
            isDiscountValid={isDiscountValid}
          />
        )}
        <div className="flex flex-col justify-between w-full px-[0.938rem] py-[0.813rem] bg-white">
          <div className="mb-2">
            Bạn còn 01 code giảm giá chưa sử dụng. <br />
            <button className="underline text-darkMint" onClick={onOpenDiscountPopup}>
              Xem code
            </button>
          </div>
          <div className="flex items-center justify-between w-full">
            <div
              className="mobile-button-txt w-[10.25rem] h-[3.25rem] rounded-lg border border-solid border-black grid place-content-center cursor-pointer"
              onClick={() => {
                saveItem();
                router.push("/cart");
              }}
            >
              <span>xem giỏ hàng</span>
            </div>
            <a
              className="mobile-button-txt w-[10.25rem] h-[3.25rem] rounded-lg bg-main grid place-content-center"
              onClick={() => {
                saveItem();
                router.push("/payment");
              }}
            >
              <span>thanh toán</span>
            </a>
          </div>
        </div>
      </div>
      <DiscountDialog
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

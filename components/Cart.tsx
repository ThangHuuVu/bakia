import { format } from "@/lib/currency";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { CartItem as CartItemType } from "@/lib/types/cart";
import { Discount } from "@/lib/types/discount";
import ItemCard from "./CartItemCard";
import { useEffect, useState } from "react";

interface CartProps {
  discount: Discount;
}

const Cart = ({ discount }: CartProps) => {
  const [cart, setCart] = useLocalStorage<CartItemType[]>("cart", []);

  const isSelectAllInCart = cart.every((item) => item.selected);
  const [allItemSelected, setAllItemSelected] = useState<boolean>(isSelectAllInCart);

  const total = cart
    .filter((item) => item.selected)
    .reduce((res, current) => {
      return res + current.total || 0;
    }, 0);

  const selectedItemCount = cart.filter((item) => item.selected).length;
  const onToggleSelectAllItem = () => {
    setAllItemSelected(!allItemSelected);
  };

  useEffect(() => {
    setCart(cart.map((item) => ({ ...item, selected: allItemSelected })));
  }, [allItemSelected]);

  return (
    <>
      {cart.length && (
        <ul className="pb-10 space-y-6">
          {cart.map((cartItem) => (
            <li key={cartItem.id} className="">
              <ItemCard
                item={cartItem}
                isDiscountValid={discount.code === cartItem.discountCode}
                selected={cartItem.selected}
                onChangeDiscountCode={() => {}}
                onChangeQuantity={() => {}}
                setSelected={(selected) => {
                  setCart([
                    ...cart.filter((item) => item.id !== cartItem.id),
                    { ...cartItem, selected },
                  ]);
                }}
                onRemoveCartItem={(id) => {
                  setCart([...cart.filter((item) => item.id !== id)]);
                }}
              />
            </li>
          ))}
        </ul>
      )}
      <div className="fixed bottom-0 z-20 w-full px-4 py-2 bg-white footer-shadow">
        <p className="text-altGrey">
          {selectedItemCount === 0
            ? "Chọn Bakia mà bạn muốn thanh toán"
            : `Đơn hàng đang chọn:  ${selectedItemCount}`}
        </p>
        <button className="flex items-center gap-2 text-black" onClick={onToggleSelectAllItem}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="inline-block"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="9" stroke="black" strokeWidth="2" />
            {isSelectAllInCart && <circle cx="10" cy="10" r="6" fill="#3EFFA8" />}
          </svg>
          Chọn thanh toán tất cả
        </button>
        <div className="w-full px-4 py-2 ">
          <button
            className={`w-full h-[3.75rem] rounded-lg ${
              selectedItemCount > 0 ? "bg-main text-black" : "bg-grey3 text-altGrey"
            }`}
          >
            <div>Tổng cộng: {format(total, "VND")}</div>
            <div className="heading-3">thanh toán ngay</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;

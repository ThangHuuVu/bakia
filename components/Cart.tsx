import { format } from "@/lib/currency";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { CartItem as CartItemType } from "@/lib/types/cart";
import { Discount } from "@/lib/types/discount";
import ItemCard from "./CartItemCard";

interface CartProps {
  discount: Discount;
}

const Cart = ({ discount }: CartProps) => {
  const [cart, setCart] = useLocalStorage<CartItemType[]>("cart", []);
  const total = cart
    .filter((item) => item.selected)
    .reduce((accum, current) => {
      return accum + current.total || 0;
    }, 0);
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
              />
            </li>
          ))}
        </ul>
      )}
      <div className="fixed bottom-0 z-20 w-full px-4 py-2 bg-white footer-shadow">
        <p className="text-altGrey">Chọn Bakia mà bạn muốn thanh toán</p>
        <button className="flex items-center gap-2 text-black ">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="inline-block"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
          </svg>
          Chọn thanh toán tất cả
        </button>
        <div className="w-full px-4 py-2 ">
          <button className="w-full h-[3.75rem] rounded-lg bg-grey3">
            <div className="text-altGrey">Tổng cộng: {format(total, "VND")}</div>
            <div className="heading-3">thanh toán ngay</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;

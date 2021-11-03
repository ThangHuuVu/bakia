import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { CartItem } from "@/lib/types/cart";
import Link from "next/link";
import ItemCard from "./ItemCard";
import { useCallback } from "react";

const Checkout = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const latestCartItem = cart.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())[0];
  const onOpenDiscountPopup = () => {};
  const onChangeItem = useCallback(
    (newItem: CartItem) => {
      setCart([...cart.filter((item) => item.id !== newItem.id), newItem]);
    },
    [cart, setCart]
  );
  return (
    <div className="flex flex-col justify-between h-full">
      {latestCartItem && <ItemCard item={latestCartItem} onChangeItem={onChangeItem} />}
      <div className="flex flex-col justify-between w-full px-[0.938rem] py-[0.813rem] bg-white">
        <div className="mb-2">
          Bạn còn 01 code giảm giá chưa sử dụng. <br />
          <button className="underline text-darkMint" onClick={onOpenDiscountPopup}>
            Xem code
          </button>
        </div>
        <div className="flex items-center justify-between w-full">
          <Link href="/cart">
            <a className="mobile-button-txt w-[10.25rem] h-[3.25rem] rounded-lg border border-solid border-black grid place-content-center">
              <span>xem giỏ hàng</span>
            </a>
          </Link>
          <Link href="/payment">
            <a className="mobile-button-txt w-[10.25rem] h-[3.25rem] rounded-lg bg-main grid place-content-center">
              <span>thanh toán</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import { useCallback, useEffect, useState } from "react";
import { format } from "@/lib/currency";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { CartItem as CartItemType } from "@/lib/types/cart";
import { Discount } from "@/lib/types/discount";
import ItemCard from "./CartItemCard";
import DeleteCartItemDialog from "./DeleteCartItemDialog";
import DiscountDialog from "./DiscountDialog";
import Link from "next/link";
import { useRouter } from "next/router";

interface CartProps {
  discount: Discount;
}

const useSelectAllItems = (cart: CartItemType[]) => {
  const isSelectAllInCart = cart.every((item) => item.selected);
  const [allItemSelected, setAllItemSelected] = useState<boolean>(isSelectAllInCart);
  const onToggleSelectAllItem = () => {
    setAllItemSelected(!allItemSelected);
  };
  useEffect(() => {
    setAllItemSelected(isSelectAllInCart);
  }, [isSelectAllInCart]);
  return [allItemSelected, onToggleSelectAllItem] as const;
};

const Cart = ({ discount }: CartProps) => {
  const [cart, setCart] = useLocalStorage<CartItemType[]>("cart", []);
  const [allItemSelected, onToggleSelectAllItem] = useSelectAllItems(cart);
  const [deleteDialogItemId, setDeleteDialogItemId] = useState<string>("");
  const [isDiscountPopupShow, setDiscountPopupShow] = useState<boolean>(false);
  const onDeleteDialogConfirmClick = useCallback(() => {
    setCart([...cart.filter((item) => item.id !== deleteDialogItemId)]);
    setDeleteDialogItemId("");
  }, [cart, setCart, deleteDialogItemId]);
  const total = cart
    .filter((item) => item.selected)
    .reduce((res, current) => {
      return res + current.total || 0;
    }, 0);
  const router = useRouter();

  const selectedItemCount = cart.filter((item) => item.selected).length;
  const onGoToPayment = useCallback(() => {
    router.push("/payment");
  }, [router]);

  useEffect(() => {
    setCart(cart.map((item) => ({ ...item, selected: allItemSelected })));
  }, [allItemSelected]);

  return (
    <>
      <div className="h-full md:w-full md:flex md:mt-[8.5rem]">
        <div className="fixed bottom-0 z-20 w-full px-4 py-2 bg-white footer-shadow md:hidden">
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
              {allItemSelected && <circle cx="10" cy="10" r="6" fill="#3EFFA8" />}
            </svg>
            Chọn thanh toán tất cả
          </button>
          <div className="w-full px-4 py-2 ">
            <button
              className={`w-full h-[3.75rem] rounded-lg ${
                selectedItemCount > 0 ? "bg-main text-black" : "bg-grey3 text-altGrey"
              }`}
              onClick={onGoToPayment}
            >
              <div>Tổng cộng: {format(total, "VND")}</div>
              <div className="heading-3">thanh toán ngay</div>
            </button>
          </div>
        </div>
        <div className="hidden md:fixed md:top-[3.188rem] md:max-h-[5.625rem] md:w-full md:h-full md:bg-white md:z-20 md:left-0 md:grid md:place-items-center">
          <div className="flex items-center justify-between w-full h-full max-w-content">
            <div className="flex gap-1 mb-2 md:mb-0">
              Bạn còn 01 code giảm giá chưa sử dụng. <br />
              <button
                className="underline text-darkMint"
                onClick={() => setDiscountPopupShow(true)}
              >
                Xem code
              </button>
            </div>
            <div className="flex gap-[0.625rem] items-center">
              <span className="whitespace-nowrap">Tổng cộng: {format(total, "VND")}</span>
              <button
                className={`w-full min-w-[8.5rem] h-[2.625rem] rounded-lg ${
                  selectedItemCount > 0 ? "bg-main text-black" : "bg-grey3 text-altGrey"
                }`}
                onClick={onGoToPayment}
              >
                <div className="heading-3">thanh toán</div>
              </button>
            </div>
          </div>
        </div>
        {Boolean(cart.length) ? (
          <ul className="pb-10 space-y-6 md:min-w-[49.5rem]">
            {cart.map((cartItem) => (
              <li key={cartItem.id}>
                <ItemCard
                  item={cartItem}
                  isDiscountValid={discount.code?.code === cartItem.discountCode?.code}
                  selected={cartItem.selected}
                  onChangeDiscountCode={(discountCode) =>
                    setCart([
                      ...cart.map<CartItemType>((item) => {
                        if (item.id === cartItem.id) {
                          item.discountCodeString = discountCode;
                          if (discount.code.code === discountCode) {
                            item.quantity = 1;
                            item.discountCode = discount.code;
                          } else {
                            item.discountCode = null;
                          }
                        }
                        return item;
                      }),
                    ])
                  }
                  onChangeQuantity={(quantity) =>
                    setCart([
                      ...cart.map<CartItemType>((item) => {
                        if (item.id === cartItem.id) {
                          item.quantity = quantity;
                        }
                        return item;
                      }),
                    ])
                  }
                  setSelected={(selected) =>
                    setCart([
                      ...cart.map<CartItemType>((item) => {
                        if (item.id === cartItem.id) {
                          item.selected = selected;
                        }
                        return item;
                      }),
                    ])
                  }
                  onRemoveCartItem={(id) => {
                    setDeleteDialogItemId(id);
                  }}
                  onSetTotal={(total) =>
                    setCart([
                      ...cart.map<CartItemType>((item) => {
                        if (item.id === cartItem.id) {
                          item.total = total;
                        }
                        return item;
                      }),
                    ])
                  }
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-full min-h-content md:min-w-[49.5rem] grid place-items-center">
            <p>
              Giỏ hàng trống.{" "}
              <Link href="/custom">
                <a className="underline text-darkMint">Đến trang mua hàng</a>
              </Link>
            </p>
          </div>
        )}
        <div className="hidden md:block w-full px-4 py-6 text-center bg-white max-h-[20.5rem] min-w-[17.875rem]">
          <h3 className="heading-3">thanh toán trước</h3>
          <div className="mt-8 text-left">
            <p>Chọn thanh toán trước</p>
            <dl>
              <div className="flex justify-between">
                <dt className="text-mainGray">Đang chọn:</dt>
                <dt>{selectedItemCount}</dt>
              </div>
              <div className="flex justify-between">
                <dt className="text-mainGray">Tổng số lượng:</dt>
                <dt>{cart.length}</dt>
              </div>
              <div>
                <dt className="text-mainGray">Tổng giá đang chọn:</dt>
                <dt>{format(total, "VND")}</dt>
              </div>
            </dl>
          </div>
          <button
            className={`w-full h-[2.625rem] rounded-lg ${
              selectedItemCount > 0 ? "bg-main text-black" : "bg-grey3 text-altGrey"
            } mt-6`}
            onClick={onGoToPayment}
          >
            <div className="heading-3">thanh toán trước</div>
          </button>
          <button className="w-full h-[2.625rem] rounded-lg bg-transparent text-black border-black border mt-2">
            <div className="heading-3">huỷ</div>
          </button>
        </div>
      </div>
      <DeleteCartItemDialog
        open={Boolean(deleteDialogItemId)}
        onClose={() => setDeleteDialogItemId("")}
        onDeleteClick={onDeleteDialogConfirmClick}
      />
      <DiscountDialog
        discount={discount}
        open={isDiscountPopupShow}
        onClose={() => {
          setDiscountPopupShow(false);
        }}
      />
    </>
  );
};

export default Cart;

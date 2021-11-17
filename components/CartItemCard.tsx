import { format } from "@/lib/currency";
import { CartItem } from "@/lib/types/cart";
import ModelImages from "./ModelImages";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

interface ItemCardProps {
  item: CartItem;
  isDiscountValid: boolean;
  selected: boolean;
  setSelected: (selected: boolean) => void;
  onChangeQuantity: (quantity: number) => void;
  onChangeDiscountCode: (discount: string) => void;
  onRemoveCartItem: (id: string) => void;
  onSetTotal: (total: number) => void;
}
const Card = ({
  item,
  onChangeQuantity,
  onChangeDiscountCode,
  isDiscountValid,
  selected,
  setSelected,
  onRemoveCartItem,
  onSetTotal,
}: ItemCardProps) => {
  const { gene, selectedVariants, quantity, discountCode: itemDiscountCode } = item;
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [disablePlus, setDisablePlus] = useState<boolean>(false);
  const [disableMinus, setDisableMinus] = useState<boolean>(quantity === 1);
  const increaseQuantity = () => {
    onChangeQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) onChangeQuantity(quantity - 1);
  };

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

  useEffect(() => {
    onSetTotal(total);
  }, [total]);

  useEffect(() => {
    setDisablePlus(isDiscountValid);
    setDisableMinus(isDiscountValid || quantity === 1);
    setDiscountAmount(
      isDiscountValid
        ? selectedVariants
            // exclude outfit
            .filter((variant) => variant.product.category.id !== 11)
            .map((variant) => variant.price)
            .reduce((a, b) => a + b, 0)
        : 0
    );
  }, [isDiscountValid, quantity, onChangeQuantity, selectedVariants]);

  return (
    <div className="flex flex-col mx-4 mt-[0.625rem] md:flex-row md:gap-14 md:max-h-[24.75rem] md:h-full md:border-b md:border-b-altGrey md:pb-8">
      <div className="flex flex-col-reverse mb-6 md:hidden">
        <p className="mobile-body-txt">{item.gene.name}</p>
        <p className="text-black heading-3">{item.gene.description}</p>
      </div>
      <div className="flex justify-between w-full mb-5 md:mb-0 md:w-max md:gap-[3.125rem]">
        <div className="md:flex md:flex-col md:gap-8 md:max-w-[16rem] md:flex-none md:items-center md:justify-center">
          <div className="relative w-[7.813rem] h-[12.5rem]">
            <ModelImages width={125} height={200} gene={gene} displayVariants={selectedVariants} />
          </div>
          <div className="flex-col-reverse hidden mb-6 md:flex md:mb-0">
            <p className="mobile-body-txt">{item.gene.name}</p>
            <p className="text-black heading-3">{item.gene.description}</p>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-[12.75rem] max-h-[12.5rem] relative md:max-w-full md:w-[21.875rem] md:flex-none md:max-h-full">
          <div className="flex justify-between mb-4 md:mb-2">
            <Link href={`/custom/?id=${item.id}`}>
              <a className="flex items-center gap-1 text-darkMint">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 11.247V13.6112C0 13.8289 0.171087 14 0.388835 14H2.75295C2.85405 14 2.95515 13.9611 3.02514 13.8834L11.5173 5.39897L8.60103 2.48271L0.116651 10.9671C0.0388836 11.0449 0 11.1382 0 11.247ZM13.7725 3.14373C14.0758 2.84044 14.0758 2.35051 13.7725 2.04722L11.9528 0.227468C11.6495 -0.0758228 11.1596 -0.0758228 10.8563 0.227468L9.43314 1.6506L12.3494 4.56687L13.7725 3.14373Z"
                    fill="currentColor"
                  />
                </svg>
                Thay đổi
              </a>
            </Link>
            <h3 className="heading-3">chi tiết</h3>
          </div>
          <dl className="w-full flex flex-col gap-[0.875rem] bg-white px-5 py-3 overflow-y-auto rounded md:max-h-[12.25rem] md:flex-none md:mb-[1.375rem]">
            <div className="flex flex-col">
              <dt className="text-altGrey">Bakia model</dt>
              <dt>{gene.name}</dt>
              <dd>{format(gene.price, gene.currency.abbreviationSign)}</dd>
            </div>
            {selectedVariants.map((variant) => (
              <div key={variant.id} className="flex flex-col">
                <dt className="text-altGrey">{variant.product.category.name}</dt>
                <dt>{variant.name}</dt>
                <dd>{format(variant.price, gene.currency.abbreviationSign)}</dd>
              </div>
            ))}
          </dl>
          <div className="absolute bottom-0 w-full h-10 rounded-b faded-bg md:hidden" />
          <div className="flex-wrap hidden md:flex md:justify-around md:gap-5">
            <div className="flex justify-between w-full px-6">
              <div>
                <div className="text-altGrey">Đơn giá</div>
                <div className="">{format(price, gene.currency.abbreviationSign)}</div>
              </div>
              <div className="md:w-max">
                <div className="text-altGrey">Số lượng</div>
                <div className="flex items-center justify-between gap-5">
                  <button
                    disabled={disableMinus}
                    className="text-black disabled:text-altGrey disabled:cursor-not-allowed"
                    onClick={decreaseQuantity}
                  >
                    <svg
                      width="16"
                      height="4"
                      viewBox="0 0 16 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0H16V4H0V0Z" fill="currentColor" />
                    </svg>
                  </button>
                  {quantity}
                  <button
                    disabled={disablePlus}
                    onClick={increaseQuantity}
                    className="text-black disabled:text-altGrey disabled:cursor-not-allowed"
                  >
                    <svg
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.22293 9.98472H0V7.01529H7.22293V0H10.7771V7.01529H18V9.98472H10.7771V17H7.22293V9.98472Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="max-w-[11.625rem] w-full grid place-content-center flex-none">
                <input
                  className="w-full h-[2.625rem] pl-5"
                  placeholder="Nhập code ưu đãi"
                  onChange={(e) => onChangeDiscountCode(e.target.value)}
                  value={itemDiscountCode}
                />
              </div>
              <div className="mr-10 min-w-[4rem]">
                <div className="text-altGrey">Giảm</div>
                <div className="">{format(discountAmount, gene.currency.abbreviationSign)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between md:gap-5 md:min-w-[7.375rem]">
        <h3 className="hidden text-right md:block heading-3">định giá</h3>
        <div className="flex flex-wrap gap-[1.625rem] justify-between md:flex-nowrap md:flex-col w-full h-full md:justify-between md:border-t md:border-b md:border-altGrey py-4 md:gap-0 md:hidden">
          <div className="flex-none md:hidden">
            <div className="text-altGrey">Đơn giá</div>
            <div className="">{format(price, gene.currency.abbreviationSign)}</div>
          </div>
          <div className="max-w-[12.75rem] w-full grid place-content-center flex-none  md:hidden">
            <input
              className="w-full h-[2.625rem] pl-5"
              placeholder="Nhập code ưu đãi"
              onChange={(e) => onChangeDiscountCode(e.target.value)}
              value={itemDiscountCode}
            />
          </div>
          <div className="md:w-max md:hidden">
            <div className="text-altGrey">Số lượng</div>
            <div className="flex items-center justify-between gap-5">
              <button
                disabled={disableMinus}
                className="text-black disabled:text-altGrey disabled:cursor-not-allowed"
                onClick={decreaseQuantity}
              >
                <svg
                  width="16"
                  height="4"
                  viewBox="0 0 16 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0H16V4H0V0Z" fill="currentColor" />
                </svg>
              </button>
              {quantity}
              <button
                disabled={disablePlus}
                onClick={increaseQuantity}
                className="text-black disabled:text-altGrey disabled:cursor-not-allowed"
              >
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.22293 9.98472H0V7.01529H7.22293V0H10.7771V7.01529H18V9.98472H10.7771V17H7.22293V9.98472Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="max-w-[12.75rem] w-full  md:hidden">
            <div className="text-altGrey">Giảm</div>
            <div className="">{format(discountAmount, gene.currency.abbreviationSign)}</div>
          </div>
        </div>
        <div className="flex items-end justify-between pt-6 pb-4 text-left border-b border-altGrey md:flex-col md:border-none md:h-full md:justify-between">
          <div className="md:text-right">
            <div className="heading-3 md:text-mainGray md:body-txt md:not-italic md:font-normal md:uppercase">
              Tổng
            </div>
            <div className="font-bold mobile-body-txt text-darkMint md:text-black md:font-normal">
              {format(total, gene.currency.abbreviationSign)}
            </div>
          </div>
          <div className="flex gap-5 md:flex-col-reverse md:gap-3">
            <button
              className="flex items-center gap-3 text-mainGray"
              onClick={() => onRemoveCartItem(item.id)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="inline-block"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6364 0.363636C15.1515 -0.121212 14.4242 -0.121212 13.9394 0.363636L8 6.30303L2.06061 0.363636C1.57576 -0.121212 0.848485 -0.121212 0.363636 0.363636C-0.121212 0.848485 -0.121212 1.57576 0.363636 2.06061L6.30303 8L0.363636 13.9394C-0.121212 14.4242 -0.121212 15.1515 0.363636 15.6364C0.848485 16.1212 1.57576 16.1212 2.06061 15.6364L8 9.69697L13.9394 15.6364C14.4242 16.1212 15.1515 16.1212 15.6364 15.6364C16.1212 15.1515 16.1212 14.4242 15.6364 13.9394L9.69697 8L15.6364 2.06061C16.1212 1.57576 16.1212 0.848485 15.6364 0.363636Z"
                  fill="currentColor"
                />
              </svg>
              Xoá
            </button>
            <button
              className="flex items-center gap-2 text-darkMint"
              onClick={() => setSelected(!selected)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="inline-block"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill={selected ? "currentColor" : "none"}
                />
              </svg>
              Chọn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

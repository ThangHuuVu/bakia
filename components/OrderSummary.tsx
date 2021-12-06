import ModelImages from "./ModelImages";
import { format } from "@/lib/currency";
import { useState } from "react";
import { CartItem } from "@/lib/types/cart";
import {
  PaymentInfo,
  PaymentMethodDetail,
  ShippingDetail,
  ShippingInfo,
} from "@/lib/types/payment";
import { add, format as formatDate } from "date-fns";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  orderId?: string;
}
const OrderSummary = ({ items, total, shippingInfo, paymentInfo, orderId }: OrderSummaryProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentItem = items[currentIdx];
  const goNext = () => {
    if (currentIdx < items.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };
  const goPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <div
      className={`w-full bg-white relative px-5 py-3 flex justify-between flex-col h-auto border-none md:max-w-[21.875rem] md:max-h-[49.375rem] md:justify-start md:overflow-auto`}
      style={{
        transition: "max-height 200ms ease-in-out",
      }}
    >
      <div>Tổng số Bakia của bạn: {items.length}</div>
      {orderId && (
        <div>
          Order ID: <span className="heading-3-black">{orderId}</span>
        </div>
      )}
      <div className={`flex flex-col items-center mt-[0.375rem] gap-2`}>
        <div>
          <span className="heading-3-black">{currentIdx + 1}</span> /{" "}
          <span className="body-txt">{items.length}</span>
        </div>
        <div className="flex flex-col-reverse w-full">
          <p className="body-txt">{currentItem.gene.name}</p>
          <p className="text-black heading-3">{currentItem.gene.description}</p>
        </div>
        <div className="flex items-center justify-between w-full px-10">
          <button
            onClick={goPrev}
            disabled={currentIdx === 0}
            className="text-black disabled:text-altGrey disabled:cursor-not-allowed"
          >
            <svg
              width="16"
              height="26"
              viewBox="0 0 16 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.3132 1.68629L2.99954 13L14.3132 24.3137"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className={`w-40 h-64`}>
            <div className="relative flex flex-col w-full h-full">
              <ModelImages
                gene={currentItem.gene}
                width={160}
                height={256}
                displayVariants={currentItem.selectedVariants}
              />
            </div>
          </div>
          <button
            onClick={goNext}
            disabled={currentIdx === items.length - 1}
            className="text-black disabled:text-altGrey disabled:cursor-not-allowed"
          >
            <svg
              width="16"
              height="26"
              viewBox="0 0 16 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.31371 24.3137L13.6274 13L2.31371 1.68629"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between w-full">
          <div>Số lượng: {currentItem.quantity}</div>
          <div>{format(currentItem.total, "VND")}</div>
        </div>
        <div className="flex items-center justify-end gap-[0.625rem] w-full pb-[0.875rem] px-[0.875rem] border-b-0.5 border-altGrey mt-5">
          <div className="heading-3-black">Thông tin</div>
        </div>
        <dl className="mt-[0.875rem] w-full pl-[0.625rem]">
          {shippingInfo && (
            <>
              <div>
                <dt className="inline text-altGrey">Người nhận: </dt>
                <dd className="inline">{shippingInfo.fullName}</dd>
              </div>
              <div>
                <dt className="inline text-altGrey">Địa chỉ: </dt>
                <dd className="inline">{shippingInfo.address}</dd>
              </div>
              <div>
                <dt className="inline text-altGrey">Giá ship: </dt>
                <dd className="inline">
                  {format(ShippingDetail[shippingInfo.shippingMethod].price, "VND")}
                </dd>
              </div>
              <div>
                <dt className="inline text-altGrey">Thời gian nhận hàng dự kiến: </dt>
                <dd className="inline">
                  {formatDate(
                    add(new Date(), { days: ShippingDetail[shippingInfo.shippingMethod].days }),
                    "MM/dd/yyyy"
                  )}
                </dd>
              </div>
              <div>
                <dt className="inline text-altGrey">Số tiền pre-order: </dt>
                <dd className="inline font-bold text-darkMint">{format(total, "VND")}</dd>
              </div>
            </>
          )}
          {paymentInfo && (
            <div>
              <dt className="inline text-altGrey">Hình thức thanh toán: </dt>
              <dd className="inline">{PaymentMethodDetail[paymentInfo.paymentSource.type]}</dd>
            </div>
          )}
          <div>
            <dt className="inline text-altGrey">Trạng thái: </dt>
            <dd className="inline">Đang xác nhận</dd>
          </div>
        </dl>
        <div
          className={`flex items-center justify-end gap-[0.625rem] w-full pb-[0.875rem] px-[0.875rem] border-b-0.5 border-altGrey mt-5 mb-4`}
        >
          <div className="heading-3-black">chi tiết</div>
        </div>
        <dl className="w-full flex flex-col gap-[0.875rem] bg-white px-[0.625rem] py-[0.875rem] overflow-y-auto rounded h-full mb-4">
          <div>
            <dt className="text-altGrey">Bakia model</dt>
            <div className="flex justify-between">
              <dt>{currentItem.gene.name}</dt>
              <dd>{format(currentItem.gene.price, currentItem.gene.currency.abbreviationSign)}</dd>
            </div>
          </div>
          {currentItem.selectedVariants.map((variant) => (
            <div key={variant.id}>
              <dt className="text-altGrey">{variant.product.category.name}</dt>
              <div className="flex justify-between">
                <dt>{variant.name}</dt>
                <dd>{format(variant.price, currentItem.gene.currency.abbreviationSign)}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default OrderSummary;

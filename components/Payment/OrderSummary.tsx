import ToggleButton from "../ToggleButton";
import ModelImages from "../ModelImages";
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
}
const OrderSummary = ({ items, total, shippingInfo, paymentInfo }: OrderSummaryProps) => {
  const [isSummaryOpen, setSummaryOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [isDetailOpen, setDetailOpen] = useState(false);
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
  const isHighlight = !isSummaryOpen && Boolean(shippingInfo || paymentInfo);

  return (
    <div
      className={`w-full bg-white relative px-5 py-3 flex justify-between flex-col ${
        isHighlight ? "outline-main" : "outline-none"
      } ${isSummaryOpen ? "h-auto border-none" : "h-[6.5rem]"} `}
      style={{
        transition: "max-height 200ms ease-in-out",
      }}
    >
      <div>Tổng số Bakia của bạn: {items.length}</div>
      <div
        className={`flex flex-col items-center ${
          isSummaryOpen ? "block" : "hidden"
        } mt-[0.375rem] gap-2`}
      >
        <div>
          <span className="mobile-heading-3">{currentIdx + 1}</span> /{" "}
          <span className="mobile-body-txt">{items.length}</span>
        </div>
        <div className="flex flex-col-reverse w-full">
          <p className="mobile-body-txt">{currentItem.gene.name}</p>
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
        <button
          onClick={() => setInfoOpen(!isInfoOpen)}
          className="flex items-center justify-end gap-[0.625rem] w-full pb-[0.875rem] px-[0.875rem] border-b-0.5 border-altGrey mt-5"
        >
          <div className="heading-3-black">Thông tin</div>
          <svg
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transform transition-transform ${isInfoOpen ? "rotate-180" : ""}`}
          >
            <path
              d="M9.24264 4.24264L5 8.48528L0.757359 4.24264"
              stroke="black"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {isInfoOpen && (
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
        )}
        <button
          onClick={() => setDetailOpen(!isDetailOpen)}
          className={`flex items-center justify-end gap-[0.625rem] w-full pb-[0.875rem] px-[0.875rem] border-b-0.5 border-altGrey mt-5 ${
            isDetailOpen ? "" : "mb-4"
          }`}
        >
          <div className="heading-3-black">chi tiết</div>
          <svg
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transform transition-transform ${isDetailOpen ? "rotate-180" : ""}`}
          >
            <path
              d="M9.24264 4.24264L5 8.48528L0.757359 4.24264"
              stroke="black"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {isDetailOpen && (
          <dl className="w-full flex flex-col gap-[0.875rem] bg-white px-[0.625rem] py-[0.875rem] overflow-y-auto rounded h-full mb-4">
            <div>
              <dt className="text-altGrey">Bakia model</dt>
              <div className="flex justify-between">
                <dt>{currentItem.gene.name}</dt>
                <dd>
                  {format(currentItem.gene.price, currentItem.gene.currency.abbreviationSign)}
                </dd>
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
        )}
      </div>
      <ToggleButton isOpen={isSummaryOpen} onToggle={() => setSummaryOpen(!isSummaryOpen)} />
    </div>
  );
};

export default OrderSummary;

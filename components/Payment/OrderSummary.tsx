import ToggleButton from "../ToggleButton";
import ModelImages from "../ModelImages";
import { format } from "@/lib/currency";
import { useState } from "react";
import { CartItem } from "@/lib/types/cart";

interface OrderSummaryProps {
  items: CartItem[];
  isHighlight: boolean;
}
const OrderSummary = ({ items, isHighlight }: OrderSummaryProps) => {
  const [isSummaryOpen, setSummaryOpen] = useState(false);
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
      </div>
      <ToggleButton isOpen={isSummaryOpen} onToggle={() => setSummaryOpen(!isSummaryOpen)} />
    </div>
  );
};

export default OrderSummary;

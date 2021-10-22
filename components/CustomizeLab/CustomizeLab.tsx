import Image from "next/image";
import { format } from "@/lib/currency";
import { useCustomizeLab } from "./context";
import { SelectPanel } from "./SelectPanel";
import { CustomizeLabProps } from ".";
import { useEffect, useMemo, useRef, useState } from "react";

export const CustomizeLab = ({ categories, gene }: CustomizeLabProps) => {
  const { selectedVariants, currentVariant } = useCustomizeLab();
  const totalVariantPrice = useMemo(
    () => selectedVariants.map((variant) => variant.price).reduce((a, b) => a + b, 0),
    [selectedVariants]
  );
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [isOverviewOpen, setOverviewOpen] = useState<boolean>(false);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const [showMoreVisible, setShowMoreVisible] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onTogglePanel = () => {
    setOverviewOpen(false);
    setIsPanelOpen(!isPanelOpen);
  };
  const onToggleOverview = () => {
    setIsPanelOpen(false);
    setIsShowMore(false);
    setOverviewOpen(!isOverviewOpen);
  };

  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      if (containerRef.current.offsetHeight < contentRef.current.scrollHeight) {
        setShowMoreVisible(true);
      }
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <div className="absolute flex items-center justify-center w-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 px-auto">
        {gene && (
          <Image
            src="/static/assets/bakia_model.png"
            width={348}
            height={545}
            alt={gene.description}
          />
        )}
        {Boolean(selectedVariants?.length) &&
          selectedVariants.map((variant) => (
            <div
              key={variant.id}
              className="absolute"
              style={{ zIndex: variant.product.category.layer || 0 }}
            >
              <Image src={variant.image} width={348} height={545} alt={variant.name} />
            </div>
          ))}
        {currentVariant && (
          <div className="absolute" style={{ zIndex: currentVariant.product.category.layer || 0 }}>
            <Image src={currentVariant.image} width={348} height={545} alt={currentVariant.name} />
          </div>
        )}
      </div>
      <div
        className={`flex flex-col overflow-y-hidden w-full p-2 ${
          isShowMore ? "max-h-[200vh] h-auto" : "max-h-full min-h-full"
        }`}
        style={{
          transition: "max-height 200ms ease-in-out",
        }}
      >
        <div
          className={`flex w-full h-[3.25rem] items-center justify-between z-30 pt-1 px-2 flex-none ${
            isOverviewOpen ? "bg-white rounded-t-sm" : "bg-transparent"
          }`}
        >
          <div
            className={`flex items-center w-1/2 gap-2 h-full cursor-pointer ${
              isOverviewOpen ? "text-main" : "text-mainGray"
            }`}
            onClick={onToggleOverview}
          >
            <svg
              width="29"
              height="30"
              viewBox="0 0 29 30"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.75 0.75C6.884 0.75 0.5 7.134 0.5 15C0.5 22.866 6.884 29.25 14.75 29.25C22.616 29.25 29 22.866 29 15C29 7.134 22.616 0.75 14.75 0.75ZM16.175 22.125H13.325V13.575H16.175V22.125ZM16.175 10.725H13.325V7.875H16.175V10.725Z"
                fill="currentColor"
              />
            </svg>
            <div className="flex flex-col ">
              {gene && (
                <p
                  className={`text-base leading-5 relative tracking-[-0.3px] ${
                    totalVariantPrice > 0 && !isOverviewOpen
                      ? "text-darkMint after:absolute after:w-2 after:h-2 after:rounded-full after:bg-main after:right-5"
                      : "text-black"
                  }`}
                >{`${format(gene.price + totalVariantPrice, gene.currency.abbreviationSign)}`}</p>
              )}
              <p className="text-s3 text-mainGray">
                {!isOverviewOpen ? "Nhấn xem thông tin" : "Nhấn để tắt"}
              </p>
            </div>
          </div>
          <button className="flex items-center justify-center w-1/2 h-full text-lg italic font-bold uppercase rounded-lg bg-main">
            {isOverviewOpen ? "xác nhận" : "hoàn thành"}
          </button>
        </div>
        <div
          ref={containerRef}
          className={`flex flex-col items-center justify-between flex-grow w-full h-full mb-4 pt-6 prose transform  ${
            isOverviewOpen ? "bg-white opacity-100 z-30" : "bg-transparent opacity-0"
          } px-[0.625rem] overflow-y-hidden transition-opacity  gap-[0.875rem]`}
        >
          <div ref={contentRef} className="flex flex-col items-center gap-4 overflow-y-hidden">
            <h2 className="flex-none">bakia của bạn</h2>
            <div className="flex-none w-full h-8 px-4 mt-4 text-right border-b">
              <h3>chi tiết</h3>
            </div>
            <dl className="w-full flex flex-col gap-[0.875rem]">
              <div className="flex items-center justify-between text-black">
                <dt>{gene.name}</dt>
                <dd>{format(gene.price, gene.currency.abbreviationSign)}</dd>
              </div>
              {selectedVariants.map((variant) => (
                <div key={variant.id} className="flex flex-col justify-between">
                  <dt className="text-altGrey">{variant.product.category.name}</dt>
                  <div className="flex items-center justify-between text-black">
                    <dt>{variant.name}</dt>
                    <dd>{format(variant.price, gene.currency.abbreviationSign)}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="w-full h-8 px-4 mt-4 text-right border-b">
              <h3>lưu ý</h3>
            </div>
            <p>
              Các Bakia được customize sẽ có thời gian ra đời lâu hơn do được sản xuất hoàn toàn
              dành riêng cho bạn. Bakia sau khi customize không thể được đổi trả. Trường hợp Bakia
              bị lỗi vui lòng liên hệ chúng tôi để được giải quyết.
            </p>
          </div>
          {showMoreVisible && (
            <div
              className="bottom-0 flex items-center justify-center w-full pb-2 text-center bg-white cursor-pointer text-darkMint gap-[0.375rem]"
              onClick={() => setIsShowMore(!isShowMore)}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={isShowMore ? "" : "transform transition-transform rotate-180"}
              >
                <path
                  d="M8.98532 4.99991L4.74268 0.757272L0.500035 4.99991"
                  stroke="currentColor"
                  strokeLinecap="round"
                />
              </svg>
              <p className="">{isShowMore ? "Ẩn bớt thông tin" : "Xem đầy đủ thông tin"}</p>
            </div>
          )}
        </div>
        <SelectPanel categories={categories} isOpen={isPanelOpen} onTogglePanel={onTogglePanel} />
      </div>
    </div>
  );
};

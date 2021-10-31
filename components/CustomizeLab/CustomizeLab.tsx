import { format } from "@/lib/currency";
import { useCustomizeLab } from "./context";
import { SelectPanel } from "./SelectPanel";
import DisplayModel from "./DisplayModel";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import download from "@/lib/download";
import useAddToCart from "./useAddToCart";

export const CustomizeLab = () => {
  const { selectedVariants, currentVariant, gene } = useCustomizeLab();
  const totalVariantPrice = useMemo(
    () => selectedVariants.map((variant) => variant.price).reduce((a, b) => a + b, 0),
    [selectedVariants]
  );
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState<boolean>(false);
  const [isOverviewOpen, setOverviewOpen] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isMobileMoreShowing, setIsMobileMoreShowing] = useState<boolean>(false);
  const [mobileMoreVisible, setMobileMoreVisible] = useState<boolean>(false);
  const { addToCart } = useAddToCart(selectedVariants, gene);

  const containerRef = useRef<HTMLDivElement>(null);

  const onTogglePanel = () => {
    setOverviewOpen(false);
    setIsMobilePanelOpen(!isMobilePanelOpen);
  };

  const onToggleOverview = useCallback(() => {
    setIsMobilePanelOpen(false);
    setIsMobileMoreShowing(false);
    setIsConfirmed(false);
    setOverviewOpen(!isOverviewOpen);
  }, [isOverviewOpen]);

  const onButtonClick = useCallback(() => {
    if (isOverviewOpen) {
      if (isConfirmed) {
        addToCart();
      } else {
        setIsConfirmed(true);
      }
    } else {
      onToggleOverview();
    }
  }, [isOverviewOpen, isConfirmed, onToggleOverview, addToCart]);

  const btnTitle = isOverviewOpen ? (isConfirmed ? "đặt hàng" : "xác nhận") : "hoàn thành";

  const isHighlight = totalVariantPrice > 0 && !isOverviewOpen;

  useEffect(() => {
    if (containerRef.current) {
      setMobileMoreVisible(containerRef.current.offsetHeight < containerRef.current.scrollHeight);
    }
  }, [selectedVariants, isOverviewOpen]);

  const onDownloadClick = useCallback(async () => {
    const variantIds = selectedVariants
      .sort((a, b) => a.product.category.layer - b.product.category.layer)
      .map((variant) => `variant_${variant.id.toString()}`);
    await download(variantIds);
  }, [selectedVariants]);

  return (
    <div className="relative w-full h-full md:grid md:place-content-center">
      <div className="absolute flex items-center justify-center w-full transform -translate-x-1/2 -translate-y-1/2 md:hidden top-1/2 left-1/2 px-auto">
        <DisplayModel
          selectedVariants={selectedVariants}
          gene={gene}
          width={348}
          height={545}
          currentVariant={currentVariant}
          attachId
        />
      </div>
      <div
        className={`flex flex-col w-full p-2 ${
          isMobileMoreShowing
            ? "max-h-[200vh] h-auto overflow-y-auto"
            : "max-h-full min-h-full overflow-y-hidden"
        } md:hidden`}
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
            <div className="flex flex-col">
              {gene && (
                <p
                  className={`text-base leading-5 relative tracking-[-0.3px] ${
                    isHighlight
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
          <button
            className="flex items-center justify-center w-1/2 h-full text-lg italic font-bold uppercase rounded-lg bg-main"
            onClick={onButtonClick}
          >
            {btnTitle}
          </button>
        </div>
        <div
          className={`flex flex-col items-center justify-between flex-grow w-full h-full mb-4 pt-6 prose transform ${
            isOverviewOpen ? "bg-white opacity-100 z-30" : "bg-transparent opacity-0"
          } px-[0.625rem] overflow-y-auto transition-opacity gap-[0.875rem]`}
        >
          <div className="flex flex-col items-center gap-4 overflow-y-auto">
            {isConfirmed ? (
              <div className="flex flex-col items-center w-full gap-6">
                <div className="flex items-center justify-between w-full">
                  <div className="text-black">
                    <p style={{ fontWeight: "bold" }}>{gene.name}</p>
                    <p>{gene.description}</p>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <button
                      title="Share"
                      className="w-[2.375rem] h-[2.375rem] grid place-content-center"
                    >
                      <svg
                        width="20"
                        height="22"
                        viewBox="0 0 20 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.6667 15.5502C15.8222 15.5502 15.0667 15.8815 14.4889 16.4006L6.56667 11.8173C6.62222 11.5633 6.66667 11.3092 6.66667 11.0442C6.66667 10.7791 6.62222 10.5251 6.56667 10.2711L14.4 5.73193C15 6.28414 15.7889 6.62651 16.6667 6.62651C18.5111 6.62651 20 5.14659 20 3.31325C20 1.47992 18.5111 0 16.6667 0C14.8222 0 13.3333 1.47992 13.3333 3.31325C13.3333 3.57831 13.3778 3.83233 13.4333 4.08635L5.6 8.6255C5 8.07329 4.21111 7.73092 3.33333 7.73092C1.48889 7.73092 0 9.21084 0 11.0442C0 12.8775 1.48889 14.3574 3.33333 14.3574C4.21111 14.3574 5 14.0151 5.6 13.4629L13.5111 18.0572C13.4556 18.2892 13.4222 18.5321 13.4222 18.7751C13.4222 20.5532 14.8778 22 16.6667 22C18.4556 22 19.9111 20.5532 19.9111 18.7751C19.9111 16.997 18.4556 15.5502 16.6667 15.5502Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                    <button
                      title="Download"
                      className="w-[2.375rem] h-[2.375rem] grid place-content-center"
                      onClick={onDownloadClick}
                    >
                      <svg
                        width="20"
                        height="22"
                        viewBox="0 0 20 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.88393 1.11677L8.88393 12.0609L5.64732 8.82237C5.20089 8.37566 4.53125 8.37566 4.08482 8.82237C3.63839 9.26907 3.63839 9.93912 4.08482 10.3858L9.21875 15.5229C9.66518 15.9696 10.3348 15.9696 10.7812 15.5229L15.9152 10.3858C16.3616 9.93912 16.3616 9.26907 15.9152 8.82236C15.4687 8.37566 14.7991 8.37566 14.3527 8.82236L11.1161 12.0609L11.1161 1.11677C11.1161 0.558391 10.6696 1.49615e-05 10 1.49903e-05C9.33036 1.50191e-05 8.88393 0.558391 8.88393 1.11677Z"
                          fill="black"
                        />
                        <rect y="19.5432" width="20" height="2.45686" rx="1.22843" fill="black" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid place-content-center px-auto pb-[0.625rem] w-[11.75rem] h-[18.75rem] ">
                  <DisplayModel
                    selectedVariants={selectedVariants}
                    gene={gene}
                    width={188}
                    height={300}
                  />
                </div>
              </div>
            ) : (
              <div
                ref={containerRef}
                className="flex flex-col items-center w-full gap-4 overflow-y-hidden"
              >
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
              </div>
            )}
            <div className="w-full h-8 px-4 mt-4 text-right border-b">
              <h3>lưu ý</h3>
            </div>
            <p>
              Các Bakia được customize sẽ có thời gian ra đời lâu hơn do được sản xuất hoàn toàn
              dành riêng cho bạn. Bakia sau khi customize không thể được đổi trả. Trường hợp Bakia
              bị lỗi vui lòng liên hệ chúng tôi để được giải quyết.
            </p>
          </div>
          {mobileMoreVisible && (
            <div
              className="bottom-0 flex items-center justify-center w-full pb-2 text-center bg-white cursor-pointer text-darkMint gap-[0.375rem]"
              onClick={() => setIsMobileMoreShowing(!isMobileMoreShowing)}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={isMobileMoreShowing ? "" : "transform transition-transform rotate-180"}
              >
                <path
                  d="M8.98532 4.99991L4.74268 0.757272L0.500035 4.99991"
                  stroke="currentColor"
                  strokeLinecap="round"
                />
              </svg>
              <p className="">
                {isMobileMoreShowing ? "Ẩn bớt thông tin" : "Xem đầy đủ thông tin"}
              </p>
            </div>
          )}
        </div>
        <SelectPanel isOpen={isMobilePanelOpen} onTogglePanel={onTogglePanel} />
      </div>
      {/* Md screen */}
      <div className="hidden md:flex md:gap-[10.875rem]">
        <div className=" relative w-[30rem] h-[47.125rem]">
          <DisplayModel
            selectedVariants={selectedVariants}
            gene={gene}
            width={480}
            height={754}
            currentVariant={currentVariant}
            attachId
          />
        </div>
        <div className="h-full w-[21.75rem] flex flex-col prose items-center relative">
          <SelectPanel />
          <div
            className={`absolute bottom-0 flex flex-col justify-between w-full z-30 bg-white ${
              isOverviewOpen ? "h-full max-h-full" : "max-h-20 h-20"
            } ${isHighlight ? "outline-main" : "outline-none"}`}
            style={{
              transition: "max-height 200ms ease-in-out",
            }}
          >
            <button
              className={`absolute transform -translate-x-1/2 left-1/2 w-[3.75rem] h-[3.75rem] flex items-center justify-center rounded-full bg-white -top-5 ${
                isHighlight ? "border-2 border-transparent border-solid half-circle" : ""
              }`}
              onClick={onToggleOverview}
            >
              <svg
                width="24"
                height="14"
                viewBox="0 0 24 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform ${isOverviewOpen ? "" : "rotate-180"}`}
              >
                <path
                  d="M0.68629 1.31371L12 12.6274L23.3137 1.31371"
                  stroke="black"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {isOverviewOpen && (
              <div className="flex flex-col items-center gap-4 px-4 mt-10 overflow-y-hidden">
                {isConfirmed ? (
                  <div className="flex flex-col items-center w-full gap-6">
                    <div className="flex items-center justify-between w-full">
                      <div className="text-black">
                        <p style={{ fontWeight: "bold" }}>{gene.name}</p>
                        <p>{gene.description}</p>
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <button
                          title="Share"
                          className="w-[2.375rem] h-[2.375rem] grid place-content-center"
                        >
                          <svg
                            width="20"
                            height="22"
                            viewBox="0 0 20 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.6667 15.5502C15.8222 15.5502 15.0667 15.8815 14.4889 16.4006L6.56667 11.8173C6.62222 11.5633 6.66667 11.3092 6.66667 11.0442C6.66667 10.7791 6.62222 10.5251 6.56667 10.2711L14.4 5.73193C15 6.28414 15.7889 6.62651 16.6667 6.62651C18.5111 6.62651 20 5.14659 20 3.31325C20 1.47992 18.5111 0 16.6667 0C14.8222 0 13.3333 1.47992 13.3333 3.31325C13.3333 3.57831 13.3778 3.83233 13.4333 4.08635L5.6 8.6255C5 8.07329 4.21111 7.73092 3.33333 7.73092C1.48889 7.73092 0 9.21084 0 11.0442C0 12.8775 1.48889 14.3574 3.33333 14.3574C4.21111 14.3574 5 14.0151 5.6 13.4629L13.5111 18.0572C13.4556 18.2892 13.4222 18.5321 13.4222 18.7751C13.4222 20.5532 14.8778 22 16.6667 22C18.4556 22 19.9111 20.5532 19.9111 18.7751C19.9111 16.997 18.4556 15.5502 16.6667 15.5502Z"
                              fill="black"
                            />
                          </svg>
                        </button>
                        <button
                          title="Download"
                          className="w-[2.375rem] h-[2.375rem] grid place-content-center"
                          onClick={onDownloadClick}
                        >
                          <svg
                            width="20"
                            height="22"
                            viewBox="0 0 20 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.88393 1.11677L8.88393 12.0609L5.64732 8.82237C5.20089 8.37566 4.53125 8.37566 4.08482 8.82237C3.63839 9.26907 3.63839 9.93912 4.08482 10.3858L9.21875 15.5229C9.66518 15.9696 10.3348 15.9696 10.7812 15.5229L15.9152 10.3858C16.3616 9.93912 16.3616 9.26907 15.9152 8.82236C15.4687 8.37566 14.7991 8.37566 14.3527 8.82236L11.1161 12.0609L11.1161 1.11677C11.1161 0.558391 10.6696 1.49615e-05 10 1.49903e-05C9.33036 1.50191e-05 8.88393 0.558391 8.88393 1.11677Z"
                              fill="black"
                            />
                            <rect
                              y="19.5432"
                              width="20"
                              height="2.45686"
                              rx="1.22843"
                              fill="black"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="grid place-content-center px-auto pb-[0.625rem] w-[11.75rem] h-[18.75rem]">
                      <DisplayModel
                        selectedVariants={selectedVariants}
                        gene={gene}
                        width={188}
                        height={300}
                      />
                    </div>
                    <button
                      onClick={onButtonClick}
                      className="flex items-center justify-center w-[8.5rem] h-[2.625rem] text-lg italic font-bold uppercase rounded-lg bg-main"
                    >
                      {btnTitle}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center w-full gap-4 overflow-y-hidden">
                    <h2 className="flex-none">bakia của bạn</h2>
                    <div className="flex-none w-full h-8 px-4 mt-4 text-right border-b">
                      <h3>chi tiết</h3>
                    </div>
                    <dl className="w-full flex flex-col gap-[0.875rem] overflow-y-auto">
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
                  </div>
                )}
                <p>
                  Các Bakia được customize sẽ có thời gian ra đời lâu hơn do được sản xuất hoàn toàn
                  dành riêng cho bạn. Bakia sau khi customize không thể được đổi trả. Trường hợp
                  Bakia bị lỗi vui lòng liên hệ chúng tôi để được giải quyết.
                </p>
              </div>
            )}
            <div className="flex items-center justify-between w-full h-20 px-3 py-5 ">
              <div
                className={`flex items-center gap-2 h-full cursor-pointer ${
                  isOverviewOpen ? "text-main" : "text-mainGray"
                }`}
                onClick={onToggleOverview}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM13.2 18H10.8V10.8H13.2V18ZM13.2 8.4H10.8V6H13.2V8.4Z"
                    fill="currentColor"
                  />
                </svg>

                <div className="flex flex-col ">
                  {gene && (
                    <p
                      className={`text-base leading-5 relative tracking-[-0.3px] ${
                        isHighlight
                          ? "text-darkMint after:absolute after:w-2 after:h-2 after:rounded-full after:bg-main after:right-10"
                          : "text-black"
                      }`}
                    >{`${format(
                      gene.price + totalVariantPrice,
                      gene.currency.abbreviationSign
                    )}`}</p>
                  )}
                  <p className="text-mainGray">
                    {!isOverviewOpen ? "Nhấn xem thông tin" : "Nhấn để tắt"}
                  </p>
                </div>
              </div>
              {isConfirmed ? (
                <button
                  className="flex items-center text-black cursor-pointer"
                  onClick={onToggleOverview}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7273 0.272727C11.3636 -0.0909091 10.8182 -0.0909091 10.4545 0.272727L6 4.72727L1.54545 0.272727C1.18182 -0.0909091 0.636364 -0.0909091 0.272727 0.272727C-0.0909091 0.636364 -0.0909091 1.18182 0.272727 1.54545L4.72727 6L0.272727 10.4545C-0.0909091 10.8182 -0.0909091 11.3636 0.272727 11.7273C0.636364 12.0909 1.18182 12.0909 1.54545 11.7273L6 7.27273L10.4545 11.7273C10.8182 12.0909 11.3636 12.0909 11.7273 11.7273C12.0909 11.3636 12.0909 10.8182 11.7273 10.4545L7.27273 6L11.7273 1.54545C12.0909 1.18182 12.0909 0.636364 11.7273 0.272727Z"
                      fill="black"
                    />
                  </svg>
                  Hủy
                </button>
              ) : (
                <button
                  className="flex items-center justify-center w-[8.5rem] h-[2.625rem] text-lg italic font-bold uppercase rounded-lg bg-main"
                  onClick={onButtonClick}
                >
                  {btnTitle}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { CartItem } from "@/lib/types/cart";
import OrderSummary from "./OrderSummary";
import ShippingInfoForm from "./ShippingInfoForm";
import PaymentInfoForm from "./PaymentInfoForm";
import { OrderType, PaymentContent, PaymentInfo, ShippingInfo } from "@/lib/types/payment";
import { renderRule, StructuredText } from "react-datocms";
import { isLink } from "datocms-structured-text-utils";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import fetcher from "@/lib/fetcher";

const Payment = ({ paymentContent }: { paymentContent: PaymentContent }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();
  const [orderId, setOrderId] = useState<string>("");

  const selectedCartItems = cart.filter((item) => item.selected);
  const [displayItems, setDisplayItems] = useState<CartItem[]>(selectedCartItems);
  const { data: returnedOrder } = useSWR<OrderType>(
    orderId ? `/api/order/?orderId=${orderId}` : null,
    fetcher
  );

  useEffect(() => {
    if (returnedOrder) {
      const returnedItems = returnedOrder.items.map<CartItem>((item) => ({
        id: item.id,
        gene: item.gene,
        quantity: item.quantity,
        selectedVariants: item.productVariants,
      }));
      setDisplayItems(returnedItems);
    }
  }, [returnedOrder]);

  const total = displayItems.reduce((res, current) => {
    return res + current.total || 0;
  }, 0);

  const onSubmitOrder = useCallback(async () => {
    const res = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({
        shippingInfo,
        paymentInfo,
        items: selectedCartItems,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { error, orderId: returnedId } = await res.json();
    if (error) {
      console.error(error);
      return;
    }
    setOrderId(returnedId);
    mutate(`/api/order/?orderId=${returnedId}`, returnedOrder, false);
    setCart(cart.filter((item) => !item.selected));
  }, [shippingInfo, paymentInfo, selectedCartItems, setCart, cart, returnedOrder]);

  const onGoToStep = useCallback((step: number) => {
    setStep(step);
  }, []);

  const onSubmitShippingInfo = useCallback((shippingInfo: ShippingInfo) => {
    setShippingInfo(shippingInfo);
  }, []);

  const onSubmitPaymentInfo = useCallback((paymentInfo: PaymentInfo) => {
    setPaymentInfo(paymentInfo);
  }, []);

  return (
    <>
      <div className="w-full px-[0.375rem] min-h-content flex flex-col md:flex-row-reverse md:gap-[1.875rem] md:mt-6">
        <OrderSummary
          items={displayItems}
          total={total}
          shippingInfo={shippingInfo}
          paymentInfo={paymentInfo}
        />
        <div className="flex flex-col flex-1 h-full mt-5 md:mt-2 md:h-[48.875rem] ">
          <div className="grid grid-cols-3 px-6 md:max-h-[4.75rem]">
            <div className="relative flex flex-col items-start">
              <div
                className={`max-w-[6rem] mb-[0.625rem] ${
                  step === 1 ? "visible" : "invisible"
                } md:mb-0 md:font-body md:text-base md:leading-[1.375rem]`}
              >
                Thông tin giao hàng
              </div>
              <div
                className={`border rounded-full w-[2.375rem] h-[2.375rem] grid place-items-center ${
                  step === 1 ? "bg-main border-none" : " bg-background border-black"
                } before:absolute before:bottom-[1.188rem] after:bottom-[1.188rem] before:-left-5 before:border-0.5 before:border-black before:w-5 after:absolute after:left-0 after:border-0.5 ${
                  step > 1 ? "after:border-black" : "after:border-altGrey"
                } after:w-full after:z-[-1] md:w-8 md:h-8`}
              >
                1
              </div>
            </div>
            <div className="relative flex flex-col items-center">
              <div
                className={`max-w-[6rem] mb-[0.625rem] text-center ${
                  step === 2 ? "visible" : "invisible"
                } md:mb-0 md:font-body md:text-base md:leading-[1.375rem]`}
              >
                Thanh toán Pre-order
              </div>
              <div
                className={`border rounded-full w-[2.375rem] h-[2.375rem] grid place-items-center ${
                  step === 2 ? "bg-main" : " bg-background"
                } ${
                  step === 2
                    ? "border-none"
                    : step > 2
                    ? "border-black text-black"
                    : "border-altGrey text-altGrey"
                } after:absolute after:right-0 after:border-0.5 ${
                  step > 2 ? "after:border-black" : "after:border-altGrey"
                } after:w-1/2 after:z-[-1] before:absolute before:border-0.5 before:bottom-[1.188rem] after:bottom-[1.188rem] ${
                  step > 1 ? "before:border-black" : "before:border-altGrey"
                } before:z-[-1] before:w-1/2 before:left-0 md:w-8 md:h-8`}
              >
                2
              </div>
            </div>
            <div className="relative flex flex-col items-end">
              <div
                className={`max-w-[6rem] mb-[0.625rem] text-right ${
                  step === 3 ? "visible" : "invisible"
                } md:mb-0 md:font-body md:text-base md:leading-[1.375rem] md:max-w-[6.25rem]`}
              >
                Hoàn tất đơn đặt hàng
              </div>
              <div
                className={`border rounded-full w-[2.375rem] h-[2.375rem] grid place-items-center ${
                  step === 3 ? "bg-main border-none" : " bg-background"
                } ${
                  step === 3
                    ? "border-none"
                    : step > 3
                    ? "border-black text-black"
                    : "border-altGrey text-altGrey"
                } after:absolute after:-right-5 after:border-0.5 ${
                  step === 3 ? "before:border-black" : "before:border-altGrey"
                } ${
                  step === 3 ? "after:border-black" : "after:border-altGrey"
                } after:w-5 before:absolute before:left-0 before:bottom-[1.188rem] after:bottom-[1.188rem] before:border-0.5 before:border-current before:w-full before:z-[-1] md:w-8 md:h-8`}
              >
                3
              </div>
            </div>
          </div>
          <div className={`${step === 1 ? "block" : "hidden"} md:h-[48.875rem]`}>
            <h2 className="heading-2 mt-[4.75rem] gradient-footer hidden md:block">
              thông tin giao hàng
            </h2>
            <ShippingInfoForm
              onGoNext={() => onGoToStep(2)}
              onSubmitShippingInfo={onSubmitShippingInfo}
            />
          </div>
          <div
            className={`${
              step === 2 ? "block" : "hidden"
            } relative md:h-[41.5rem] md:mt-[4.75rem] md:flex md:flex-col md:justify-between`}
          >
            <h2 className="hidden md:block heading-2 gradient-footer">thanh toán pre-order</h2>
            <PaymentInfoForm
              total={total}
              paymentContent={paymentContent}
              onSubmit={onSubmitPaymentInfo}
              onGoNext={() => onGoToStep(3)}
              onGoPrev={() => onGoToStep(1)}
            />
          </div>
          <div
            className={`flex flex-col justify-between flex-1 w-full h-full ${
              step === 3 ? "block" : "hidden"
            }`}
          >
            {orderId ? (
              <div className="h-full mx-4 mt-5">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => onGoToStep(2)}
                >
                  <svg
                    width="24"
                    height="15"
                    viewBox="0 0 24 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.6364 6.16071H4.63636L8.59091 2.27679C9.13636 1.74107 9.13636 0.9375 8.59091 0.401786C8.04545 -0.133929 7.22727 -0.133929 6.68182 0.401786L0.409091 6.5625C-0.136364 7.09821 -0.136364 7.90179 0.409091 8.4375L6.68182 14.5982C7.22727 15.1339 8.04545 15.1339 8.59091 14.5982C9.13636 14.0625 9.13636 13.2589 8.59091 12.7232L4.63636 8.83929H22.6364C23.3182 8.83929 24 8.30357 24 7.5C24 6.69643 23.3182 6.16071 22.6364 6.16071Z"
                      fill="black"
                    />
                  </svg>
                  Quay lại Thanh toán Pre-order
                </div>
                <h2 className="heading-2 mt-[4.75rem] gradient-footer hidden md:block">
                  hoàn tất đơn đặt hàng
                </h2>
                <div className="h-full mx-4 mt-5 space-y-5">
                  <p className="font-bold mobile-body-txt">
                    Chúc mừng, BAKIA team đã nhận được đơn đặt hàng của bạn! :-)
                  </p>
                  <p className="mobile-body-txt">
                    Bạn đã đặt {displayItems.length} Bakia GENE1: Van Lang Heritage với mã đặt hàng
                    là {orderId}
                  </p>
                  <StructuredText
                    data={paymentContent.successMessage}
                    customRules={[
                      renderRule(isLink, ({ node }) => (
                        <Link href={node.url}>
                          <a className="underline text-darkMint">
                            {node.children.map((child) => {
                              return <child.type key={child.value}>{child.value}</child.type>;
                            })}
                          </a>
                        </Link>
                      )),
                    ]}
                  />
                </div>
                <div className="w-full px-4 py-5">
                  <Link href="/">
                    <a>
                      <div className="w-full h-[3.25rem] rounded-lg bg-main button-txt flex items-center justify-center">
                        hoàn tất
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="h-full mx-4 mt-5 space-y-5">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => onGoToStep(2)}
                  >
                    <svg
                      width="24"
                      height="15"
                      viewBox="0 0 24 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.6364 6.16071H4.63636L8.59091 2.27679C9.13636 1.74107 9.13636 0.9375 8.59091 0.401786C8.04545 -0.133929 7.22727 -0.133929 6.68182 0.401786L0.409091 6.5625C-0.136364 7.09821 -0.136364 7.90179 0.409091 8.4375L6.68182 14.5982C7.22727 15.1339 8.04545 15.1339 8.59091 14.5982C9.13636 14.0625 9.13636 13.2589 8.59091 12.7232L4.63636 8.83929H22.6364C23.3182 8.83929 24 8.30357 24 7.5C24 6.69643 23.3182 6.16071 22.6364 6.16071Z"
                        fill="black"
                      />
                    </svg>
                    Quay lại Thanh toán Pre-order
                  </div>
                  <h2 className="heading-2 mt-[4.75rem] gradient-footer">hoàn tất đơn đặt hàng</h2>
                  <p className="mx-4">
                    Khi đã hoàn tất kiểm tra chỉnh sửa chính xác{" "}
                    <button
                      onClick={() => onGoToStep(1)}
                      className="font-bold underline text-darkMint"
                    >
                      thông tin giao hàng
                    </button>{" "}
                    và{" "}
                    <button
                      onClick={() => onGoToStep(2)}
                      className="font-bold underline text-darkMint"
                    >
                      thông tin pre-order
                    </button>
                    , hãy xác nhận để đơn hàng của bạn được gửi đi.
                  </p>
                </div>
                <div className="w-full px-4 py-5">
                  <button
                    className="w-full h-[3.25rem] rounded-lg bg-main button-txt"
                    onClick={onSubmitOrder}
                  >
                    xác nhận
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;

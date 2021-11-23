import { useCallback, useState } from "react";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { CartItem } from "@/lib/types/cart";
import OrderSummary from "./OrderSummary";
import ProgressStepper from "./ProgressStepper";
import { PaymentContent, PaymentInfo, ShippingInfo } from "@/lib/types/payment";

const Payment = ({ paymentContent }: { paymentContent: PaymentContent }) => {
  const [cart] = useLocalStorage<CartItem[]>("cart", []);
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();
  const selectedCartItems = cart.filter((item) => item.selected);
  const total = selectedCartItems.reduce((res, current) => {
    return res + current.total || 0;
  }, 0);
  const onSubmitOrder = useCallback(() => {
    console.log("submit order");
    console.log(shippingInfo);
    console.log(paymentInfo);
  }, [shippingInfo, paymentInfo]);

  return (
    <>
      <div className="w-full px-[0.375rem] min-h-content flex flex-col">
        <OrderSummary items={selectedCartItems} isHighlight={step > 1} />
        <ProgressStepper
          step={step}
          onGoToStep={(next) => setStep(next)}
          total={total}
          paymentContent={paymentContent}
          onSubmitShippingInfo={(val) => setShippingInfo(val)}
          onSubmitPaymentInfo={(val) => setPaymentInfo(val)}
          onSubmitOrder={onSubmitOrder}
        />
      </div>
    </>
  );
};

export default Payment;

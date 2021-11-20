import { useState } from "react";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { CartItem } from "@/lib/types/cart";
import OrderSummary from "./OrderSummary";
import ProgressStepper from "./ProgressStepper";

const Payment = () => {
  const [cart] = useLocalStorage<CartItem[]>("cart", []);
  const [step, setStep] = useState(1);
  const selectedCartItems = cart.filter((item) => item.selected);
  return (
    <>
      <div className="w-full px-[0.375rem]">
        <OrderSummary items={selectedCartItems} isHighlight={step > 1} />
        <ProgressStepper step={step} onStepClick={(next) => setStep(next)} />
        <div className="w-full"></div>
      </div>
    </>
  );
};

export default Payment;

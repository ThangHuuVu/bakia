import { PaymentInfo, ShippingInfo } from "@/lib/types/payment";
import ShippingInfoForm from "./ShippingInfoForm";
import PaymentInfoForm from "./PaymentInfoForm";
interface ProgressStepperProps {
  step: number;
  total: number;
  paymentContent: any;
  onGoToStep: (step: number) => void;
  onSubmitShippingInfo: (shippingInfo: ShippingInfo) => void;
  onSubmitPaymentInfo: (paymentInfo: PaymentInfo) => void;
  onSubmitOrder: () => void;
}

const ProgressStepper = ({
  step,
  onGoToStep,
  total,
  paymentContent,
  onSubmitShippingInfo,
  onSubmitPaymentInfo,
  onSubmitOrder,
}: ProgressStepperProps) => {
  return (
    <div className="flex flex-col flex-1 h-full mt-5">
      <div className="grid grid-cols-3 px-6">
        <div className="relative flex flex-col items-start">
          <div className={`max-w-[6rem] mb-[0.625rem] ${step === 1 ? "visible" : "invisible"}`}>
            Thông tin giao hàng
          </div>
          <div
            className={`border rounded-full w-[2.375rem] h-[2.375rem] grid place-items-center ${
              step === 1 ? "bg-main border-none" : " bg-background border-black"
            } before:absolute before:-left-5 before:border-0.5 before:border-black before:w-5 after:absolute after:left-0 after:border-0.5 ${
              step > 1 ? "after:border-black" : "after:border-altGrey"
            } after:w-full after:z-[-1]`}
          >
            1
          </div>
        </div>
        <div className="relative flex flex-col items-center">
          <div
            className={`max-w-[6rem] mb-[0.625rem] text-center ${
              step === 2 ? "visible" : "invisible"
            }`}
          >
            Thanh toán Pre-order
          </div>
          <div
            className={`border rounded-full w-[2.375rem] h-[2.375rem] grid place-items-center ${
              step === 2 ? "bg-main" : " bg-background"
            } ${
              step === 2 ? "border-none" : step > 2 ? "border-black" : "border-altGrey"
            } after:absolute after:right-0 after:border-0.5 ${
              step > 2 ? "after:border-black" : "after:border-altGrey"
            } after:w-1/2 after:z-[-1] before:absolute before:border-0.5 ${
              step > 1 ? "before:border-black" : "before:border-altGrey"
            } before:z-[-1] before:w-1/2 before:left-0`}
          >
            2
          </div>
        </div>
        <div className="relative flex flex-col items-end">
          <div
            className={`max-w-[6rem] mb-[0.625rem] text-right ${
              step === 3 ? "visible" : "invisible"
            }`}
          >
            Hoàn tất đơn đặt hàng
          </div>
          <div
            className={`border rounded-full w-[2.375rem] h-[2.375rem] grid place-items-center ${
              step === 3 ? "bg-main border-none" : " bg-background"
            } ${
              step === 3 ? "border-none" : step > 3 ? "border-black" : "border-altGrey"
            } after:absolute after:-right-5 after:border-0.5 ${
              step === 3 ? "before:border-black" : "before:border-altGrey"
            } ${
              step === 3 ? "after:border-black" : "after:border-altGrey"
            } after:w-5 before:absolute before:left-0 before:border-0.5 before:border-current before:w-full before:z-[-1]`}
          >
            3
          </div>
        </div>
      </div>
      <div className={step === 1 ? "block" : "hidden"}>
        <ShippingInfoForm
          onGoNext={() => onGoToStep(2)}
          onSubmitShippingInfo={onSubmitShippingInfo}
        />
      </div>
      <div className={step === 2 ? "block" : "hidden"}>
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
        <div className="h-full mx-4 mt-5 space-y-5 ">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onGoToStep(2)}>
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
          <p className="mx-4">
            Khi đã hoàn tất kiểm tra chỉnh sửa chính xác{" "}
            <button onClick={() => onGoToStep(1)} className="font-bold underline text-darkMint">
              thông tin giao hàng
            </button>{" "}
            và{" "}
            <button onClick={() => onGoToStep(2)} className="font-bold underline text-darkMint">
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
      </div>
    </div>
  );
};

export default ProgressStepper;

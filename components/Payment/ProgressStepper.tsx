import * as Tabs from "@radix-ui/react-tabs";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { PaymentInfo, ShippingInfo } from "@/lib/types/payment";

interface ProgressStepperProps {
  step: number;
  onGoToStep: (step: number) => void;
  onSubmitShippingInfo: (shippingInfo: ShippingInfo) => void;
  onSubmitPaymentInfo: (paymentInfo: PaymentInfo) => void;
}

interface ShippingInfoFormProps {
  onSubmitShippingInfo: (shippingInfo: ShippingInfo) => void;
  onGoNext: () => void;
}

const ShippingInfoForm = ({ onSubmitShippingInfo, onGoNext }: ShippingInfoFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingInfo>();

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmitShippingInfo(data);
          onGoNext();
        })}
        className="flex flex-col gap-5 mt-[3.125rem] mx-[0.625rem] relative"
      >
        {Object.keys(errors).length > 0 && (
          <span className="absolute -top-8 text-error">
            Vui lòng đáp ứng thông tin trong các mục (*)
          </span>
        )}
        <input
          className={`h-[2.75rem] px-4 rounded ${
            errors.fullName ? "border border-error placeholder-error" : "border-none"
          }`}
          placeholder="Họ tên *"
          {...register("fullName", { required: true })}
        />
        <div className="flex items-center justify-center w-full gap-10">
          <div>
            <input {...register("gender")} type="radio" value="male" className="mr-[0.875rem]" />
            <label htmlFor="male">Anh</label>
          </div>
          <div>
            <input {...register("gender")} type="radio" value="female" className="mr-[0.875rem]" />
            <label htmlFor="female">Chị</label>
          </div>
        </div>
        <input
          className={`h-[2.75rem] px-4 rounded ${
            errors.email ? "border border-error placeholder-error" : "border-none"
          }`}
          placeholder="Email *"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />
        <input
          className={`h-[2.75rem] px-4 rounded ${
            errors.phoneNumber ? "border border-error placeholder-error" : "border-none"
          }`}
          placeholder="Số điện thoại *"
          {...register("phoneNumber", { required: true })}
        />
        <div>Khu vực</div>
        <div className="flex items-center justify-center w-full gap-10">
          <div>
            <input {...register("area")} type="radio" value="north" className="mr-[0.875rem]" />
            <label htmlFor="male">Bắc</label>
          </div>
          <div>
            <input {...register("area")} type="radio" value="mid" className="mr-[0.875rem]" />
            <label htmlFor="female">Trung</label>
          </div>
          <div>
            <input {...register("area")} type="radio" value="south" className="mr-[0.875rem]" />
            <label htmlFor="female">Nam</label>
          </div>
        </div>
        <input
          className={`h-[2.75rem] px-4 rounded ${
            errors.address ? "border border-error placeholder-error" : "border-none"
          }`}
          placeholder="Địa chỉ *"
          {...register("address", { required: true })}
        />
        <div>Chọn hình thức giao hàng</div>
        <div>
          <input {...register("shippingMethod")} type="radio" value="fast" className="hidden" />
        </div>
        <textarea
          className="h-[5.25rem] px-4 py-3"
          placeholder="Bạn có ghi chú gì về địa chỉ nhận hàng không? ( chung cư, nhà riêng, ngày giờ có thể nhận hàng ... )"
          {...register("note")}
        />
        <div className="w-full px-4 py-5 rounded">
          <input
            type="submit"
            className="w-full h-[3.25rem] rounded-lg bg-main button-txt"
            value="
              tiếp tục"
          />
        </div>
      </form>
    </>
  );
};

const ProgressStepper = ({
  step,
  onGoToStep,
  onSubmitShippingInfo,
  onSubmitPaymentInfo,
}: ProgressStepperProps) => {
  const firstTabRef = useRef(null);
  useEffect(() => {
    firstTabRef.current?.focus();
  }, []);

  return (
    <Tabs.Root className="mt-5">
      <Tabs.List className="grid grid-cols-3 px-6">
        <Tabs.Trigger
          ref={firstTabRef}
          onClick={() => onGoToStep(1)}
          value="step1"
          className="relative flex flex-col items-start cursor-pointer"
        >
          <div className={`max-w-[6rem] mb-[0.625rem] ${step === 1 ? "opacity-100" : "opacity-0"}`}>
            Thông tin giao hàng
          </div>
          <div
            className={`border rounded-full w-[2.375rem] h-[2.375rem] grid place-items-center ${
              step === 1 ? "bg-main border-none" : " bg-background border-black"
            } before:absolute before:-left-5 before:border-0.5 before:border-black before:w-5 after:absolute after:left-0 after:border-0.5 after:border-black after:w-full after:z-[-1]`}
          >
            1
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger
          onClick={() => onGoToStep(2)}
          value="step2"
          className="relative flex flex-col items-center cursor-pointer"
        >
          <div
            className={`max-w-[6rem] mb-[0.625rem] text-center ${
              step === 2 ? "opacity-100" : "opacity-0"
            }`}
          >
            Thanh toán Pre-order
          </div>
          <div
            className={`border rounded-full w-[2.375rem] h-[2.375rem] grid place-items-center ${
              step === 2 ? "bg-main border-none" : " bg-background border-black"
            } after:absolute after:right-0 after:border-0.5 after:border-black after:w-1/2 after:z-[-1] before:absolute before:border-0.5 before:border-current before:z-[-1] before:w-1/2 before:left-0`}
          >
            2
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger
          onClick={() => onGoToStep(3)}
          value="step3"
          className="relative flex flex-col items-end cursor-pointer"
        >
          <div
            className={`max-w-[6rem] mb-[0.625rem] text-right ${
              step === 3 ? "opacity-100" : "opacity-0"
            }`}
          >
            Hoàn tất đơn đặt hàng
          </div>
          <div
            className={`border border-black rounded-full w-[2.375rem] h-[2.375rem] grid place-items-center ${
              step === 3 ? "bg-main border-none" : " bg-background"
            } before:absolute before:-right-5 before:border-0.5 before:border-black before:w-5  after:absolute after:left-0 after:border-0.5 after:border-current after:w-full after:z-[-1]`}
          >
            3
          </div>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="step1">
        <ShippingInfoForm
          onGoNext={() => onGoToStep(2)}
          onSubmitShippingInfo={onSubmitShippingInfo}
        />
      </Tabs.Content>
      <Tabs.Content value="step2">
        <div className="w-full px-4 py-5">
          <button
            className="w-full h-[3.25rem] rounded-lg bg-main button-txt"
            onClick={() => onGoToStep(3)}
          >
            tiếp tục
          </button>
        </div>
      </Tabs.Content>
      <Tabs.Content value="step3">
        <div className="w-full px-4 py-5">
          <input type="submit" className="w-full h-[3.25rem] rounded-lg bg-main button-txt">
            xác nhận
          </input>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ProgressStepper;

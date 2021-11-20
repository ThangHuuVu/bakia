import * as Tabs from "@radix-ui/react-tabs";

const ProgressStepper = ({ step, onStepClick }) => {
  return (
    <Tabs.Root className="px-6 mt-5">
      <Tabs.List className="grid grid-cols-3">
        <Tabs.Trigger
          onClick={() => onStepClick(1)}
          value="step1"
          className="relative flex flex-col items-start cursor-pointer"
        >
          <div className={`max-w-[6rem] mb-[0.625rem] ${step === 1 ? "opacity-100" : "opacity-0"}`}>
            Thông tin giao hàng
          </div>
          <div
            className={`border border-black rounded-full w-[2.375rem] h-[2.375rem] grid place-items-center ${
              step === 1 ? "bg-main border-none" : " bg-background"
            } before:absolute before:-left-5 before:border before:border-black before:w-5 after:absolute after:left-0 after:border after:border-black after:w-full after:z-[-1]`}
          >
            1
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger
          onClick={() => onStepClick(2)}
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
            className={`border border-black rounded-full w-[2.375rem] h-[2.375rem] grid place-items-center ${
              step === 2 ? "bg-main border-none" : " bg-background"
            } after:absolute after:left-0 after:border after:border-black after:w-full after:z-[-1]`}
          >
            2
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger
          onClick={() => onStepClick(3)}
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
            } before:absolute before:-right-5 before:border before:border-black before:w-5  after:absolute after:left-0 after:border after:border-black after:w-full after:z-[-1]`}
          >
            3
          </div>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="step1">Step1</Tabs.Content>
      <Tabs.Content value="step2">Step2</Tabs.Content>
      <Tabs.Content value="step3">Step3</Tabs.Content>
    </Tabs.Root>
  );
};

export default ProgressStepper;

import { BankAccount, EWallet, PaymentInfo } from "@/lib/types/payment";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import PaymentAccountsTab from "./PaymentAccountsTab";
import PaymentSwiper from "./PaymentSwiper";

interface PaymentPageProps {
  onGoBack: () => void;
  register: UseFormRegister<PaymentInfo>;
  errors: FieldErrors<PaymentInfo>;
  accounts: BankAccount[] | EWallet[];
}

const PaymentPage = ({ onGoBack, register, errors, accounts }: PaymentPageProps) => {
  return (
    <div className="md:relative md:mt-[8.75rem]">
      <button
        className="absolute flex items-center gap-2 cursor-pointer top-5 md:-top-20"
        onClick={onGoBack}
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
        Chọn hình thức thanh toán khác
      </button>
      <p className="">Thông tin tài khoản nguồn</p>
      <div className="relative flex flex-col w-full gap-5 mt-5 md:flex-row md:mt-[0.625rem]">
        {Object.keys(errors).length > 0 && (
          <span className="absolute text-error -top-20">
            Vui lòng đáp ứng thông tin trong các mục (*)
          </span>
        )}
        <input
          className={`h-[2.75rem] md:h-[2.625rem] px-4 rounded ${
            errors.paymentSource?.accountNumber
              ? "border border-error placeholder-error"
              : "border-none"
          } md:w-full`}
          placeholder="Số tài khoản*"
          {...register("paymentSource.accountNumber")}
        />
        <input
          className={`h-[2.75rem] md:h-[2.625rem] px-4 rounded ${
            errors.paymentSource?.accountName
              ? "border border-error placeholder-error"
              : "border-none"
          } md:w-full`}
          placeholder="Tên chủ tài khoản*"
          {...register("paymentSource.accountName")}
        />
      </div>
      <p className="my-5 ml-4 md:my-4">Thông tin tài khoản nhận thanh toán</p>
      <PaymentSwiper accounts={accounts} />
      <PaymentAccountsTab accounts={accounts} />
      <div className="w-full px-4 py-5 rounded md:hidden">
        <input
          type="submit"
          className="w-full h-[3.25rem] rounded-lg bg-main button-txt"
          value="
              tiếp tục"
        />
      </div>
    </div>
  );
};

export default PaymentPage;

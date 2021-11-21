import {
  BankAccount,
  EWallet,
  PaymentContent,
  PaymentInfo,
  PaymentMethodEnum,
} from "@/lib/types/payment";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { format } from "@/lib/currency";
import { renderRule, StructuredText } from "react-datocms";
import { isLink } from "datocms-structured-text-utils";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

interface PaymentInfoFormProps {
  total: number;
  paymentContent: PaymentContent;
  onSubmit: (paymentInfo: PaymentInfo) => void;
  onGoNext: () => void;
  onGoPrev: () => void;
}

interface BankPaymentProps {
  onGoBack: () => void;
  register: UseFormRegister<PaymentInfo>;
  errors: FieldErrors<PaymentInfo>;
  bankAccounts: BankAccount[];
}

const BankPayment = ({ onGoBack, register, errors, bankAccounts }: BankPaymentProps) => {
  return (
    <div className="relative">
      <button className="flex items-center gap-2" onClick={onGoBack}>
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
      {Object.keys(errors).length > 0 && (
        <span className="absolute text-error">Vui lòng đáp ứng thông tin trong các mục (*)</span>
      )}
      <p className="mt-[2.375rem]">Thông tin tài khoản nguồn</p>
      <div className="flex flex-col w-full gap-5 mt-8">
        <input
          className={`h-[2.75rem] px-4 rounded ${
            errors.source?.accountNumber ? "border border-error placeholder-error" : "border-none"
          }`}
          placeholder="Số tài khoản*"
          {...register("source.accountNumber", { required: true })}
        />
        <input
          className={`h-[2.75rem] px-4 rounded ${
            errors.source?.accountName ? "border border-error placeholder-error" : "border-none"
          }`}
          placeholder="Tên chủ tài khoản*"
          {...register("source.accountName", { required: true })}
        />
      </div>
      <p className="my-5 ml-4">Thông tin tài khoản nhận thanh toán</p>
      <Swiper className="payment-swiper">
        {bankAccounts.length > 0 &&
          bankAccounts.map((bank) => (
            <SwiperSlide key={bank.accountNumber} className="payment-swiper-slide">
              <div className="flex flex-col bg-white gap-[0.625rem] pt-3 pb-9 px-4 w-full">
                <div className="flex items-center justify-center w-full">
                  <Image
                    height={32}
                    width={100}
                    src={bank.image.url}
                    alt={bank.name}
                    blurDataURL={bank.image.blurUpThumb}
                  />
                </div>
                <p>{bank.name}</p>
                <div>
                  <p className="text-altGrey">Số tài khoản:</p>
                  <p>{bank.accountNumber}</p>
                </div>
                <div>
                  <p className="text-altGrey">Chủ tài khoản:</p>
                  <p className="uppercase">{bank.accountHolderName}</p>
                </div>
                <div>
                  <p className="text-altGrey">Chi nhánh:</p>
                  <p>{bank.branch}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="w-full px-4 py-5 rounded">
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

interface EWalletPaymentProps {
  onGoBack: () => void;
  register: UseFormRegister<PaymentInfo>;
  errors: FieldErrors<PaymentInfo>;
  eWallets: EWallet[];
}

const EWalletPayment = ({ onGoBack, register, errors, eWallets }: EWalletPaymentProps) => {
  return (
    <div className="relative">
      <button className="flex items-center gap-2" onClick={onGoBack}>
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
      {Object.keys(errors).length > 0 && (
        <span className="absolute text-error">Vui lòng đáp ứng thông tin trong các mục (*)</span>
      )}
      <p className="mt-[2.375rem]">Thông tin tài khoản nguồn</p>
      <div className="flex flex-col w-full gap-5 mt-8">
        <input
          className={`h-[2.75rem] px-4 rounded ${
            errors.source?.accountNumber ? "border border-error placeholder-error" : "border-none"
          }`}
          placeholder="Số tài khoản*"
          {...register("source.accountNumber", { required: true })}
        />
        <input
          className={`h-[2.75rem] px-4 rounded ${
            errors.source?.accountName ? "border border-error placeholder-error" : "border-none"
          }`}
          placeholder="Tên chủ tài khoản*"
          {...register("source.accountName", { required: true })}
        />
      </div>
      <p className="my-5 ml-4">Thông tin tài khoản nhận thanh toán</p>
      <Swiper className="payment-swiper">
        {eWallets.length > 0 &&
          eWallets.map((eWallet) => (
            <SwiperSlide key={eWallet.accountNumber} className="payment-swiper-slide">
              <div className="flex flex-col bg-white gap-[0.625rem] pt-3 pb-9 px-4 w-full">
                <div className="flex items-center justify-center w-full">
                  <Image
                    height={32}
                    width={100}
                    src={eWallet.image.url}
                    alt={eWallet.name}
                    blurDataURL={eWallet.image.blurUpThumb}
                  />
                </div>
                <p>{eWallet.name}</p>
                <div>
                  <p className="text-altGrey">Số điện thoại:</p>
                  <p>{eWallet.accountNumber}</p>
                </div>
                <div>
                  <p className="text-altGrey">Tên người nhận:</p>
                  <p className="uppercase">{eWallet.accountHolderName}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="w-full px-4 py-5 rounded">
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

const PaymentInfoForm = ({
  onSubmit,
  paymentContent: { term, banks, eWallets },
  onGoNext,
  onGoPrev,
  total,
}: PaymentInfoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentInfo>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>(PaymentMethodEnum.none);
  return (
    <form
      className="mx-4 mt-5 space-y-5 mb-[2.625rem]"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        onGoNext();
      })}
    >
      {paymentMethod === PaymentMethodEnum.none && (
        <>
          <button className="flex items-center gap-2" onClick={onGoPrev}>
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
            Quay lại Thông tin giao hàng
          </button>
          <div className="mx-4">
            <p>
              Số tiền cần thanh toán cho pre-order của bạn là{" "}
              <strong className="text-darkMint">{format(total, "VND")}</strong>
            </p>

            <p className="mt-9">Chọn hình thức thanh toán</p>
          </div>
          <div className="grid w-full space-y-5">
            <button
              className={`bg-white h-[3.125rem] flex flex-col items-center pt-3`}
              onClick={() => setPaymentMethod(PaymentMethodEnum.bank)}
            >
              <p>Thanh toán qua ngân hàng</p>
            </button>
            <button
              className={`bg-white h-[3.125rem] flex flex-col items-center pt-3`}
              onClick={() => setPaymentMethod(PaymentMethodEnum.eWallet)}
            >
              <p>Thanh toán qua MOMO</p>
            </button>
          </div>
          <p className="ml-4 text-error">Bạn cần đồng ý trước khi thanh toán</p>
          <div className="relative flex flex-col gap-5">
            <div className="pl-4">
              <StructuredText
                data={term}
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
            <div className="flex items-center justify-center gap-[0.875rem]">
              <input id="agreeTerm" {...register("agreedTerm")} type="checkbox" />
              <label htmlFor="agreeTerm">Tôi đồng ý với quy định thanh toán</label>
            </div>
          </div>
        </>
      )}
      {paymentMethod === PaymentMethodEnum.bank && (
        <BankPayment
          onGoBack={() => setPaymentMethod(PaymentMethodEnum.none)}
          register={register}
          errors={errors}
          bankAccounts={banks}
        />
      )}
      {paymentMethod === PaymentMethodEnum.eWallet && (
        <EWalletPayment
          onGoBack={() => setPaymentMethod(PaymentMethodEnum.none)}
          register={register}
          errors={errors}
          eWallets={eWallets}
        />
      )}
    </form>
  );
};

export default PaymentInfoForm;

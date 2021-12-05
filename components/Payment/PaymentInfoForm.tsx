import { PaymentContent, PaymentInfo } from "@/lib/types/payment";
import { useForm } from "react-hook-form";
import { format } from "@/lib/currency";
import { renderRule, StructuredText } from "react-datocms";
import { isLink } from "datocms-structured-text-utils";
import Link from "next/link";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { PaymentMethod } from "@prisma/client";
import PaymentPage from "./PaymentPage";

interface PaymentInfoFormProps {
  total: number;
  paymentContent: PaymentContent;
  onSubmit: (paymentInfo: PaymentInfo) => void;
  onGoNext: () => void;
  onGoPrev: () => void;
}

const PaymentInfoForm = ({
  onSubmit,
  paymentContent: { term, banks, eWallets },
  onGoNext,
  onGoPrev,
  total,
}: PaymentInfoFormProps) => {
  const paymentSchema = Yup.object().shape({
    agreedTerm: Yup.boolean().oneOf([true], "Bạn cần đồng ý trước khi thanh toán"),
    paymentSource: Yup.object().shape({
      accountNumber: Yup.string().required("Vui lòng nhập số tài khoản"),
      accountName: Yup.string().required("Vui lòng nhập tên chủ tài khoản"),
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentInfo>({
    resolver: yupResolver(paymentSchema),
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  return (
    <>
      <div
        className="absolute items-center hidden gap-2 cursor-pointer md:flex top-5 md:-top-10"
        onClick={onGoPrev}
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
        Quay lại Thông tin giao hàng
      </div>
      <form
        className="mx-4 mt-[4.625rem] mb-[2.625rem] md:my-0 md:mx-0"
        onSubmit={handleSubmit((data) => {
          onSubmit({ ...data, paymentSource: { ...data.paymentSource, type: paymentMethod } });
          onGoNext();
        })}
      >
        {paymentMethod === null && (
          <>
            <div
              className="absolute flex items-center gap-2 cursor-pointer md:hidden top-5 md:top-8"
              onClick={onGoPrev}
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
              Quay lại Thông tin giao hàng
            </div>
            <div className="mx-4">
              <p>
                Số tiền cần thanh toán cho pre-order của bạn là{" "}
                <strong className="text-darkMint">{format(total, "VND")}</strong>
              </p>

              <p className="mb-5 mt-9 md:mb-5 md:mt-5">Chọn hình thức thanh toán</p>
            </div>
            <div className="flex flex-col w-full gap-5 md:flex-row md:gap-[1.875rem]">
              <button
                className={`bg-white h-[3.125rem] flex flex-col items-center pt-3 md:w-full`}
                onClick={() => setPaymentMethod(PaymentMethod.BANK)}
              >
                <p>Thanh toán qua ngân hàng</p>
              </button>
              <button
                className={`bg-white h-[3.125rem] flex flex-col items-center pt-3 md:w-full`}
                onClick={() => setPaymentMethod(PaymentMethod.EWALLET)}
              >
                <p>Thanh toán qua MOMO</p>
              </button>
            </div>
            <div className="relative flex flex-col gap-5 mt-10">
              {errors.agreedTerm && (
                <p className="absolute -top-8 text-error">Bạn cần đồng ý trước khi thanh toán</p>
              )}
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
                <input id="agreedTerm" {...register("agreedTerm")} type="checkbox" />
                <label htmlFor="agreedTerm">Tôi đồng ý với quy định thanh toán</label>
              </div>
            </div>
          </>
        )}
        {paymentMethod === PaymentMethod.BANK && (
          <PaymentPage
            onGoBack={() => setPaymentMethod(null)}
            register={register}
            errors={errors}
            accounts={banks}
          />
        )}
        {paymentMethod === PaymentMethod.EWALLET && (
          <PaymentPage
            onGoBack={() => setPaymentMethod(null)}
            register={register}
            errors={errors}
            accounts={eWallets}
          />
        )}
        <div className="hidden w-full px-4 py-5 rounded md:justify-end md:px-0 md:pt-12 md:pb-0 md:flex">
          <input
            type="submit"
            className="cursor-pointer w-full h-[3.25rem] md:w-[8.5rem] rounded-lg bg-main button-txt"
            value="
              tiếp tục"
          />
        </div>
      </form>
    </>
  );
};

export default PaymentInfoForm;

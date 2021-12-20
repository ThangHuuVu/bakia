import { useState } from "react";
import { useForm } from "react-hook-form";
import { ShippingDetail, ShippingInfo } from "@/lib/types/payment";
import { format } from "@/lib/currency";
import { ShippingMethod } from "@prisma/client";
import { Gender } from "@prisma/client";

interface ShippingInfoFormProps {
  onSubmitShippingInfo: (shippingInfo: ShippingInfo) => void;
  onGoNext: () => void;
}

const ShippingInfoForm = ({ onSubmitShippingInfo, onGoNext }: ShippingInfoFormProps) => {
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(ShippingMethod.STANDARD);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ShippingInfo>();
  const requireTextErrors =
    errors.fullName?.type === "required" ||
    errors.address?.type === "required" ||
    errors.email?.type === "required" ||
    errors.phoneNumber?.type === "required";

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmitShippingInfo({ ...data, shippingMethod });
        onGoNext();
      })}
      className="flex flex-col gap-5 mt-[3.125rem] mx-[0.625rem] relative md:mt-[3.375rem]"
    >
      {isDirty &&
        (requireTextErrors ? (
          <span className="absolute -top-8 text-error">
            Vui lòng đáp ứng thông tin trong các mục (*)
          </span>
        ) : errors.gender?.type === "required" ? (
          <span className="absolute -top-8 text-error">Vui lòng tích chọn giới tính</span>
        ) : errors.email?.type === "pattern" ? (
          <span className="absolute -top-8 text-error">{errors.email?.message}</span>
        ) : (
          errors.phoneNumber?.type === "pattern" && (
            <span className="absolute -top-8 text-error">{errors.phoneNumber?.message}</span>
          )
        ))}
      <div className="w-full md:flex md:gap-6">
        <select
          className={`hidden md:block ml-2 bg-white h-[2.625rem] w-32  ${
            errors.gender ? "border border-error" : "border-none"
          }`}
          {...register("gender", { required: true })}
        >
          <option value={Gender.MAlE}>Anh</option>
          <option value={Gender.FEMALE}>Chị</option>
        </select>
        <input
          className={`h-[2.75rem] md:h-[2.625rem] w-full px-4 rounded ${
            errors.fullName ? "border border-error placeholder-error" : "border-none"
          }`}
          placeholder="Họ tên *"
          {...register("fullName", { required: true })}
        />
      </div>
      <div className="flex items-center justify-center w-full gap-10 md:hidden">
        <div>
          <input
            {...register("gender", { required: true })}
            type="radio"
            id={Gender.MAlE}
            value={Gender.MAlE}
            className="mr-[0.875rem]"
          />
          <label htmlFor={Gender.MAlE}>Anh</label>
        </div>
        <div>
          <input
            {...register("gender", { required: true })}
            type="radio"
            id={Gender.FEMALE}
            value={Gender.FEMALE}
            className="mr-[0.875rem]"
          />
          <label htmlFor={Gender.FEMALE}>Chị</label>
        </div>
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <input
          className={`h-[2.75rem] md:h-[2.625rem] px-4 rounded ${
            errors.email ? "border border-error placeholder-error" : "border-none"
          } md:w-full md:max-w-[22.875rem]`}
          placeholder="Email *"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email không hợp lệ",
            },
          })}
        />
        <input
          className={`h-[2.75rem] md:h-[2.625rem] px-4 rounded ${
            errors.phoneNumber ? "border border-error placeholder-error" : "border-none"
          } md:w-full md:max-w-[21.375rem]`}
          type="tel"
          placeholder="Số điện thoại *"
          {...register("phoneNumber", {
            required: true,
            pattern: {
              value: /((09|03|07|08|05)+([0-9]{8})\b)/g,
              message: "Số điện thoại không hợp lệ",
            },
          })}
        />
      </div>
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row">
        <div className="flex-none md:font-body md:text-base md:leading-[1.375rem]">Khu vực</div>
        <div className="flex items-center justify-center w-full gap-10">
          <div>
            <input
              {...register("area")}
              type="radio"
              value="north"
              className="mr-[0.875rem]"
              id="north"
            />
            <label htmlFor="north">Bắc</label>
          </div>
          <div>
            <input
              {...register("area")}
              type="radio"
              value="mid"
              className="mr-[0.875rem]"
              id="mid"
            />
            <label htmlFor="mid">Trung</label>
          </div>
          <div>
            <input
              {...register("area")}
              type="radio"
              value="south"
              className="mr-[0.875rem]"
              id="south"
            />
            <label htmlFor="south">Nam</label>
          </div>
        </div>
      </div>
      <input
        className={`h-[2.75rem] md:h-[2.625rem] px-4 rounded ${
          errors.address ? "border border-error placeholder-error" : "border-none"
        }`}
        placeholder="Địa chỉ *"
        {...register("address", { required: true })}
      />
      <div className="md:font-body md:text-base md:leading-[1.375rem]">
        Chọn hình thức giao hàng
      </div>
      <div className="flex flex-col w-full gap-5 md:flex-row md:items-center md:justify-between md:gap-[1.875rem]">
        <div
          className={`cursor-pointer bg-white h-[6.5rem] flex flex-col items-center pt-3 ${
            shippingMethod === ShippingMethod.FAST ? "border border-main" : "border-none"
          } md:w-1/2`}
          onClick={() => {
            setShippingMethod(ShippingMethod.FAST);
          }}
        >
          <h3 className="text-base italic font-black leading-5 uppercase md:mb-2">ship nhanh</h3>
          <p>{format(ShippingDetail["FAST"].price, "VND")}</p>
          <p className="text-altGrey md:mb-1">
            Thời gian giao hàng trong {ShippingDetail["FAST"].time}
          </p>
        </div>
        <div
          className={`cursor-pointer bg-white h-[6.5rem] flex flex-col items-center pt-3 ${
            shippingMethod === ShippingMethod.STANDARD ? "border border-main" : "border-none"
          } md:w-1/2`}
          onClick={() => {
            setShippingMethod(ShippingMethod.STANDARD);
          }}
        >
          <h3 className="text-base italic font-black leading-5 uppercase md:mb-2">ship tiêu chuẩn</h3>
          <p>{format(ShippingDetail["STANDARD"].price, "VND")}</p>
          <p className="text-altGrey md:mb-1">
            Thời gian giao hàng trong {ShippingDetail["STANDARD"].time}
          </p>
        </div>
      </div>
      <textarea
        className="h-[5.25rem] px-4 py-3 md:h-[2.625rem]"
        placeholder="Bạn có ghi chú gì về địa chỉ nhận hàng không? ( chung cư, nhà riêng, ngày giờ có thể nhận hàng ... )"
        {...register("note")}
      />
      <div className="w-full px-4 py-5 rounded md:flex md:justify-end md:px-0 md:pt-9 md:pb-0">
        <input
          type="submit"
          className="cursor-pointer w-full h-[3.25rem] md:w-[8.5rem] rounded-lg bg-main button-txt"
          value="
              tiếp tục"
        />
      </div>
    </form>
  );
};

export default ShippingInfoForm;

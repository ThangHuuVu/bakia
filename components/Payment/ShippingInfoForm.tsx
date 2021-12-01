import { useState } from "react";
import { useForm } from "react-hook-form";
import { ShippingDetail, ShippingInfo } from "@/lib/types/payment";
import { format } from "@/lib/currency";
import { ShippingMethod } from "@prisma/client";
import { Gender } from ".prisma/client";

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
      className="flex flex-col gap-5 mt-[3.125rem] mx-[0.625rem] relative"
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
      <input
        className={`h-[2.75rem] px-4 rounded ${
          errors.fullName ? "border border-error placeholder-error" : "border-none"
        }`}
        placeholder="Họ tên *"
        {...register("fullName", { required: true })}
      />
      <div className="flex items-center justify-center w-full gap-10">
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
      <input
        className={`h-[2.75rem] px-4 rounded ${
          errors.email ? "border border-error placeholder-error" : "border-none"
        }`}
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
        className={`h-[2.75rem] px-4 rounded ${
          errors.phoneNumber ? "border border-error placeholder-error" : "border-none"
        }`}
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
      <div>Khu vực</div>
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
      <input
        className={`h-[2.75rem] px-4 rounded ${
          errors.address ? "border border-error placeholder-error" : "border-none"
        }`}
        placeholder="Địa chỉ *"
        {...register("address", { required: true })}
      />
      <div>Chọn hình thức giao hàng</div>
      <div className="grid w-full space-y-5">
        <div
          className={`cursor-pointer bg-white h-[6.5rem] flex flex-col items-center pt-3 ${
            shippingMethod === ShippingMethod.FAST ? "border border-main" : "border-none"
          }`}
          onClick={() => {
            setShippingMethod(ShippingMethod.FAST);
          }}
        >
          <h3 className="heading-3-black">ship nhanh</h3>
          <p>{format(ShippingDetail["fast"].price, "VND")}</p>
          <p className="text-altGrey">Thời gian giao hàng trong {ShippingDetail["fast"].time}</p>
        </div>
        <div
          className={`cursor-pointer bg-white h-[6.5rem] flex flex-col items-center pt-3 ${
            shippingMethod === ShippingMethod.STANDARD ? "border border-main" : "border-none"
          }`}
          onClick={() => {
            setShippingMethod(ShippingMethod.STANDARD);
          }}
        >
          <h3 className="heading-3-black">ship tiêu chuẩn</h3>
          <p>{format(ShippingDetail["standard"].price, "VND")}</p>
          <p className="text-altGrey">
            Thời gian giao hàng trong {ShippingDetail["standard"].time}
          </p>
        </div>
      </div>
      <textarea
        className="h-[5.25rem] px-4 py-3"
        placeholder="Bạn có ghi chú gì về địa chỉ nhận hàng không? ( chung cư, nhà riêng, ngày giờ có thể nhận hàng ... )"
        {...register("note")}
      />
      <div className="w-full px-4 py-5 rounded">
        <input
          type="submit"
          className="cursor-pointer w-full h-[3.25rem] rounded-lg bg-main button-txt"
          value="
              tiếp tục"
        />
      </div>
    </form>
  );
};

export default ShippingInfoForm;

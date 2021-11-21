import { useState } from "react";
import { useForm } from "react-hook-form";
import { ShippingInfo, ShippingMethodEnum } from "@/lib/types/payment";
// import { DevTool } from "@hookform/devtools";
import { format } from "@/lib/currency";

interface ShippingInfoFormProps {
  onSubmitShippingInfo: (shippingInfo: ShippingInfo) => void;
  onGoNext: () => void;
}

const ShippingInfoForm = ({ onSubmitShippingInfo, onGoNext }: ShippingInfoFormProps) => {
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodEnum>(
    ShippingMethodEnum.standard
  );
  const {
    register,
    // control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ShippingInfo>();
  const requireTextErrors =
    errors.fullName?.type === "required" ||
    errors.address?.type === "required" ||
    errors.email?.type === "required" ||
    errors.phoneNumber?.type === "required";

  return (
    <>
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
              value="male"
              className="mr-[0.875rem]"
            />
            <label htmlFor="male">Anh</label>
          </div>
          <div>
            <input
              {...register("gender", { required: true })}
              type="radio"
              value="female"
              className="mr-[0.875rem]"
            />
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
        <div className="grid w-full space-y-5">
          <button
            className={`bg-white h-[6.5rem] flex flex-col items-center pt-3 ${
              shippingMethod === ShippingMethodEnum.fast ? "border border-main" : "border-none"
            }`}
            onClick={() => setShippingMethod(ShippingMethodEnum.fast)}
          >
            <h3 className="heading-3-black">ship nhanh</h3>
            <p>{format(45000, "VND")}</p>
            <p className="text-altGrey">Thời gian giao hàng trong 24 - 48 giờ</p>
          </button>
          <button
            className={`bg-white h-[6.5rem] flex flex-col items-center pt-3 ${
              shippingMethod === ShippingMethodEnum.standard ? "border border-main" : "border-none"
            }`}
            onClick={() => setShippingMethod(ShippingMethodEnum.standard)}
          >
            <h3 className="heading-3-black">ship tiêu chuẩn</h3>
            <p>{format(25000, "VND")}</p>
            <p className="text-altGrey">Thời gian giao hàng trong 3 - 4 ngày</p>
          </button>
        </div>
        <div></div>
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
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default ShippingInfoForm;
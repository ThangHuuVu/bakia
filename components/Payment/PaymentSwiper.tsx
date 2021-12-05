import { BankAccount, EWallet } from "@/lib/types/payment";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

const PaymentSwiper = ({ accounts }: { accounts: BankAccount[] | EWallet[] }) => {
  return (
    <Swiper className="md:hidden payment-swiper">
      {accounts.length > 0 &&
        accounts.map((account) => (
          <SwiperSlide key={account.accountNumber} className="payment-swiper-slide">
            <div className="flex flex-col bg-white gap-[0.625rem] pt-3 pb-9 px-4 w-full">
              <div className="flex items-center justify-center w-full">
                <Image
                  height={32}
                  width={100}
                  src={account.image.url}
                  alt={account.name}
                  blurDataURL={account.image.blurUpThumb}
                />
              </div>
              <p>{account.name}</p>
              <div>
                <p className="text-altGrey">Số tài khoản:</p>
                <p>{account.accountNumber}</p>
              </div>
              <div>
                <p className="text-altGrey">Chủ tài khoản:</p>
                <p className="uppercase">{account.accountHolderName}</p>
              </div>
              {account.branch && (
                <div>
                  <p className="text-altGrey">Chi nhánh:</p>
                  <p>{account.branch}</p>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default PaymentSwiper;

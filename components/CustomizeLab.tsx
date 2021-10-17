import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CustomizeLab() {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="flex w-full h-[3.25rem] items-center justify-between px-4 mb-5">
        <div className="flex items-center w-1/2 h-full gap-2">
          <svg
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.75 0.75C6.884 0.75 0.5 7.134 0.5 15C0.5 22.866 6.884 29.25 14.75 29.25C22.616 29.25 29 22.866 29 15C29 7.134 22.616 0.75 14.75 0.75ZM16.175 22.125H13.325V13.575H16.175V22.125ZM16.175 10.725H13.325V7.875H16.175V10.725Z"
              fill="#4D5254"
            />
          </svg>
          <div className="flex flex-col">
            <p className="text-base leading-5 tracking-[-0.3px]">1 500 000 VND</p>
            <p className="text-s3 text-[#4D5254]">Nhấn xem thông tin</p>
          </div>
        </div>
        <Link href="/checkout">
          <a className="w-1/2 h-full">
            <div className="flex items-center justify-center w-full h-full text-lg italic font-bold uppercase rounded-lg bg-main">
              hoàn thành
            </div>
          </a>
        </Link>
      </div>
      <div className="px-4">
        <Image src="/static/assets/bakia_model.png" width={348} height={545} alt="bakia model" />
      </div>
      <Panel />
    </div>
  );
}

const Panel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className={`absolute px-2 w-full h-[21.25rem] transform ${
        isOpen ? "translate-y-0" : "translate-y-[20rem]"
      } transition-transform bottom-0`}
    >
      <div className=" h-full w-full bg-white rounded-t-[0.625rem] pt-[1.875rem]">
        <div className={isOpen ? "flex flex-col items-center prose" : "hidden"}>
          <h2>Customize Lab</h2>
          <p>Tùy chỉnh ngoại hình- sáng tạo Bakia của bạn</p>
        </div>
      </div>
      <button
        className="absolute transform -translate-x-1/2 left-1/2 w-[3.75rem] h-[3.75rem] flex items-center justify-center rounded-full bg-white top-[-1.875rem]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            width="24"
            height="14"
            viewBox="0 0 24 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.68629 1.31371L12 12.6274L23.3137 1.31371"
              stroke="black"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="13"
            viewBox="0 0 24 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.3137 12.3137L12 0.999994L0.686289 12.3137"
              stroke="black"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

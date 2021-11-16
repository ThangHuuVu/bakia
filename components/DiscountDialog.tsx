import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./RadixDialogWrapper";
import { StructuredText } from "react-datocms";

const DiscountDialog = ({ content, open, onButtonClick, onClose }) => {
  return (
    <Dialog
      open={open}
      overlayProps={{ className: "fixed inset-0 transition-opacity bg-black opacity-60" }}
    >
      <DialogContent className="fixed transform -translate-x-1/2 -translate-y-1/2 bg-white rounded w-dialog top-1/2 left-1/2 popup-shadow flex flex-col gap-[0.625rem]">
        <div className="h-[6.438rem] bg-grey w-full rounded-t">
          <DialogClose className="absolute top-[0.625rem] right-[0.625rem]" onClick={onClose}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6818 0.318182C13.2576 -0.106061 12.6212 -0.106061 12.197 0.318182L7 5.51515L1.80303 0.318182C1.37879 -0.106061 0.742424 -0.106061 0.318182 0.318182C-0.106061 0.742424 -0.106061 1.37879 0.318182 1.80303L5.51515 7L0.318182 12.197C-0.106061 12.6212 -0.106061 13.2576 0.318182 13.6818C0.742424 14.1061 1.37879 14.1061 1.80303 13.6818L7 8.48485L12.197 13.6818C12.6212 14.1061 13.2576 14.1061 13.6818 13.6818C14.1061 13.2576 14.1061 12.6212 13.6818 12.197L8.48485 7L13.6818 1.80303C14.1061 1.37879 14.1061 0.742424 13.6818 0.318182Z"
                fill="black"
              />
            </svg>
          </DialogClose>
        </div>
        <DialogTitle className="text-[1.375rem] leading-7 text-center font-body mt-[0.625rem]">
          {content.title}
        </DialogTitle>
        <div className="w-full p-3">
          <div className="flex justify-between w-full divide-x  sub-txt tracking-[-0.2px]">
            <div className="w-1/2 text-left">
              Mã giảm giá: <strong>{content.code}</strong>
            </div>
            <div className="w-1/2 text-right">
              Số lượng còn lại: <strong>{content.limit}</strong>
            </div>
          </div>
          <DialogDescription className="mt-4">
            <StructuredText data={content.detail} />
          </DialogDescription>
        </div>
        <div className="flex items-center justify-center gap-2 text-altGrey">
          <div className="flex items-center gap-2">
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block"
            >
              <path
                d="M10.8242 9.54705L9.12749 9.32103C8.72 9.26648 8.31919 9.43014 8.03195 9.76526L6.80281 11.1993C4.91234 10.077 3.36255 8.2767 2.40061 6.06335L3.63644 4.62155C3.92368 4.28643 4.06396 3.81882 4.0172 3.34341L3.82348 1.37945C3.74332 0.592307 3.17551 0 2.49414 0H1.33848C0.583624 0 -0.0443069 0.73259 0.00245392 1.61326C0.3565 8.26891 4.91902 13.5841 10.6172 13.9971C11.372 14.0517 11.9999 13.3191 11.9999 12.4384V11.0902C12.0066 10.303 11.4989 9.64057 10.8242 9.54705Z"
                fill="currentColor"
              />
            </svg>
            (+84) 969 505 423
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block"
            >
              <path
                d="M12.6001 0H1.40012C0.630122 0 0.00712206 0.5625 0.00712206 1.25L0.00012207 8.75C0.00012207 9.4375 0.630122 10 1.40012 10H12.6001C13.3701 10 14.0001 9.4375 14.0001 8.75V1.25C14.0001 0.5625 13.3701 0 12.6001 0ZM11.9001 8.75H2.10012C1.71512 8.75 1.40012 8.46875 1.40012 8.125V2.5L6.25812 5.2125C6.71312 5.46875 7.28712 5.46875 7.74212 5.2125L12.6001 2.5V8.125C12.6001 8.46875 12.2851 8.75 11.9001 8.75ZM7.00012 4.375L1.40012 1.25H12.6001L7.00012 4.375Z"
                fill="currentColor"
              />
            </svg>
            team.bakia@gmail.com
          </div>
        </div>
        <div className="w-full p-4">
          <button
            className="mobile-button-txt h-[3.25rem] rounded-lg bg-main grid place-content-center w-full"
            onClick={onButtonClick}
          >
            dùng ngay
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountDialog;

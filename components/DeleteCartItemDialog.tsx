import { Dialog, DialogContent, DialogClose, DialogTitle } from "./RadixDialogWrapper";

interface DeleteCartItemDialog {}

const DeleteCartItemDialog = ({ open, onClose, onDeleteClick }) => {
  return (
    <Dialog
      open={open}
      overlayProps={{ className: "fixed inset-0 transition-opacity bg-black opacity-60" }}
    >
      <DialogContent className="fixed flex flex-col transform -translate-x-1/2 -translate-y-1/2 bg-white rounded top-1/2 left-1/2 popup-shadow w-full max-w-[21.875rem]">
        <div className="h-[3.25rem] w-full rounded-t border-b border-altGrey grid place-items-center">
          <DialogTitle className="font-black text-base leading-[1.188rem] italic uppercase">
            {" "}
            xóa bakia?
          </DialogTitle>
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
        <div className="px-5 pt-4 pb-9">
          <p>Xoá Bakia trong giỏ hàng, bạn không thể khôi phục lại Bakia với các item đã chọn.</p>
          <p>Bạn có muốn xoá Bakia?</p>
        </div>
        <div className="flex w-full h-[3.25rem] gap-0.5 ">
          <button
            className="w-full bg-main text-lg italic font-bold leading-[1.438rem] text-center uppercase md:text-xl md:leading-[1.313rem]"
            onClick={onDeleteClick}
          >
            có
          </button>
          <button
            className="w-full bg-main text-lg italic font-bold leading-[1.438rem] text-center uppercase md:text-xl md:leading-[1.313rem]"
            onClick={onClose}
          >
            không
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCartItemDialog;

import { useEffect, useState } from "react";
import { useCustomizeLab } from "./context";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../RadixDialogWrapper";

const AddonDialog = () => {
  const { allProducts, currentCategory, onBackButtonClick, selectedVariants } = useCustomizeLab();
  const baseId = currentCategory?.products[0]?.baseId;
  const products = currentCategory?.products;
  const [open, setOpen] = useState<boolean>(false);
  const [baseCategoryName, setBaseCategoryName] = useState<string | null>(null);

  useEffect(() => {
    if (baseId && products) {
      const isProductsHaveBase = products.some((product) => product.baseId);
      if (isProductsHaveBase) {
        const isBaseSelected = selectedVariants.some(
          (variant) => variant.productId === products[0].baseId
        );
        if (!isBaseSelected) {
          const baseProduct = allProducts.find((product) => product.id === baseId);
          setBaseCategoryName(baseProduct?.category?.name);
          setOpen(true);
        }
      }
    }
  }, [allProducts, baseId, products, selectedVariants]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        onBackButtonClick();
      }}
      overlayProps={{ className: "fixed inset-0 transition-opacity bg-transparent" }}
    >
      <DialogContent className="fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[19.75rem] h-[12.875rem] bg-white popup-shadow flex flex-col justify-between rounded-[0.875rem]">
        <div className="w-full py-[0.875rem] relative border-b">
          <DialogTitle className="mobile-button-txt">item chưa kích hoạt</DialogTitle>
          <DialogClose className="absolute top-[0.625rem] right-[0.625rem]">
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
        <DialogDescription className="p-[0.875rem]">
          {` Bạn hãy chọn ${baseCategoryName} cho Bakia trước khi chọn ${currentCategory?.name} nhé!`}
        </DialogDescription>
        <DialogClose className="w-full h-[2.75rem] bg-main  rounded-b-[0.875rem] mobile-button cursor-pointer">
          OK
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AddonDialog;

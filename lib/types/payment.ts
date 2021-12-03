import { Gender, PaymentMethod, ShippingMethod } from ".prisma/client";
import { getOrder } from "../db";
import { Awaited } from "./common";

enum AreaEnum {
  south = "south",
  north = "north",
  mid = "mid",
}

export const ShippingDetail = {
  FAST: {
    price: 45000,
    days: 2,
    time: "24 - 48 giờ",
  },
  STANDARD: {
    price: 25000,
    days: 4,
    time: "3 - 4 ngày",
  },
};

export const PaymentMethodDetail = {
  bank: "Ngân hàng",
  eWallet: "Ví điện tử",
};

export type ShippingInfo = {
  fullName: string;
  gender: Gender;
  email: string;
  phoneNumber: string;
  area: AreaEnum;
  address: string;
  shippingMethod: ShippingMethod;
  note: string;
};

type PaymentSource = {
  accountNumber: string;
  accountName: string;
  type: PaymentMethod;
};

export type PaymentInfo = {
  agreedTerm: boolean;
  paymentSource: PaymentSource;
};

interface Payment {
  accountHolderName: string;
  accountNumber: string;
  name: string;
  image: {
    url: string;
    blurUpThumb: string;
  };
}

export interface BankAccount extends Payment {
  branch: string;
}

export interface EWallet extends Payment {}

export type PaymentContent = {
  term: any;
  banks: BankAccount[];
  eWallets: EWallet[];
  successMessage: any;
};

export type OrderType = Awaited<ReturnType<typeof getOrder>>;

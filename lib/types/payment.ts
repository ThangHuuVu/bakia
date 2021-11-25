enum GenderEnum {
  female = "female",
  male = "male",
}

enum AreaEnum {
  south = "south",
  north = "north",
  mid = "mid",
}

export enum ShippingMethodEnum {
  standard = "standard",
  fast = "fast",
}

export const ShippingDetail = {
  fast: {
    price: 45000,
    days: 2,
    time: "24 - 48 giờ",
  },
  standard: {
    price: 25000,
    days: 4,
    time: "3 - 4 ngày",
  },
};

export enum PaymentMethodEnum {
  bank = "bank",
  eWallet = "eWallet",
  none = "none",
}

export const PaymentMethodDetail = {
  bank: "Ngân hàng",
  eWallet: "Ví điện tử",
};

export type ShippingInfo = {
  fullName: string;
  gender: GenderEnum;
  email: string;
  phoneNumber: string;
  area: AreaEnum;
  address: string;
  shippingMethod: ShippingMethodEnum;
  note: string;
};

type PaymentSource = {
  accountNumber: string;
  accountName: string;
  type: PaymentMethodEnum;
};

export type PaymentInfo = {
  agreedTerm: boolean;
  paymentSource: PaymentSource;
};

interface PaymentMethod {
  accountHolderName: string;
  accountNumber: string;
  name: string;
  image: {
    url: string;
    blurUpThumb: string;
  };
}

export interface BankAccount extends PaymentMethod {
  branch: string;
}

export interface EWallet extends PaymentMethod {}

export type PaymentContent = {
  term: any;
  banks: BankAccount[];
  eWallets: EWallet[];
};

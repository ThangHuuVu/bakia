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

export enum PaymentMethodEnum {
  bank = "bank",
  eWallet = "eWallet",
  none = "none",
}

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

type Source = {
  accountNumber: string;
  accountName: string;
};

export type PaymentInfo = {
  agreedTerm: boolean;
  source: Source;
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

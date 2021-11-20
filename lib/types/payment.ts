enum GenderEnum {
  female = "female",
  male = "male",
}

enum AreaEnum {
  south = "south",
  north = "north",
  mid = "mid",
}

enum ShippingMethodEnum {
  standard = "standard",
  fast = "fast",
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

export type PaymentInfo = {};

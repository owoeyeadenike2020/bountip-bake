export interface OperatingHours {
  open: string;
  close: string;
  isActive: boolean;
}

export interface StoreData {
  id: string;
  name: string;
  storeCode: string;
  waPhoneNumber: string | null;
  webChannel: boolean;
  address: string;
  waChannel: boolean;
  emailChannel: boolean;
  logoUrl: string;
  customSubDomain: string | null;
  emailAlias: string | null;
  status: string;
  operatingHours: {
    [key: string]: OperatingHours;
  };// eslint-disable-next-line @typescript-eslint/no-explicit-any
  taxSettings: any;// eslint-disable-next-line @typescript-eslint/no-explicit-any
  serviceCharges: any;// eslint-disable-next-line @typescript-eslint/no-explicit-any
  paymentMethods: any;// eslint-disable-next-line @typescript-eslint/no-explicit-any
  priceTier: any;// eslint-disable-next-line @typescript-eslint/no-explicit-any
  receiptSettings: any;// eslint-disable-next-line @typescript-eslint/no-explicit-any
  labelSettings: any;// eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoiceSettings: any;// eslint-disable-next-line @typescript-eslint/no-explicit-any
  generalSettings: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

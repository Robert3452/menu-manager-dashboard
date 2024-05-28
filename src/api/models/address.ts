import { AddressTypes as AddressTypes } from "./enums/AddressType";
import { StreetTypes as StreetTypes } from "./enums/StreetTypes";

export interface Address {
  id: number;
  address: string;
  department: string;
  province: string;
  district: string;
  mapLink?: string;
  streetNumber: string;
  streetType: StreetTypes;
  addressType: AddressTypes;
  phoneNumber: string;
  references: string;
  branchId: number;
}

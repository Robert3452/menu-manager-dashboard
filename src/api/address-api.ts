import { HttpClient } from "./httpClient";
const httpClient = HttpClient(
  `${process.env.NEXT_PUBLIC_MENU_MANAGER}/api/addresses`
);
export enum StreetType {
  avenue = "avenue",
  street = "street",
  jiron = "jiron",
  pasaje = "pasaje",
}
export enum AddressType {
  house = "house",
  work = "work",
}

export interface CreateAddressDto {
  address: string;
  department: string;
  province: string;
  district: string;
  mapLink?: string;
  streetNumber: string;
  streetType: StreetType;
  addressType: AddressType;
  phoneNumber: string;
  references: string;
  branchId: number;
}
export interface UpdateAddressDto extends Partial<CreateAddressDto> {}
class AddressesApi {
  async createAddress(branchId: number, body: CreateAddressDto) {
    const { data } = await httpClient.post(`/${branchId}`, body);
    return data;
  }

  async updateAddress(addressId: number, body: UpdateAddressDto) {
    const { data } = await httpClient.put(`/${addressId}`, body);
    return data;
  }

  async getAddressById(addressId: number) {
    const { data } = await httpClient.get(`/${addressId}`);
    return data;
  }

  async deleteAddress(addressId: number) {
    const { data } = await httpClient.get(`/${addressId}`);
    return data;
  }
}

export const addressesApi = new AddressesApi();

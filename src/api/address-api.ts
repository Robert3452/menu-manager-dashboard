import { HttpClient } from "./httpClient";
import { Address } from "./models/address";
import { IResponse } from "./models/GenericResponse";
const httpClient = HttpClient(
  `${process.env.NEXT_PUBLIC_MENU_MANAGER}/api/addresses`
);

export interface CreateAddressDto extends Address {}
export interface UpdateAddressDto extends Partial<CreateAddressDto> {
  id: number;
}

class AddressesApi {
  async createAddress(
    branchId: number,
    body: CreateAddressDto
  ): Promise<IResponse<Address>> {
    const { data } = await httpClient.post(`/${branchId}`, body);
    return data;
  }

  async updateAddress(
    addressId: number,
    body: UpdateAddressDto
  ): Promise<IResponse<Address>> {
    const { data } = await httpClient.put(`/${addressId}`, body);
    return data;
  }

  async getAddressById(addressId: number): Promise<IResponse<Address>> {
    const { data } = await httpClient.get(`/${addressId}`);
    return data;
  }

  async deleteAddress(addressId: number): Promise<IResponse<Address>> {
    const { data } = await httpClient.get(`/${addressId}`);
    return data;
  }
}

export const addressesApi = new AddressesApi();

import { HttpClient, menuManager } from "./httpClient";
import { Address } from "./models/address";
import { IResponse } from "./models/GenericResponse";
const httpClient = menuManager;

export interface CreateAddressDto extends Address {}
export interface UpdateAddressDto extends Partial<CreateAddressDto> {
  id: number;
}

class AddressesApi {
  async createAddress(body: CreateAddressDto): Promise<IResponse<Address>> {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.post("/addresses", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async updateAddress(
    addressId: number,
    body: UpdateAddressDto
  ): Promise<IResponse<Address>> {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.put(`/addresses/${addressId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async getAddressById(addressId: number): Promise<IResponse<Address>> {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.get(`/addresses/${addressId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async deleteAddress(addressId: number): Promise<IResponse<Address>> {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.get(`/addresses/${addressId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}

export const addressesApi = new AddressesApi();

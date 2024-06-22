import { HttpClient } from "./httpClient";
import { IResponse } from "./models/GenericResponse";
import { Store } from "./models/store";
const httpClient = HttpClient(
  `${process.env.NEXT_PUBLIC_MENU_MANAGER}/api/stores`
);
export interface CreateStoreDto {
  name: string;
  file: Blob;
}
export interface UpdateStoreDto extends Partial<CreateStoreDto> {}

class StoresApi {
  async getStores(): Promise<IResponse<Store[]>> {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.get<IResponse<Store[]>>("", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async getStorebyId(storeId: number): Promise<IResponse<Store>> {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.get<IResponse<Store>>(`${storeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
  async updateStore(
    storeId: number,
    updateStore: UpdateStoreDto
  ): Promise<IResponse<Store>> {
    const { name, file } = updateStore;
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (file) formData.append("file", file);
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.put<IResponse<Store>>(
      `/${storeId}`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }

  async deleteStore(storeId: number): Promise<IResponse<Store>> {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.delete<IResponse<Store>>(`/${storeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
  async createStore(newStore: CreateStoreDto): Promise<IResponse<Store>> {
    const { name, file } = newStore;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.post<IResponse<Store>>("", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}
export const storeApi = new StoresApi();

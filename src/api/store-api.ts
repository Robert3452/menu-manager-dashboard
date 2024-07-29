import { menuManager } from "./httpClient";
import { IResponse } from "./models/GenericResponse";
import { Store } from "./models/store";
const httpClient = menuManager;
export interface CreateStoreDto {
  name: string;
  file: Blob;
}

export interface CreateStoreAndBranchDto extends CreateStoreDto {
  branchName: string;
}
export interface UpdateStoreDto extends Partial<CreateStoreDto> {}
class StoresApi {
  async getStores(): Promise<IResponse<Store[]>> {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.get<IResponse<Store[]>>("/stores", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async getStoreByOwner() {
    try {
      const token = window.localStorage.getItem("accessToken");
      const { data } = await httpClient.get("/stores/my-store", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      return null;
    }
  }

  async getStorebyId(storeId: number): Promise<IResponse<Store>> {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.get<IResponse<Store>>(
      `/stores/${storeId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
      `/stores/${storeId}`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }

  async deleteStore(storeId: number): Promise<IResponse<Store>> {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.delete<IResponse<Store>>(
      `/stores/${storeId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  }
  async createStore(
    newStore: CreateStoreAndBranchDto
  ): Promise<IResponse<Store>> {
    const { name, file, branchName } = newStore;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("branchName", branchName);
    formData.append("file", file);
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.post<IResponse<Store>>(
      "/stores",
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  }
}
export const storeApi = new StoresApi();

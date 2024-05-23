import { Store } from "@mui/icons-material";
import { HttpClient } from "./httpClient";
import { format } from "date-fns";
const httpClient = HttpClient(
  `${process.env.NEXT_PUBLIC_MENU_MANAGER}/api/stores`
);
export interface CreateStoreDto {
  name: string;
  file: Blob;
}

export interface UpdateStoreDto extends Partial<CreateStoreDto> {}
class StoresApi {
  async getStores() {
    const {
      data: { data },
    } = await httpClient.get("");
    return data;
  }

  async getStorebyId(storeId: number) {
    const {
      data: { data },
    } = await httpClient.get(`${storeId}`);
    return data;
  }
  async updateStore(storeId: number, updateStore: UpdateStoreDto) {
    const { name, file } = updateStore;
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (file) formData.append("file", file);
    const { data } = await httpClient.put(`/${storeId}`, formData);
    console.log(data);
    return data;
  }

  async deleteStore(storeId: number) {
    const { data } = await httpClient.delete(`/${storeId}`);
    return data;
  }
  async createStore(newStore: CreateStoreDto) {
    const { name, file } = newStore;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    const { data } = await httpClient.post("", formData);
    console.log(data);
    return data;
  }
}
export const storeApi = new StoresApi();

import { menuManager } from "./httpClient";
import { IResponse } from "./models/GenericResponse";
import { ILandingPage } from "./models/landingPage";
import { Store } from "./models/store";
const httpClient = menuManager;
export interface CreateStoreDto {
  name: string;
  file: Blob;
}

export interface UpdateLandingPageDto extends Partial<ILandingPage> {}

export interface CreateStoreAndBranchDto extends CreateStoreDto {
  branchName: string;
}
const parseToFormData = (
  obj: any,
  formData = new FormData(),
  parentKey = ""
): FormData => {
  try {
    Object.entries(obj).forEach(([key, value]) => {
      const formKey = parentKey ? `${parentKey}[${key}]` : key;
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === "object" && item !== null) {
            parseToFormData(item, formData, `${formKey}[${index}]`);
          } else {
            formData.append(`${formKey}[${index}]`, item as any);
          }
        });
      } else if (
        typeof value === "object" &&
        !(value instanceof File) &&
        value !== null
      ) {
        parseToFormData(value, formData, formKey);
      } else if (value !== undefined && value !== null) {
        formData.append(formKey, value as any);
      }
    });
    return formData;
  } catch (error) {
    throw error;
  }
};

export interface UpdateStoreDto extends Partial<CreateStoreDto> {}
class StoresApi {
  async getLandingPageStore(storeId: number): Promise<IResponse<ILandingPage>> {
    const token = window.localStorage.getItem("accessToken");
    const { data } = await httpClient.get<IResponse<ILandingPage>>(
      `/stores/${storeId}/landing-page`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  }
  async upsertLandingPage(
    storeId: number,
    updateLandingPageDto: UpdateLandingPageDto
  ): Promise<IResponse<ILandingPage>> {
    const token = window.localStorage.getItem("accessToken");
    const formData = parseToFormData(updateLandingPageDto);
    const { data } = await httpClient.put<IResponse<ILandingPage>>(
      `/stores/${storeId}/landing-page`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  }
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
    const formData = parseToFormData(updateStore);

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
    const formData = parseToFormData(newStore);
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

import { menuManager } from "./httpClient";

export interface CreateBranchDto {
  branchName: string;
  storeId: number;
}

export interface UpdateBranchDto extends Partial<CreateBranchDto> {
  id: number;
}

const httpClient = menuManager;
class BranchesApi {
  async createBranch(body: CreateBranchDto) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.post(`/branches`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async deleteBranch(branchId: number) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.delete(`/branches/${branchId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async updateBranch(branchId: number, body: UpdateBranchDto) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.put(`/branches/${branchId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
  async getBranchById(branchId: number) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.get(`/branches/${branchId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}

export const branchesApi = new BranchesApi();

import { HttpClient } from "./httpClient";

export interface CreateBranchDto {
  branchName: string;
  storeId: number;
}

export interface UpdateBranchDto extends Partial<CreateBranchDto> {
  id: number;
}

const httpClient = HttpClient(
  `${process.env.NEXT_PUBLIC_MENU_MANAGER}/api/branches`
);
class BranchesApi {
  async createBranch(body: CreateBranchDto) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.post(``, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async deleteBranch(branchId: number) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.delete(`/${branchId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async updateBranch(branchId: number, body: UpdateBranchDto) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.put(`/${branchId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
  async getBranchById(branchId: number) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await httpClient.get(`/${branchId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}

export const branchesApi = new BranchesApi();

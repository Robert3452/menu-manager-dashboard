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
    const { data } = await httpClient.post(``, body);
    return data;
  }

  async deleteBranch(branchId: number) {
    const { data } = await httpClient.delete(`/${branchId}`);
    return data;
  }

  async updateBranch(branchId: number, body: UpdateBranchDto) {
    const { data } = await httpClient.put(`/${branchId}`, body);
    return data;
  }
  async getBranchById(branchId: number) {
    const { data } = await httpClient.get(`/${branchId}`);
    return data;
  }
}

export const branchesApi = new BranchesApi();

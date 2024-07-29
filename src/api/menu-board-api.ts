import { HttpClient, menuManager } from "./httpClient";
import { Branch } from "./models/branch";
import { Corridor } from "./models/corridor";
import { IResponse } from "./models/GenericResponse";
import { Product } from "./models/product";
const client = menuManager;

export interface CreateCorridorDto extends Omit<Corridor, "id" | "products"> {
  id?: number;
  products?: Product[];
}

export interface UpdateCorridorDto extends Partial<CreateCorridorDto> {
  id?: number;
}

export interface MoveCardDto {
  productId: number;
  index: number;
  corridorId?: number;
  branchId: number;
}
class BranchesMenuApi {
  async getBoard(branchId: number): Promise<IResponse<Branch>> {
    const token = window.localStorage.getItem("accessToken");
    const { data } = await client.get(`/branches/${branchId}/menu`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async createCorridorRow(
    body: CreateCorridorDto
  ): Promise<IResponse<Corridor>> {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await client.post(`/corridors`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async moveCard({
    productId,
    index,
    corridorId,
    branchId,
  }: any): Promise<IResponse<Product>> {
    const token = window.localStorage.getItem("accessToken");

    // const { branchId, index, productId, corridorId } = body;
    const { data } = await client.put(
      `/products/move-card`,
      {
        branchId,
        index,
        id: productId,
        corridorId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }

  async updateCorridorRow({
    corridorId,
    body,
  }: {
    corridorId: number;
    body: UpdateCorridorDto;
  }) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await client.put(`/corridors/${corridorId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async deleteCorridorRow({ corridorId }: { corridorId: number }) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await client.delete(`/corridors/${corridorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
  async clearCorridorRow({ corridorId }: { corridorId: number }) {
    const token = window.localStorage.getItem("accessToken");

    const { data } = await client.put(
      `/corridors/${corridorId}/clear-corridor`,
      null,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }
}

export const branchesMenuApi = new BranchesMenuApi();

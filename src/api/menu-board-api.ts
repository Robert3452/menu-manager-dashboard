import { HttpClient } from "./httpClient";
import { Branch } from "./models/branch";
import { Corridor } from "./models/corridor";
import { IResponse } from "./models/GenericResponse";
import { Product } from "./models/product";
const client = HttpClient(`${process.env.NEXT_PUBLIC_MENU_MANAGER}/api`);

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
    const { data } = await client.get(`/branches/${branchId}/menu`);
    return data;
  }

  async createCorridorRow(
    body: CreateCorridorDto
  ): Promise<IResponse<Corridor>> {
    const { data } = await client.post(`/corridors`, body);
    return data;
  }

  async moveCard({ productId, index, corridorId, branchId }:any): Promise<IResponse<Product>> {
    // const { branchId, index, productId, corridorId } = body;
    const { data } = await client.put(`/products/move-card`,  {
      branchId,
      index,
      id: productId,
      corridorId,
    });
    return data;
  }

  async updateCorridorRow({
    corridorId,
    body,
  }: {
    corridorId: number;
    body: UpdateCorridorDto;
  }) {
    const { data } = await client.put(`/corridors/${corridorId}`, body);
    return data;
  }

  async deleteCorridorRow({ corridorId }: { corridorId: number }) {
    const { data } = await client.delete(`/corridors/${corridorId}`);
    return data;
  }
  async clearCorridorRow({ corridorId }: { corridorId: number }) {
    const { data } = await client.put(
      `/corridors/${corridorId}/clear-corridor`
    );
    return data;
  }
}

export const branchesMenuApi = new BranchesMenuApi();

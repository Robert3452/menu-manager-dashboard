import { HttpClient } from "./httpClient";
const client = HttpClient(`${process.env.NEXT_PUBLIC_MENU_MANAGER}/api`);

export interface CreateCorridorDto {
  name: string;
  description: string;
  index: number;
  branchesIds: number[];
}

export interface UpdateCorridorDto extends Partial<CreateCorridorDto> {}

export interface MoveCardDto {
  productId: number;
  index: number;
  corridorId: number;
  branchId: number;
}
class BranchesMenuApi {
  async getBoard(branchId: number) {
    const { data } = await client.get(`/branches/${branchId}/menu`);
    return data;
  }

  async createCorridorRow(body: CreateCorridorDto) {
    const { data } = await client.post(`/corridors`, body);
    return data;
  }

  async moveCard(body: MoveCardDto) {
    const { branchId, index, productId, corridorId } = body;
    const { data } = await client.put(`/products/move-card`, {
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

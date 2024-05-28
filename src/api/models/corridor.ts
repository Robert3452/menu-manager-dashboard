import { Branch } from "./branch";
import { Product } from "./product";

export interface Corridor {
  id: number;
  name: string;
  description: string;
  index: number;
  branches?: Branch[];
  products: Product[];
}

export interface CorridorState extends Corridor {
  cardIds: number[];
}

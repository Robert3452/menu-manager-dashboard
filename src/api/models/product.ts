import { Corridor } from "./corridor";
import { ToppingsCategory } from "./toppingsCategory";

export interface Product{
  id?: number;

  name: string;

  content: string;

  image: string;

  index: number;

  realPrice: number;
  corridor?: Corridor;
  corridorId?: number;

  toppingCategories?: ToppingsCategory[];
}
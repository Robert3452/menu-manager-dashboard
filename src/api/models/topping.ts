import { ToppingsCategory } from "./toppingsCategory";

export interface Topping{
  id: number;
  available: boolean;
  title: string;
  price: number;
  maxLimit: number;
  index: number;
  required: boolean;
  toppingsCategory: ToppingsCategory;
  toppingCategoryId: number;
}
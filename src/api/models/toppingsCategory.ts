import { ToppingType } from "../product-api";
import { Product } from "./product";
import { Topping } from "./topping";

export interface ToppingsCategory {
  id: number;
  title: string;
  mandatory: boolean;
  minToppingsForCategory: number;
  maxToppingsForCategory: number;
  toppingType: ToppingType;
  index: number;
  product?: Product;
  productId: number;
  toppings: Topping[];
}

export interface ToppingsCategoryProps extends ToppingsCategory {
  remove: boolean;
  key?: string;
}

import { Branch } from "./branch";

export interface Store {
  id: number;

  name: string;

  logo: string;

  branches?: Branch[];
}

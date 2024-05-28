import { Address } from "./address";
import { Corridor } from "./corridor";
import { Schedule } from "./schedule";

export interface Branch {
  id: number;
  branchName: string; 
  storeId: number;
  corridors: Corridor[];
  address: Address;
  schedule: Schedule;
}

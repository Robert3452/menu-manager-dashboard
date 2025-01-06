import { Branch } from "./branch";
import { ILandingPage } from "./landingPage";

export interface Store {
  id: number;

  name: string;

  logo: string;

  branches?: Branch[];

  landingPages?: ILandingPage[];
}

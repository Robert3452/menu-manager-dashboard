import { Role } from "./role";

export interface JwtResponse {
  message: string;
  expirationTime: number;
  accessToken: string;
}

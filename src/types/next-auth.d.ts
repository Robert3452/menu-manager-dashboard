import "next-auth";
import "next-auth/middleware";
import { NextRequestWithAuth as OldReq } from "next-auth/middleware";

interface GlobalUserSession {
  email: string;
  accessToken: string;
  expirationTime: number;
  keepAlive: string;
  error?: string;
  firstName: string;
  lastName: string;
  roleId: number;
  role: { id: number; name: string };
  image: string;
  name?: string;
  provider?: string;
}
declare module "next-auth" {
  interface UserSession extends GlobalUserSession {}
  // interface JWT extends UserSession {}
  interface AdapterUser extends UserSession {}
  interface User extends UserSession {}
  interface Session {
    user: UserSession;
    error?: any;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends GlobalUserSession {}
}

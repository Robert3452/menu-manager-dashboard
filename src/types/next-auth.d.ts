import "next-auth";
declare module "next-auth" {
  interface UserSession {
    email: string;
    accessToken: string;
    firstName: string;
    lastname: string;
    roleId: number;
    image: string;
    name?: string;
    provider?: string;
  }
  interface AdapterUser extends UserSession {}
  interface User extends UserSession {}
  interface Session {
    user: UserSession;
    error?: any;
  }
}

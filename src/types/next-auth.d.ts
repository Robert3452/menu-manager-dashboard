import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      accessToken: string;
      firstName: string;
      lastname: string;
      roleId: number;
    };
  }
}

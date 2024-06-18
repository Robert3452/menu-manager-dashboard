import { authApi } from "@/api/auth/auth-api";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// const handler =
const options: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // Agrega esta línea,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const { accessToken } = await authApi.login({
            email: credentials?.username || "",
            password: credentials?.password || "",
            });
          const user: any = await authApi.me(accessToken);

          if (user) return { ...user, accessToken };
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/authentication/login",
  },
};
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (req?.query?.nextauth?.includes("callback") && req.method === "POST") {
    // console.log(
    //   "Handling callback request from my Identity Provider",
    //   req.body
    // );
  }
  // const isDefaultSigninPage =
  //   req.method === "GET" && req?.query?.nextauth?.includes("login");
  return await NextAuth(req, res, options);
}
// export { handler as GET, handler as POST };

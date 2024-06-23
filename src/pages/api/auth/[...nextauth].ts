import { authApi } from "@/api/auth/auth-api";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
const options: AuthOptions = {
  session: {
    maxAge: 60 * 60,
  },
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
    async jwt({ token, user, trigger, session, account }) {
      try {
        if (account?.provider === "google") {
          const googleLoginResponse = await authApi.loginGoogle(
            user.email || ""
          );
          user.accessToken = googleLoginResponse.accessToken;
        }

        if (trigger === "update") {
          return { ...token, ...session.user };
        }
        return { ...token, ...user };
      } catch (error: any) {
        if (error instanceof AxiosError) {
          console.log(error.response);
          throw new Error(error.response?.data.message);
        } else throw new Error(error);
      }
    },

    async signIn({ user }) {
      try {
        if (!user) {
          return false;
        }
        await authApi.verifyEmail(user.email || "");
        return true;
      } catch (error: any) {
        return false;
      }
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/authentication/login",
    error: "/authentication/register",
  },
};
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (req?.query?.nextauth?.includes("callback") && req.method === "POST") {
  }

  // const isDefaultSigninPage =
  //   req.method === "GET" && req?.query?.nextauth?.includes("login");
  return await NextAuth(req, res, options);
}

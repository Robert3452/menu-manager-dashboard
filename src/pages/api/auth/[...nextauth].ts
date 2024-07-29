import { authApi } from "@/api/auth/auth-api";
import { JwtResponse } from "@/api/models/auth/payloadToken";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
type AuthIntent = "signin" | "signup";
const getAuthOptions = (intent: string) =>
  ({
    session: {
      maxAge: 60 * 60, // 1m
    },
    secret: process.env.NEXTAUTH_SECRET,
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
          keepAlive: { label: "KeepAlive", type: "text" },
        },

        async authorize(credentials) {
          try {
            const { accessToken, expirationTime } = await authApi.login({
              email: credentials?.username || "",
              password: credentials?.password || "",
            });
            const user: any = await authApi.me(accessToken);
            console.log(credentials?.keepAlive);
            if (user)
              return {
                ...user,
                accessToken,
                expirationTime,
                keepAlive: credentials?.keepAlive,
              };
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
          if (token?.expirationTime) {
            let tokend = token as any;
            // GET NOW DATE
            const now = new Date();
            // GET EXPIRATION DATE
            const expirationDate = new Date(tokend.expirationTime);
            if (expirationDate < now) {
              // console.log("token", token);
              if (token?.keepAlive !== "true") {
                console.log(token?.keepAlive);
                return { ...token, error: "Token expired" };
              }
              if (token?.keepAlive === "true") {
                const response = await authApi.refreshToken(
                  `${token?.accessToken}`
                );
                token.expirationTime = response.expirationTime;
                token.accessToken = response.accessToken;
              }
            }
          }
          if (account?.provider === "google") {
            let signedBygoogle: JwtResponse;
            if (intent === "signin") {
              signedBygoogle = await authApi.loginGoogle(user.email || "");
            } else {
              signedBygoogle = await authApi.signupGoogle({
                email: token?.email || "",
                firstName: token.name || "",
              });
            }
            user.accessToken = signedBygoogle.accessToken;
            user.expirationTime = signedBygoogle.expirationTime;
          }

          if (trigger === "update") {
            return { ...token, ...session.user };
          }
          return { ...token, ...user };
        } catch (error: any) {
          if (error instanceof AxiosError) {
            console.log(error.response);
            return { ...token, error: error.response?.data.message };
          } else throw new Error(error);
        }
      },

      async signIn({ user, account }) {
        try {
          if (!user) {
            return false;
          }
          if (account?.provider === "google" && intent === "signin")
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
      newUser: "/authentication/register",
      error: "/authentication/register",
    },
  } as AuthOptions);
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (req?.query?.nextauth?.includes("callback") && req.method === "POST") {
  }
  const cookieStore = req.cookies;
  const authIntent: string | undefined = cookieStore?.["auth-intent"];
  const intent = (authIntent ?? "signin") as AuthIntent;
  return await NextAuth(req, res, getAuthOptions(intent));
}

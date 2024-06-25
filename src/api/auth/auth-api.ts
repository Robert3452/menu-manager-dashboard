import { I } from "@/utils/generalObj";
import { HttpClient } from "../httpClient";
import { User } from "../models/auth/user";
import { JwtResponse } from "../models/auth/payloadToken";
import { httpServices } from "@/config";

const httpClient = HttpClient(`${process.env.NEXT_PUBLIC_AUTH_MANAGER}`);
export interface LoginDto {
  email: string;
  password: string;
}
export interface CreateUserDto {
  email: string;
  firstName: string;
  lastname: string;
  password: string;
  roleId: number;
  repeatPassword: string;
}

export interface CreateGoogleUserDto {
  email: string;
  firstName: string;
  roleId: number;
}

class AuthApi {
  async login({ email, password }: LoginDto): Promise<JwtResponse> {
    const { data } = await httpClient.post("/auth/login", {
      email,
      password,
    });
    return data;
  }
  async loginGoogle(email: string): Promise<JwtResponse> {
    const secretKey = httpServices.apiKey;
    // TODO: add a secret api key guard client :D
    const { data } = await httpClient.post(
      "/auth/login/google",
      {
        email,
      },
      { headers: { auth: secretKey } }
    );
    return data;
  }
  async signupGoogle(body: CreateGoogleUserDto): Promise<JwtResponse> {
    const secretKey = httpServices.apiKey;
    const { data } = await httpClient.post("/users/google/signup", body, {
      headers: { auth: secretKey },
    });
    return data;
  }
  async verifyEmail(
    email: string
  ): Promise<{ message: string; status: boolean }> {
    // TODO: add a secret api key guard client :D
    const secretKey = httpServices.apiKey;
    const { data } = await httpClient.post(
      "/auth/verify/email",
      { email },
      { headers: { auth: secretKey } }
    );
    return data;
  }
  async registerByGoogle(body: CreateGoogleUserDto): Promise<User> {
    const { data } = await httpClient.post("users/google/signup", body);
    return data;
  }
  async register(body: CreateUserDto): Promise<User> {
    const { data } = await httpClient.post("/users/signup", body);
    return data;
  }

  async me(accessToken: string): Promise<User> {
    const { data: user } = await httpClient.get("/auth/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (user) delete user.password;
    return user;
  }
}

export const authApi = new AuthApi();

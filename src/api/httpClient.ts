import axios from "axios";

export const HttpClient = (url: string) =>
  axios.create({
    timeout: 25000,
    baseURL: url,
    headers: { "Access-Control-Origin": "*" },
  });

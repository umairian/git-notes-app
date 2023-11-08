import { axiosInstance } from "./config";
import { QueryFunctionContext } from "@tanstack/react-query";

export function getPublicGistsApi({ queryKey: [,] }: QueryFunctionContext) {
  return axiosInstance.get("/gists/public");
}

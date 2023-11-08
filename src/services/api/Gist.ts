import { PublicGistsQueryKey } from "../../types/Gist.t";
import { axiosInstance } from "./config";
import { QueryFunctionContext } from "@tanstack/react-query";

export function getPublicGistsApi({
  queryKey: [, { page, limit }],
}: QueryFunctionContext<PublicGistsQueryKey>) {
  return axiosInstance.get(`/gists/public?page=${page}&per_page=${limit}`);
}

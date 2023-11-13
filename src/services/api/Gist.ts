import config from "../../config";
import {
  PublicGistsQueryKey,
  PublicSingleGistQueryKey,
} from "../../types/Gist.t";
import { axiosInstance } from "./config";
import { QueryFunctionContext } from "@tanstack/react-query";

export function getPublicGistsApi({
  queryKey: [, { page, limit }],
}: QueryFunctionContext<PublicGistsQueryKey>) {
  return axiosInstance.get(`/gists/public?page=${page}&per_page=${limit}`);
}

export function getSinglePublicGistApi({
  queryKey: [, { gistId }],
}: QueryFunctionContext<PublicSingleGistQueryKey>) {
  return axiosInstance.get(`/gists/${gistId}`, {
    headers: {
      Authorization: `Bearer ${config.GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
  });
}

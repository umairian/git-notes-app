import config from "../../config";
import {
  PublicGistsQueryKey,
  PublicSingleGistQueryKey,
  UserGistsQueryKey,
} from "../../types/Gist.t";
import { axiosInstance } from "./config";
import { QueryFunctionContext } from "@tanstack/react-query";

export function getPublicGistsApi({
  queryKey: [, { page, limit }],
}: QueryFunctionContext<PublicGistsQueryKey>) {
  return axiosInstance.get(`/gists/public?page=${page}&per_page=${limit}`);
}

export function getSinglePublicGistApi({
  queryKey: [, { gistId, accessToken }],
}: QueryFunctionContext<PublicSingleGistQueryKey>) {
  console.log(config.GITHUB_PERSONAL_ACCESS_TOKEN)
  return axiosInstance.get(`/gists/${gistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken ? accessToken : config.GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
  });
}

export function getUserGistsApi({
  queryKey: [, { accessToken }],
}: QueryFunctionContext<UserGistsQueryKey>) {
  return axiosInstance.get(`/gists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

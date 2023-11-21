import config from "../../config";
import {
  CreateGistQueryKey,
  PublicGistsQueryKey,
  PublicSingleGistQueryKey,
  StarGistQueryKey,
  UpdateGistQueryKey,
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
  return axiosInstance.get(`/gists/${gistId}`, {
    headers: {
      Authorization: `Bearer ${
        accessToken ? accessToken : config.GITHUB_PERSONAL_ACCESS_TOKEN
      }`,
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

export function createGistApi({ accessToken, body }: CreateGistQueryKey) {
  return axiosInstance.post(`/gists`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function getGistStarApi({
  queryKey: [, { accessToken, gistId }],
}: QueryFunctionContext<PublicSingleGistQueryKey>) {
  return axiosInstance.get(`/gists/${gistId}/star`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function starGistApi({ accessToken, gistId }: StarGistQueryKey) {
  return axiosInstance.put(
    `/gists/${gistId}/star`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export function unStarGistApi({ accessToken, gistId }: StarGistQueryKey) {
  return axiosInstance.delete(`/gists/${gistId}/star`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function forkGistApi({ accessToken, gistId }: StarGistQueryKey) {
  return axiosInstance.post(
    `/gists/${gistId}/forks`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export function getGistForksApi({
  queryKey: [, { accessToken, gistId }],
}: QueryFunctionContext<PublicSingleGistQueryKey>) {
  return axiosInstance.get(`/gists/${gistId}/forks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function deleteGistApi({ accessToken, gistId }: StarGistQueryKey) {
  return axiosInstance.delete(`/gists/${gistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function updateGistApi({
  accessToken,
  gistId,
  body,
}: UpdateGistQueryKey) {
  return axiosInstance.patch(`/gists/${gistId}`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

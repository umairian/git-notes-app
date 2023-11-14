"use client";

import axios from "axios";
import config from "../../config";

export const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
});

axiosInstance.interceptors.request.use(function (config) {
  config.headers["Content-Type"] = "application/json";
  config.headers["X-GitHub-Api-Version"] = "2022-11-28";
  config.headers["Accept"] = "application/vnd.github+json";
  return config;
});

export const customBackendAxiosInstance = axios.create({
  baseURL: config.CUSTOM_BACKEND_URL,
});

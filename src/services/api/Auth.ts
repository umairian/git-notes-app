import { customBackendAxiosInstance } from "./config";

export function loginApi({ code }: { code: string }) {
  return customBackendAxiosInstance.post(`/auth/login`, { code });
}

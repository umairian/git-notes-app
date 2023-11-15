import { AuthStateI, GitHubUserI } from "../../types/Store.t";
import { PayloadAction } from "@reduxjs/toolkit";

export default {
  login: (
    state: AuthStateI,
    action: PayloadAction<{ accessToken: string; user: GitHubUserI }>
  ) => {
    return {
      isLoggedIn: true,
      accessToken: action.payload.accessToken,
      user: action.payload.user,
    };
  },
  logout: () => {
    return { isLoggedIn: false, accessToken: null, user: null };
  },
};

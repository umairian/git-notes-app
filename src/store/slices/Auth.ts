import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducers/Auth";
import { AuthStateI } from "../../types/Store.t";

const initialState: AuthStateI = {
    isLoggedIn: false,
    accessToken: null,
    user: null,
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: reducers,
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
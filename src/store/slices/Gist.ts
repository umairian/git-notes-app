import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducers/Gist";
import { GistStateI } from "../../types/Store.t";

const initialState: GistStateI = {
  initialGists: [],
  currentGists: [],
};

const GistSlice = createSlice({
  name: "gists",
  initialState,
  reducers: reducers,
});

export const { saveGists, updateGists } = GistSlice.actions;

export default GistSlice.reducer;

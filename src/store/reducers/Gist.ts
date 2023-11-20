import { PublicGistsResObjI } from "../../types/Gist.t";
import { GistStateI } from "../../types/Store.t";
import { PayloadAction } from "@reduxjs/toolkit";

export default {
  saveGists: (
    state: GistStateI,
    action: PayloadAction<{ gists: PublicGistsResObjI[] }>
  ) => {
    return {
      initialGists: action.payload.gists,
      currentGists: action.payload.gists,
    };
  },
  updateGists: (
    state: GistStateI,
    action: PayloadAction<{ gists: PublicGistsResObjI[] }>
  ) => {
    return {
      initialGists: state.initialGists,
      currentGists: action.payload.gists,
    };
  },
};

import { Grid } from "@mui/material";
import { PublicGistsResObjI } from "../../types/Gist.t";
import GistCard from "../Cards/GistCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function GridViewContent() {
  // Store
  const { currentGists: gists } = useSelector(
    (state: RootState) => state.gists
  );
  return gists ? (
    <Grid container spacing={4}>
      {gists.map((gist: PublicGistsResObjI) => (
        <Grid item md={4} key={gist.id + Math.random()}>
          <GistCard gist={gist} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <div>No data found</div>
  );
}

import { Box, CircularProgress, Grid } from "@mui/material";
import GistCard from "../Cards/GistCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicGistsApi } from "../../services/api/Gist";
import { PRIMARY_COLOR } from "../../constants/theme";
import { PublicGistsResObjI } from "../../types/Gist.t";

export default function GridView() {
  // State Variables
  const [gists, setGists] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["publicGists", { page, limit }],
    queryFn: getPublicGistsApi,
  });

  useEffect(() => {
    refetch();
  }, [limit, page]);

  useEffect(() => {
    if (data) {
      setGists(data.data);
    }
  }, [data, error]);
  return (
    <Box>
      {isLoading ? (
        <CircularProgress
          size={"1.5em"}
          style={{ marginTop: "5px", color: PRIMARY_COLOR }}
        />
      ) : (
        <Grid container spacing={2}>
          {gists.map((gist: PublicGistsResObjI) => (
            <Grid item md={4}>
              <GistCard gist={gist} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

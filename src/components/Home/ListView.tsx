import { Box } from "@mui/material";
import DataTable from "../DataTable/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getPublicGistsApi } from "../../services/api/Gist";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveGists } from "../../store/slices/Gist";
import { RootState } from "../../store";

export default function ListView() {
  // Configuration variables
  const dispatch = useDispatch();

  // Store
  const { currentGists: gists } = useSelector(
    (state: RootState) => state.gists
  );
  console.log("here", gists)

  // State Variables
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
      dispatch(saveGists({ gists: data.data }));
    }
  }, [data, error]);

  return (
    <Box>
      {gists && <DataTable
        isLoading={isLoading}
        data={gists}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
      />}
    </Box>
  );
}

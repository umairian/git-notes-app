import { Box, CircularProgress, Grid } from "@mui/material";
import GistCard from "../Cards/GistCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicGistsApi } from "../../services/api/Gist";
import { PRIMARY_COLOR } from "../../constants/theme";
import { PublicGistsResObjI } from "../../types/Gist.t";

export default function GridView() {
  const targetRef = useRef(null);

  // State Variables
  const [gists, setGists] = useState<PublicGistsResObjI[]>([]);
  const [page, setPage] = useState(1);

  const { isInitialLoading, data, error, refetch, } = useQuery({
    queryKey: ["publicGists", { page, limit: 20 }],
    queryFn: getPublicGistsApi,
  });

  useEffect(() => {
    if (data) {
      setGists((currentData) => [...currentData, ...data.data]);
    }
  }, [data, error]);

  useEffect(() => {
    console.log(page)
    refetch();
  }, [page]);

  const handleIntersection: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isInitialLoading) {
        setPage((currentPage) => currentPage + 1);
      }
    },
    [isInitialLoading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1.0,
    });
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  return (
    <Box>
      {isInitialLoading && !gists ? (
        <CircularProgress
          size={"1.5em"}
          style={{ marginTop: "5px", color: PRIMARY_COLOR }}
        />
      ) : (
        <Grid container spacing={4}>
          {gists.map((gist: PublicGistsResObjI) => (
            <Grid item md={4} key={gist.id + Math.random()}>
              <GistCard gist={gist} />
            </Grid>
          ))}
        </Grid>
      )}
      <div ref={targetRef} style={{ height: 10, width: 10 }}></div>
    </Box>
  );
}

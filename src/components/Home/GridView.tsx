import { Box, Grid } from "@mui/material";
import GistCard from "../Cards/GistCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicGistsApi } from "../../services/api/Gist";
import { PublicGistsResObjI } from "../../types/Gist.t";
import GistCardSkeleton from "../Skeletons/GistCardSkeleton";

export default function GridView() {
  const targetRef = useRef(null);

  // State Variables
  const [gists, setGists] = useState<PublicGistsResObjI[]>([]);
  const [page, setPage] = useState(1);

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["publicGists", { page, limit: 20 }],
    queryFn: getPublicGistsApi,
  });

  useEffect(() => {
    if (data) {
      setGists((currentData) => [...currentData, ...data.data]);
    }
  }, [data, error]);

  useEffect(() => {
    console.log(page);
    refetch();
  }, [page]);

  const handleIntersection: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        setPage((currentPage) => currentPage + 1);
      }
    },
    [isLoading]
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
      {isLoading && !gists.length ? (
        <Grid container spacing={4}>
          {Array.from({ length: 10}).map((val, index) => <Grid item md={4} key={index}>
            <GistCardSkeleton />
          </Grid>)}
        </Grid>
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

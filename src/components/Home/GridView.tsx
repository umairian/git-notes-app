import { Box, Grid } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicGistsApi } from "../../services/api/Gist";
import GistCardSkeleton from "../Skeletons/GistCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { saveGists } from "../../store/slices/Gist";
import { RootState } from "../../store";
import GridViewContent from "./GridViewContent";

export default function GridView() {
  // Configuration Variables
  const targetRef = useRef(null);
  const dispatch = useDispatch();

  // Store
  const { initialGists: gists, currentGists } = useSelector(
    (state: RootState) => state.gists
  );

  // State Variables
  const [page, setPage] = useState(1);

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["publicGists", { page, limit: 20 }],
    queryFn: getPublicGistsApi,
  });

  useEffect(() => {
    if (data) {
      const requiredData = [...gists, ...data.data];
      dispatch(saveGists({ gists: requiredData }));
    }
  }, [data, error]);

  useEffect(() => {
    console.log(page);
    refetch();
  }, [page]);

  const handleIntersection: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];
      console.log('checking', currentGists.length, gists.length)
      if (target.isIntersecting && !isLoading && currentGists.length === gists.length) {
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
      {isLoading && gists.length === 0  ? (
        <Grid container spacing={4}>
          {Array.from({ length: 10 }).map((val, index) => (
            <Grid item md={4} key={index}>
              <GistCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : (
        <GridViewContent />
      )}
      <div ref={targetRef} style={{ height: 20, width: "100%" }}></div>
    </Box>
  );
}

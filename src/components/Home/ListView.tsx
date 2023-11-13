import { Box, } from '@mui/material';
import DataTable from '../DataTable/DataTable';
import { useQuery } from '@tanstack/react-query';
import { getPublicGistsApi } from '../../services/api/Gist';
import { useEffect, useState } from 'react';

export default function ListView() {

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
  }, [limit, page])

  useEffect(() => {
    if(data) {
      setGists(data.data)
    }
  }, [data, error])

  return (
    <Box>
        <DataTable isLoading={isLoading} data={gists} limit={limit} page={page} setPage={setPage} setLimit={setLimit} />
    </Box>
  );
}
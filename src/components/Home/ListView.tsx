import { Box, } from '@mui/material';
import DataTable from '../DataTable/DataTable';
import { useQuery } from '@tanstack/react-query';
import { getPublicGistsApi } from '../../services/api/Gist';
import { useEffect, useState } from 'react';

export default function ListView() {

  // State Variables
  const [gists, setGists] = useState([]);

  const { isLoading, data, error } = useQuery({
    queryKey: ["publicGists"],
    queryFn: getPublicGistsApi,
  });

  useEffect(() => {
    if(data) {
      setGists(data.data)
    }
  }, [data, error])

  return (
    <Box>
        <DataTable isLoading={isLoading} data={gists} />
    </Box>
  );
}
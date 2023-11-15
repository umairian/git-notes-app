import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "../../layouts/AppLayout";
import { RootState } from "../../store";
import CustomButton from "../../components/Buttons/CustomButton";
import GistCard from "../../components/Cards/GistCard";
import { PublicGistsResObjI } from "../../types/Gist.t";
import { getUserGistsApi } from "../../services/api/Gist";
import { useEffect, useState } from "react";
import { PRIMARY_COLOR } from "../../constants/theme";

export default function Profile() {
  // Store
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  // State Variables
  const [gists, setGists] = useState([]);

  const { isLoading, data, error } = useQuery({
    queryKey: ["userGists", { accessToken: accessToken as string }],
    queryFn: getUserGistsApi,
  });

  useEffect(() => {
    if (data) {
      setGists(data.data);
    }
  }, [data, error]);

  return (
    <AppLayout>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "start",
          paddingTop: "10vh",
          gap: 3,
        }}
      >
        <Box
          sx={{
            borderRight: "1px solid gray",
            paddingX: 12,
            textAlign: "center",
            height: "100%",
          }}
        >
          <Avatar sx={{ height: 300, width: 300 }} src={user?.avatar_url} />
          <Typography sx={{ fontSize: 32, fontWeight: "bold", marginTop: 2 }}>
            {user?.name}
          </Typography>
          <CustomButton
            colorScheme="light"
            style={{ marginTop: 15 }}
            onClick={() => {
              if (user)
                window.location.href = `https://github.com/${user.login}`;
            }}
          >
            View GitHub Profile
          </CustomButton>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflowY: "scroll",
            paddingX: 4,
          }}
        >
          <Box display={"flex"} justifyContent={"end"}>
            <CustomButton colorScheme="dark">Create New Gist</CustomButton>
          </Box>
          {isLoading ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={50} style={{ color: PRIMARY_COLOR }} />
            </Box>
          ) : (
            gists.map((gist: PublicGistsResObjI) => (
              <Box sx={{ marginTop: 4 }}>
                <GistCard gist={gist} />
              </Box>
            ))
          )}
        </Box>
      </Box>
    </AppLayout>
  );
}

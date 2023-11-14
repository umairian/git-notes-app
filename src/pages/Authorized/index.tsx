import { Box, CircularProgress, Typography } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import { PRIMARY_COLOR } from "../../constants/theme";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../services/api/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Authorized() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: loginApi,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: ({ data }) => {
      console.log(data);
      navigate("/");
    },
  });

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      mutate({ code });
    }
  }, []);

  return (
    <AppLayout>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <CircularProgress style={{ color: PRIMARY_COLOR }} />
        <Typography sx={{ fontWeight: "bold", fontSize: 25 }}>
          Logging you in...
        </Typography>
      </Box>
    </AppLayout>
  );
}

import { Box, CircularProgress, Typography } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import { PRIMARY_COLOR } from "../../constants/theme";

export default function Authorized() {
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

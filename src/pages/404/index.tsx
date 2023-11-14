import { Box, Typography } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";

export default function PageNotFound() {
  return (
    <AppLayout>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: 25 }}>
          Error 404, You are at wrong place!
        </Typography>
      </Box>
    </AppLayout>
  );
}

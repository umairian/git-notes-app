import { Box } from "@mui/material";
import Header from "../components/layout/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <Box>
      <Header />
      <Box marginX={12}>{children}</Box>
    </Box>
  );
}

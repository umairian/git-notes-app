import { Box, Typography } from "@mui/material";

export default function ActionIconWrapper({
  text,
  onClick,
  icon,
}: {
  text: string;
  onClick: () => void;
  icon: React.ReactElement;
}) {
  return (
    <Box
      display={"flex"}
      gap={1}
      alignItems={"center"}
      onClick={onClick}
      sx={{
        cursor: "pointer",
        "&:hover": { backgroundColor: "lightgray" },
        padding: 1,
        borderRadius: 1,
      }}
    >
      {icon} <Typography>{text}</Typography>
    </Box>
  );
}

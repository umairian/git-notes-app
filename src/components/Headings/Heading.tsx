import { SxProps, Typography } from "@mui/material";

export default function Heading({
  children,
  size,
  sx,
}: {
  children: React.ReactElement | React.ReactElement[] | string;
  size: "h1" | "h2";
  sx?: SxProps;
}) {
  let defaultSx = {};
  switch (size) {
    case "h1":
      defaultSx = { fontSize: 32, fontWeight: "bold" };
  }
  return <Typography sx={{ ...defaultSx, ...sx }}>{children}</Typography>;
}

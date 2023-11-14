import { Avatar, Box, Typography } from "@mui/material";
import { generateTimeDifferenceString } from "../../utils/dateTime";

export default function GistCardUserInfo({
  avatarUrl,
  userName,
  fileName,
  createdAt,
}: {
  avatarUrl: string;
  userName: string;
  fileName: string;
  createdAt: Date;
}) {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Avatar src={avatarUrl} sx={{ width: 35, height: 35 }} />
      <Box>
        <Typography
          sx={(theme) => ({ fontSize: 14, color: theme.palette.primary.dark })}
        >
          {userName}/ <b>{fileName}</b>
        </Typography>
        <Typography sx={{ fontSize: 12, color: "gray" }}>
          {generateTimeDifferenceString(createdAt)}
        </Typography>
      </Box>
    </Box>
  );
}

import { Box, Card, CardContent, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";

export default function FileCard({
  fileName,
  content,
  onClose,
}: {
  fileName: string;
  content: string;
  onClose: (e: Event) => void;
}) {
  return (
    <Card sx={{ width: "100%", marginTop: 2 }}>
      <CardContent>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"start"}
        >
          <Box>
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              {fileName}
            </Typography>
            <Typography sx={{ color: "gray" }}>{content}</Typography>
          </Box>
          <IoMdClose
            style={{ cursor: "pointer", fontSize: 25 }}
            onClick={onClose}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

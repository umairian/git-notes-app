import {
  Box,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";

export default function GistCardSkeleton() {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Skeleton animation="wave" height={"160px"} width={"100%"} />
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
          <Box sx={{ width: "100%"}}>
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="40%" />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

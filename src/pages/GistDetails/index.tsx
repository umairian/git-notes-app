import {
  Box,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { getSinglePublicGistApi } from "../../services/api/Gist";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { PublicGistsResObjI } from "../../types/Gist.t";
import GistCardUserInfo from "../../components/Home/GistCardUserInfo";
import { AiFillCode } from "react-icons/ai";

export default function GistDetailsPage() {
  // Configuration Variables
  const { gistId } = useParams();

  // Store
  const { accessToken } = useSelector((state: RootState) => state.auth);

  // State Variables
  const [gist, setGist] = useState<PublicGistsResObjI | null>(null);

  const { isLoading, data, error } = useQuery({
    queryKey: ["singleGist", { gistId: gistId as string, accessToken }],
    queryFn: getSinglePublicGistApi,
  });

  useEffect(() => {
    if (data) {
      setGist(data.data);
    }
  }, [data, error]);
  return (
    <AppLayout>
      <Box
        sx={{
          width: "100%",
          paddingTop: 3,
        }}
      >
        {isLoading || !gist ? (
          <Box sx={{ height: 300, width: "100%" }}>
            {Array.from({ length: 16 }).map(() => (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"100%"}
                height={15}
                sx={{ marginTop: "5px" }}
              />
            ))}
          </Box>
        ) : (
          <>
            {gist && (
              <GistCardUserInfo
                avatarUrl={gist.owner.avatar_url}
                userName={gist.owner.login}
                fileName={Object.keys(gist.files)[0]}
                createdAt={gist.created_at}
              />
            )}
            {gist &&
              Object.keys(gist.files).map((fileName) => (
                <Card elevation={2} sx={{ width: "100%" }}>
                  <CardContent>
                    <Box display={"flex"} alignItems={"center"} gap={1} m={1}>
                      <AiFillCode />
                      <Typography sx={{ fontWeight: "bold" }}>
                        {" "}
                        {fileName}
                      </Typography>
                    </Box>
                    <Divider />
                    <pre
                      style={{
                        fontSize: 12,
                        overflowX: "scroll",
                      }}
                    >
                      {gist.files[fileName].content
                        ?.split("\n")
                        .map((line, index) => (
                          <div key={index}>
                            <span style={{ marginRight: "1em", color: "gray" }}>
                              {index + 1}.
                            </span>
                            {line}
                          </div>
                        ))}
                    </pre>

                    <Divider sx={{ marginY: 2 }} />
                  </CardContent>
                </Card>
              ))}
          </>
        )}
      </Box>
    </AppLayout>
  );
}

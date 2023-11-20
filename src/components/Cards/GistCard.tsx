import { Box, Card, CardContent, Divider, Skeleton } from "@mui/material";
import GistCardUserInfo from "../Home/GistCardUserInfo";
import { PublicGistsResObjI } from "../../types/Gist.t";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSinglePublicGistApi } from "../../services/api/Gist";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GistCard({ gist }: { gist: PublicGistsResObjI }) {
  // Configuration Variables
  const navigate = useNavigate();

  // Store
  const { accessToken } = useSelector((state: RootState) => state.auth);

  // State Variables
  const [fileContent, setFileContent] = useState<PublicGistsResObjI | null>(
    null
  );

  const { isLoading, data, error } = useQuery({
    queryKey: ["singleGist", { gistId: gist.id, accessToken }],
    queryFn: getSinglePublicGistApi,
  });

  useEffect(() => {
    if (data) {
      setFileContent(data.data);
    }
  }, [data, error]);

  const truncatedContent = fileContent?.files[
    Object.keys(fileContent?.files)[0]
  ].content
    ?.split("\n")
    .slice(0, 8)
    .join("\n");

  return (
    <Card
      elevation={2}
      sx={{ width: "100%", cursor: "pointer" }}
      onClick={() => navigate(`/gists/${gist.id}`)}
    >
      <CardContent>
        {isLoading ? (
          <Box sx={{ height: 160, width: "100%" }}>
            {Array.from({ length: 8 }).map(() => (
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
          <pre
            style={{
              fontSize: 12,
              overflowX: "scroll",
              height: 160,
              overflowY: "hidden",
            }}
          >
            {truncatedContent?.split("\n").map((line, index) => (
              <div key={index}>
                <span style={{ marginRight: "1em", color: "gray" }}>
                  {index + 1}.
                </span>
                {line}
              </div>
            ))}
          </pre>
        )}
        <Divider sx={{ marginY: 2 }} />
        <GistCardUserInfo
          avatarUrl={gist.owner.avatar_url}
          userName={gist.owner.login}
          fileName={Object.keys(gist.files)[0]}
          createdAt={gist.created_at}
        />
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CircularProgress, Divider } from "@mui/material";
import GistCardUserInfo from "../Home/GistCardUserInfo";
import { PublicGistsResObjI } from "../../types/Gist.t";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSinglePublicGistApi } from "../../services/api/Gist";

export default function GistCard({ gist }: { gist: PublicGistsResObjI }) {
  // State Variables
  const [fileContent, setFileContent] = useState<PublicGistsResObjI | null>(
    null
  );

  const { isLoading, data, error } = useQuery({
    queryKey: ["publicGist", { gistId: gist.id }],
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
    <Card elevation={2} sx={{ width: "100%" }}>
      <CardContent>
        {isLoading ? (
          <CircularProgress size={"1.5em"} />
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

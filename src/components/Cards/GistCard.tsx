import { Card, CardContent, Divider, Typography } from "@mui/material";
import GistCardUserInfo from "../Home/GistCardUserInfo";
import { PublicGistsResObjI } from "../../types/Gist.t";

export default function GistCard({ gist }: { gist: PublicGistsResObjI }) {
  return (
    <Card elevation={2} sx={{ width: "100%" }}>
      <CardContent>
        <Typography>{gist.description}</Typography>
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

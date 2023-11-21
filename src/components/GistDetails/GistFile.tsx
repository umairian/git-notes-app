import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { PublicGistsResObjI } from "../../types/Gist.t";
import { AiFillCode } from "react-icons/ai";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGistApi } from "../../services/api/Gist";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function GistFile({
  gist,
  fileName,
  owner,
}: {
  gist: PublicGistsResObjI;
  fileName: string;
  owner: boolean;
}) {
  // Configuration Variables
  const queryClient = useQueryClient();

  // Store
  const { accessToken } = useSelector((state: RootState) => state.auth);

  // State Variables
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(gist.files[fileName].content);

  const { mutate: update, isPending: loading } = useMutation({
    mutationFn: updateGistApi,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      setEdit(false);
      queryClient.invalidateQueries({
        queryKey: ["singleGist", "gistStar", "gistForks"],
      });
    },
  });

  return (
    <Card elevation={2} sx={{ width: "100%" }}>
      <CardContent>
        <Box display={"flex"} alignItems={"center"} gap={1} m={1}>
          <AiFillCode />
          <Typography sx={{ fontWeight: "bold" }}> {fileName}</Typography>
        </Box>
        <Divider />

        {owner && edit ? (
          <ReactQuill
            theme="snow"
            value={editValue}
            onChange={(value) => setEditValue(value)}
            modules={{
              // Disable automatic paragraph creation
              clipboard: {
                matchVisual: false,
              },
            }}
          />
        ) : (
          <pre
            style={{
              fontSize: 12,
              overflowX: "scroll",
              cursor: "pointer",
            }}
            onClick={() => {
              if (owner) setEdit(true);
            }}
          >
            {gist.files[fileName].content?.split("\n").map((line, index) => (
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
        {edit && (
          <Box display={"flex"} justifyContent={"end"} gap={2}>
            <Button
              variant="outlined"
              color="info"
              onClick={() => setEdit(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={() => {
                update({
                  accessToken: accessToken as string,
                  gistId: gist.id,
                  body: {
                    files: {
                      [fileName]: {
                        content: editValue,
                      },
                    },
                  },
                });
              }}
            >
              {loading ? <CircularProgress size={"sm"} /> : "Update"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

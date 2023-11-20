import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Skeleton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteGistApi,
  forkGistApi,
  getGistForksApi,
  getGistStarApi,
  getSinglePublicGistApi,
  starGistApi,
  unStarGistApi,
} from "../../services/api/Gist";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { PublicGistsResObjI } from "../../types/Gist.t";
import GistCardUserInfo from "../../components/Home/GistCardUserInfo";
import {
  AiFillCode,
  AiFillDelete,
  AiFillEdit,
  AiFillStar,
  AiOutlineFork,
  AiOutlineStar,
} from "react-icons/ai";
import ActionIconWrapper from "../../components/GistDetails/ActionIconWrapper";

export default function GistDetailsPage() {
  // Configuration Variables
  const { gistId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Store
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  // State Variables
  const [gist, setGist] = useState<PublicGistsResObjI | null>(null);
  const [starred, setStarred] = useState(false);
  const [snackbarOpened, setSnackbarOpened] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState("");

  const { isLoading, data, error } = useQuery({
    queryKey: ["singleGist", { gistId: gistId as string, accessToken }],
    queryFn: getSinglePublicGistApi,
  });

  const { isError: isStarError, isLoading: starLoading } = useQuery({
    queryKey: ["gistStar", { gistId: gistId as string, accessToken }],
    queryFn: getGistStarApi,
    retry: false,
  });

  const { data: forksData } = useQuery({
    queryKey: ["gistForks", { gistId: gistId as string, accessToken }],
    queryFn: getGistForksApi,
    retry: false,
  });

  const { mutate } = useMutation({
    mutationFn: starGistApi,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gistStar"] });
    },
  });

  const { mutate: unStar } = useMutation({
    mutationFn: unStarGistApi,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gistStar"] });
    },
  });

  const { mutate: fork } = useMutation({
    mutationFn: forkGistApi,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      setSnackbarOpened(true);
      setSnackbarMessage("Gist forked successfully");
      queryClient.invalidateQueries({ queryKey: ["gistForks"] });
    },
  });

  const { mutate: deleteGist } = useMutation({
    mutationFn: deleteGistApi,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      setSnackbarOpened(true);
      setSnackbarMessage("Gist deleted successfully");
      navigate(`/profile`);
    },
  });

  useEffect(() => {
    if (isStarError) {
      setStarred(false);
    } else {
      setStarred(true);
    }
  }, [isStarError]);

  useEffect(() => {
    if (data) {
      setGist(data.data);
    }
  }, [data, error]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpened(false);
  };

  const userOwnGist = user?.id === gist?.owner.id;

  return (
    <AppLayout>
      <Box
        sx={{
          width: "100%",
          paddingTop: 3,
        }}
      >
        <Snackbar
          open={snackbarOpened}
          autoHideDuration={5000}
          message={snackbarMessage}
          onClose={handleClose}
        />
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
              <Box display={"flex"} justifyContent={"space-between"}>
                <GistCardUserInfo
                  avatarUrl={gist.owner.avatar_url}
                  userName={gist.owner.login}
                  fileName={Object.keys(gist.files)[0]}
                  createdAt={gist.created_at}
                />
                <Box display={"flex"} gap={2} alignItems={"center"}>
                  {userOwnGist && (
                    <>
                      <ActionIconWrapper
                        text="Edit"
                        icon={<AiFillEdit size={20} />}
                        onClick={() => {
                          setEdit(true);
                        }}
                      />
                      <ActionIconWrapper
                        text="Delete"
                        icon={<AiFillDelete size={20} />}
                        onClick={() => {
                          confirm("Are you sure to delete the gist?");
                          deleteGist({
                            accessToken: accessToken as string,
                            gistId: gistId as string,
                          });
                        }}
                      />
                    </>
                  )}
                  <ActionIconWrapper
                    text={starred ? "Starred" : "Unstarred"}
                    icon={
                      starLoading ? (
                        <CircularProgress size={20} />
                      ) : starred ? (
                        <AiFillStar size={20} color="blue" />
                      ) : (
                        <AiOutlineStar size={20} />
                      )
                    }
                    onClick={() => {
                      if (starred) {
                        unStar({
                          accessToken: accessToken as string,
                          gistId: gistId as string,
                        });
                      } else {
                        mutate({
                          accessToken: accessToken as string,
                          gistId: gistId as string,
                        });
                      }
                    }}
                  />
                  <ActionIconWrapper
                    text={forksData?.data.length.toString()}
                    icon={<AiOutlineFork size={20} />}
                    onClick={() => {
                      fork({
                        accessToken: accessToken as string,
                        gistId: gistId as string,
                      });
                    }}
                  />
                </Box>
              </Box>
            )}
            {gist &&
              Object.keys(gist.files).map((fileName) => {
                return (
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
                    {edit ? (
                      <TextField
                        multiline
                        rows={10}
                        fullWidth
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        variant="outlined"
                      />
                    ) : (
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
                              <span
                                style={{ marginRight: "1em", color: "gray" }}
                              >
                                {index + 1}.
                              </span>
                              {line}
                            </div>
                          ))}
                      </pre>
                    )}

                    <Divider sx={{ marginY: 2 }} />
                  </CardContent>
                </Card>
              )})}
          </>
        )}
      </Box>
    </AppLayout>
  );
}

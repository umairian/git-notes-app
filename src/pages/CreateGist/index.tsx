import { Box, FormLabel, TextField, Checkbox } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import Heading from "../../components/Headings/Heading";
import CustomButton from "../../components/Buttons/CustomButton";
import { PRIMARY_COLOR } from "../../constants/theme";
import { useState } from "react";
import FileCard from "../../components/Cards/FileCard";
import { CreateGistI, GistFilesI } from "../../types/Gist.t";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createGistApi } from "../../services/api/Gist";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export default function CreateGistPage() {
  // Configuration Variables
  const navigate = useNavigate();

  // Store
  const { accessToken } = useSelector((state: RootState) => state.auth);

  // State Variables
  const [files, setFiles] = useState<GistFilesI>([]);

  const { mutateAsync } = useMutation({
    mutationFn: createGistApi,
    onError: (error) => {
      console.log(error);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      content: "",
      public: false,
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().min(2, "Too Short!").required("Required"),
      name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      content: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setFiles((currentFiles: GistFilesI) => [
        ...currentFiles,
        { name: values.name, content: values.content },
      ]);
      formik.setValues({
        name: "",
        description: values.description,
        public: false,
        content: "",
      });
      formik.setTouched({
        description: true,
      });
    },
  });

  async function onCreateGistClick() {
    try {
      if (accessToken) {
        const data = await mutateAsync({
          accessToken,
          body: {
            description: formik.values.description,
            public: true,
            files: files.reduce(
              (
                acc: { [key: string]: { content: string } },
                obj: CreateGistI
              ) => {
                acc[`'${obj.name}'`] = { content: obj.content };
                return acc;
              },
              {}
            ),
          },
        });
        console.log(data)
        // navigate("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AppLayout>
      <Box sx={{ width: "100%", marginTop: 6, display: "flex", gap: 5 }}>
        <Box
          sx={{
            width: "45%",
            paddingRight: "3%",
            borderRight: `1px solid ${PRIMARY_COLOR}`,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Heading size="h1">Create New Gist</Heading>
            <TextField
              variant="outlined"
              name="description"
              placeholder="Enter gist description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              sx={{ width: "100%", marginTop: 3 }}
            />
            <TextField
              variant="outlined"
              name="name"
              placeholder="Enter file name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ width: "100%", marginTop: 3 }}
            />
            <TextField
              variant="outlined"
              name="content"
              placeholder="Enter file content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
              multiline
              rows={8}
              sx={{ width: "100%", marginTop: 3 }}
            />
            <Box display={"flex"} alignItems={"center"} mt={3}>
              <Checkbox
                value={formik.values.public}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormLabel>Make the gist public</FormLabel>
            </Box>
            <Box
              mt={3}
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              alignItems={"start"}
            >
              <CustomButton
                colorScheme="dark"
                type="submit"
                disabled={Object.keys(formik.errors).length > 0}
              >
                Add File
              </CustomButton>
              <CustomButton
                colorScheme="dark"
                disabled={files.length === 0}
                onClick={onCreateGistClick}
              >
                Create Gist
              </CustomButton>
            </Box>
          </form>
        </Box>
        <Box sx={{ width: "50%" }}>
          {files.map((file: CreateGistI) => (
            <FileCard
              fileName={file.name}
              content={file.content}
              onClose={() => {
                setFiles(
                  files.filter((obj: CreateGistI) => obj.name !== file.name)
                );
              }}
            />
          ))}
        </Box>
      </Box>
    </AppLayout>
  );
}

import { Box } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import { GridViewRounded, ViewListRounded } from "@mui/icons-material";
import { PRIMARY_COLOR } from "../../constants/theme";
import ListView from "../../components/Home/ListView";
import { useState } from "react";
import GridView from "../../components/Home/GridView";

export default function HomePage() {
  const [view, setView] = useState("list");
  return (
    <AppLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <span>
          <span onClick={() => setView("grid")}>
            <GridViewRounded
              sx={{
                color: view === "grid" ? PRIMARY_COLOR : "gray",
                fontSize: 30,
                paddingX: "10px",
                cursor: "pointer",
              }}
            />
          </span>
          <span onClick={() => setView("list")}>
            <ViewListRounded
              sx={{
                color: view === "list" ? PRIMARY_COLOR : "gray",
                fontSize: 30,
                paddingX: "10px",
                cursor: "pointer",
                borderLeft: "1px solid gray",
              }}
            />
          </span>
        </span>
      </Box>
      {view === "list" ? <ListView /> : <GridView />}
    </AppLayout>
  );
}

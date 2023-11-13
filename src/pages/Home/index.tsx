import { Box } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import { PRIMARY_COLOR } from "../../constants/theme";
import ListView from "../../components/Home/ListView";
import { useState } from "react";
import GridView from "../../components/Home/GridView";
import { IoGrid, IoGridOutline, IoList } from "react-icons/io5";
import { VIEW_OPTIONS, iconStyles, spanStyles } from "./constants";

export default function HomePage() {
  const [view, setView] = useState(VIEW_OPTIONS.list);

  

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
          <span
            onClick={() => setView(VIEW_OPTIONS.grid)}
            style={spanStyles(false)}
          >
            {view === VIEW_OPTIONS.grid ? (
              <IoGrid style={iconStyles(PRIMARY_COLOR)} />
            ) : (
              <IoGridOutline style={iconStyles("gray")} />
            )}
          </span>
          <span
            onClick={() => setView(VIEW_OPTIONS.list)}
            style={spanStyles(true)}
          >
            <IoList
              style={iconStyles(
                view === VIEW_OPTIONS.list ? PRIMARY_COLOR : "gray"
              )}
            />
          </span>
        </span>
      </Box>
      {view === VIEW_OPTIONS.list ? <ListView /> : <GridView />}
    </AppLayout>
  );
}

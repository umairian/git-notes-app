import {
  Avatar,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  lighten,
} from "@mui/material";
import { PRIMARY_COLOR } from "../../constants/theme";
import { AiOutlineFork, AiOutlineStar } from "react-icons/ai";

const columns = [
  { field: "name", headerName: "Name" },
  { field: "date", headerName: "Date" },
  { field: "time", headerName: "Time" },
  {
    field: "keyword",
    headerName: "Keyword",
  },
  {
    field: "notebookName",
    headerName: "Notebook Name",
  },
  {
    field: "actions",
    headerName: "",
  },
];

const rows = [
  {
    id: 1,
    name: (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar sx={{ height: 30, width: 30 }} /> Umair Syed
      </Box>
    ),
    date: "Jon",
    time: 35,
    actions: (
      <span>
        <AiOutlineStar size={20} style={{ marginRight: 5}} />
        <AiOutlineFork size={20} />
      </span>
    ),
  },
  {
    id: 2,
    name: (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar sx={{ height: 30, width: 30 }} /> Umair Syed
      </Box>
    ),
    date: "Cersei",
    time: 42,
  },
  {
    id: 3,
    name: (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar sx={{ height: 30, width: 30 }} /> Umair Syed
      </Box>
    ),
    date: "Jaime",
    time: 45,
  },
  {
    id: 4,
    name: (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar sx={{ height: 30, width: 30 }} /> Umair Syed
      </Box>
    ),
    date: "Arya",
    time: 16,
  },
  {
    id: 5,
    name: (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar sx={{ height: 30, width: 30 }} /> Umair Syed
      </Box>
    ),
    date: "Daenerys",
    time: null,
  },
  {
    id: 6,
    name: (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar sx={{ height: 30, width: 30 }} /> Umair Syed
      </Box>
    ),
    date: null,
    time: 150,
  },
  {
    id: 7,
    name: (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar sx={{ height: 30, width: 30 }} /> Umair Syed
      </Box>
    ),
    date: "Ferrara",
    time: 44,
  },
  {
    id: 8,
    name: (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar sx={{ height: 30, width: 30 }} /> Umair Syed
      </Box>
    ),
    date: "Rossini",
    time: 36,
  },
  {
    id: 9,
    name: (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar sx={{ height: 30, width: 30 }} /> Umair Syed
      </Box>
    ),
    date: "Harvey",
    time: 65,
  },
];

export default function DataTable() {
  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "red" }}>
              <TableCell
                padding="checkbox"
                sx={{ backgroundColor: lighten(PRIMARY_COLOR, 0.7) }}
              >
                <Checkbox
                  // indeterminate={numSelected > 0 && numSelected < rowCount}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  // onChange={onSelectAllClick}
                  style={{ color: PRIMARY_COLOR }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  sx={{
                    backgroundColor: lighten(PRIMARY_COLOR, 0.7),
                    fontWeight: "bold",
                    color: PRIMARY_COLOR,
                  }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      // indeterminate={numSelected > 0 && numSelected < rowCount}
                      // checked={rowCount > 0 && numSelected === rowCount}
                      // onChange={onSelectAllClick}
                      style={{ color: PRIMARY_COLOR }}
                    />
                  </TableCell>
                  {columns.map((column) => {
                    const value = row[column.field];
                    console.log("value", value);
                    return <TableCell key={column.field}>{value}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={10}
        page={1}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </>
  );
}

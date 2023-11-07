import {
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
  { id: 1, name: "Snow", date: "Jon", time: 35 },
  { id: 2, name: "Lannister", date: "Cersei", time: 42 },
  { id: 3, name: "Lannister", date: "Jaime", time: 45 },
  { id: 4, name: "Stark", date: "Arya", time: 16 },
  { id: 5, name: "Targaryen", date: "Daenerys", time: null },
  { id: 6, name: "Melisandre", date: null, time: 150 },
  { id: 7, name: "Clifford", date: "Ferrara", time: 44 },
  { id: 8, name: "Frances", date: "Rossini", time: 36 },
  { id: 9, name: "Roxie", date: "Harvey", time: 65 },
];

export default function DataTable() {
  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "red"}}>
              <TableCell padding="checkbox" sx={{ backgroundColor: lighten(PRIMARY_COLOR, 0.7), }}>
                <Checkbox
                  // indeterminate={numSelected > 0 && numSelected < rowCount}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  // onChange={onSelectAllClick}
                  style={{ color: PRIMARY_COLOR,}}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ backgroundColor: lighten(PRIMARY_COLOR, 0.7), fontWeight: "bold", color: PRIMARY_COLOR}}
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
                  style={{ color: PRIMARY_COLOR,}}
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

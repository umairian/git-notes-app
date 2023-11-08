import {
  Avatar,
  Box,
  Checkbox,
  CircularProgress,
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
import { PublicGistsResObjI } from "../../types/Gist.t";
import moment from "moment";
import { LONG_DATE_FORMAT, TIME_FORMAT } from "../../constants/date";

const columns = [
  "Name",
  "Date",
  "Time",
  "Description",
  "Notebook Name",
  "Actions",
];

export default function DataTable({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: PublicGistsResObjI[];
}) {
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
                  key={column}
                  sx={{
                    backgroundColor: lighten(PRIMARY_COLOR, 0.7),
                    fontWeight: "bold",
                    color: PRIMARY_COLOR,
                  }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {isLoading ? (
            <CircularProgress
              size={"1.5em"}
              style={{ marginTop: "5px", color: PRIMARY_COLOR }}
            />
          ) : (
            <TableBody>
              {data.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.owner.avatar_url}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                        // checked={rowCount > 0 && numSelected === rowCount}
                        // onChange={onSelectAllClick}
                        style={{ color: PRIMARY_COLOR }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                      >
                        <Avatar
                          src={row.owner.avatar_url}
                          sx={{ height: 30, width: 30 }}
                        />{" "}
                        {row.owner.login}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {moment(row.created_at).format(LONG_DATE_FORMAT)}
                    </TableCell>
                    <TableCell>
                      {moment(row.created_at).format(TIME_FORMAT)}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{Object.keys(row.files)[0]}</TableCell>
                    <TableCell>
                      <span>
                        <AiOutlineStar
                          size={20}
                          style={{ marginRight: 5, cursor: "pointer" }}
                        />
                        <AiOutlineFork
                          size={20}
                          style={{ cursor: "pointer" }}
                        />
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={10}
        page={1}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </>
  );
}

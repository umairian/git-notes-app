import { InputBase, alpha, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { PRIMARY_COLOR } from "../../constants/theme";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { saveGists, updateGists } from "../../store/slices/Gist";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: PRIMARY_COLOR,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: "1px solid white",
  color: "white",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function HeaderSearchBar() {
  // Configuration Variables
  const dispatch = useDispatch();

  // Store
  const { initialGists } = useSelector(
    (state: RootState) => state.gists
  );

  // State Variables
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      dispatch(
        updateGists({
          gists: initialGists.filter((gist) => gist.id.includes(search)),
        })
      );
    } else {
      dispatch(saveGists({ gists: initialGists }));
    }
  }, [search]);
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Search>
  );
}

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { PRIMARY_COLOR } from "../../constants/theme";
import HeaderSearchBar from "../Header/HeaderSearchBar";
import CustomButton from "../Buttons/CustomButton";
import config from "../../config";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/Auth";
import { PersonRounded, LogoutRounded } from "@mui/icons-material";

export default function Header() {
  // Configuration Variables
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Store
  const { isLoggedIn, user } = useSelector((store: RootState) => store.auth);

  // State Variables
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const menuItems = React.useMemo(
    () => [
      {
        label: "Profile",
        onClick: () => {
          handleCloseUserMenu();
          navigate("/profile");
        },
        icon: <PersonRounded />,
      },
      {
        label: "Logout",
        onClick: () => {
          handleCloseUserMenu();
          dispatch(logout());
        },
        icon: <LogoutRounded />,
      },
    ],
    []
  );

  return (
    <AppBar position="static" sx={{ background: PRIMARY_COLOR }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", paddingX: { xs: 2, md: 10 } }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Git Notes
          </Typography>

          <HeaderSearchBar />

          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Umair Syed" src={user?.avatar_url} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {menuItems.map((item) => (
                  <MenuItem key={item.label} onClick={item.onClick}>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      {item.icon}{" "}
                      <Typography textAlign="center">{item.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <CustomButton
              colorScheme="light"
              onClick={() => {
                window.location.href = `https://github.com/login/oauth/authorize?client_id=${config.GITHUB_APP_ID}&redirect_uri=http://localhost:5173/authorized&scope=user`;
              }}
            >
              Login
            </CustomButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

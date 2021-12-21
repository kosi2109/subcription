import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

const pages = [{ name: "Pricing", uri: "/pricing" }];

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const logoutHandle = () => {
    const {userId} = JSON.parse(localStorage.getItem("profile"))
    dispatch(logout(userId,navigate));
    setAnchorElNav(null);
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const profile = localStorage.getItem("profile");

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{textDecoration:"none",color:"white"}}>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            LOGO
          </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, key) => (
                <MenuItem key={key} onClick={handleCloseNavMenu}>
                  <Link to={page.uri}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, key) => (
              <Link to={page.uri} style={{ textDecoration: "none" }}>
                <Button
                  key={key}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {profile ? (<>
                <Link to="/" style={{textDecoration:"none",color:"black"}}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                </Link>
                <MenuItem onClick={logoutHandle}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
                
                </>
              ) : (
                <Link to="/auth" style={{textDecoration:"none",color:"black"}}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;

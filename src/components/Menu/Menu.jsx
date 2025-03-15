import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../selectors/selectors";
import { useEffect, useState } from "react";
import { ROUTES } from "../../constants/constants";
import { bufferToBase64Url } from "../../utils/utils";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { main as mainColor } from "../../themes/palettes";
import { logOff } from "../../reducers";

const pages = ["Products", "Pricing", "Blog"];

const menuButtons = [
  { name: "Home", link: ROUTES.PAGE.HOME },
  { name: "My games", link: ROUTES.PAGE.MY_GAMES, authRequired: true },
  { name: "My movies", link: ROUTES.PAGE.MY_FILMS, authRequired: true },
  { name: "Statistic", link: ROUTES.PAGE.STATISTIC, authRequired: true },
];
const login = { name: "Login", link: ROUTES.PAGE.LOGIN };

export default function NavigationMenu() {
  const userMenu = [
    { name: "Profile", link: ROUTES.PAGE.DASHBOARD },
    { name: "Logout", link: ROUTES.PAGE.LOGIN },
  ];
  const signInMenu = { name: "Sign In", link: ROUTES.PAGE.LOGIN };
  const dispatch = useDispatch();
  const location = useLocation();
  const loggedUser = useSelector(selectCurrentUser);
  const avatar = loggedUser && bufferToBase64Url(loggedUser.avatar);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    if (e.target.innerHTML === "Logout") {
      dispatch(logOff());
    }

    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: mainColor.medium,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar variant="rounded" src="/logo.png"></Avatar>
          <Typography
            color="info"
            variant="h6"
            noWrap
            href="#app-bar-with-responsive-menu"
            sx={{
              m: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Wasterator
          </Typography>

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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          {loggedUser && <SearchBar />}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {menuButtons.map((page) => {
              if (page.authRequired && !loggedUser) return;

              return (
                <Link to={page.link}>
                  <Button
                    noWrap
                    variant="contained"
                    key={page.name}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      mr: 1,
                      backgroundColor:
                        activePath === page.link
                          ? mainColor.light
                          : mainColor.dark,
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={loggedUser?.name} src={avatar} />
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
              {!loggedUser ? (
                <Link to={signInMenu.link}>
                  <MenuItem key={signInMenu.name} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {signInMenu.name}
                    </Typography>
                  </MenuItem>
                </Link>
              ) : (
                userMenu.map((route) => (
                  <Link to={route.link}>
                    <MenuItem key={route.name} onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {route.name}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// export default function Menu() {
//   const loggedUser = useSelector(selectCurrentUser);
//   const avatar = loggedUser && bufferToBase64Url(loggedUser.avatar);
//   const location = useLocation();
//   const [activePath, setActivePath] = useState(location.pathname);

//   useEffect(() => {
//     setActivePath(location.pathname);
//   }, [location]);

//   return (
//     <div className={classes.menu}>
//       <div className={classes.logoWrapper}>
//         <img src="/logo.png" alt="" />
//       </div>
//       <nav>
//         <ul>
//           {loggedUser && <SearchBar />}
//           {menuButtons.map((button) => {
//             const navButtonData = { ...button };
//             if (button.authRequird && !loggedUser) return;
//             if (loggedUser && button.link === ROUTES.PAGE.LOGIN) {
//               navButtonData.link = ROUTES.PAGE.DASHBOARD;
//               navButtonData.name = loggedUser.name;
//               // <Avatar alt={loggedUser.name} src={avatar} />;
//             }
//             return (
//               <Link
//                 style={{ display: "flex" }}
//                 to={navButtonData.link}
//                 key={navButtonData.link}
//               >
//                 <Button
//                   title={navButtonData.name}
//                   color={activePath === navButtonData.link ? "red" : ""}
//                 ></Button>
//               </Link>
//             );
//           })}
//         </ul>
//       </nav>
//     </div>
//   );
// }

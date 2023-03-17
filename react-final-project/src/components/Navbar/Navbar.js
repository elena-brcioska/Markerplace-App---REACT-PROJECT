import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Form, Link, NavLink } from "react-router-dom";
import { getAuthToken, getUser } from "../../util/auth";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Badge,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { CartContext } from "../../context/Context";
import styled from "@emotion/styled";

function ResponsiveAppBar() {
  const [open, setOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setOpen(!open);
  };

  const handleCloseNavMenu = () => {
    setOpen(false);
  };

  const user = getUser();
  const token = getAuthToken();

  const globalState = React.useContext(CartContext);
  const dispatch = globalState.dispatch;


  const navLinkStyle = ({ isActive }) => {
    return {
      textDecoration: "none",
      opacity: isActive ? "0.5" : "1",
    };
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      padding: '0 4px',
    },
  }));

  const cartItems = globalState.state.length || 0;


  return (
    <>
      <AppBar
        sx={{
          width: "100%",
          zIndex: zIndex.drawer + 1,
          position: "relative",
          background: " rgb(25,0,36)",
          background:
            "linear-gradient(149deg, rgba(25,0,36,1) 0%, rgba(112,9,121,1) 36%, rgba(67,5,181,1) 63%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                MARKETPLACE
              </Typography>
            </Link>

            {/* MOBILE VIEW */}
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
              <Drawer
                PaperProps={{
                  sx: { backgroundColor: "rgba(49, 49, 116, 1)", width: "50%" },
                }}
                open={open}
                onClose={() => setOpen(false)}
              >
                <Toolbar />
                <List sx={{ marginTop: "20px" }}>
                  <ListItemButton
                    sx={{ display: "flex", justifyContent: "center" }}
                    onClick={handleCloseNavMenu}
                  >
                    <ListItemIcon divider>
                      <ListItemText>
                        <Link
                          style={{ textDecoration: "none", color: "#fff" }}
                          to="/"
                        >
                          HOME
                        </Link>
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>

                  <ListItemButton
                    sx={{ display: "flex", justifyContent: "center" }}
                    onClick={handleCloseNavMenu}
                  >
                    <ListItemIcon divider>
                      <ListItemText>
                        <Link
                          style={{ textDecoration: "none", color: "#fff" }}
                          to="products"
                        >
                          PRODUCTS
                        </Link>
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>

                  {token && user && (
                    <ListItemButton
                      sx={{ display: "flex", justifyContent: "center" }}
                      onClick={handleCloseNavMenu}
                    >
                      <ListItemIcon divider>
                        <ListItemText>
                          <Form method="post" action="/logout">
                            <Button
                              type="submit"
                              sx={{
                                color: "white",
                              }}
                            >
                              Logout
                            </Button>
                          </Form>
                        </ListItemText>
                      </ListItemIcon>
                    </ListItemButton>
                  )}
                </List>
              </Drawer>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  display: "flex",
                }}
              >
                <StorefrontIcon sx={{ ml: 1, alignSelf: "center" }} />
              </Link>
            </Box>

            {/* MOBILE VIEW END */}

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <NavLink to="products" style={navLinkStyle}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  PRODUCTS
                </Button>
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Box sx={{ display: "flex", flexGrow: 0 }}>
                {user && token && (
                  <>
                    <Typography
                      variant="p"
                      noWrap
                      component="p"
                      sx={{
                        display: { lg: "block", xs: "none" },
                        color: "#fff",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        letterSpacing: "2px",
                        alignSelf: "center",
                        marginRight: "20px",
                      }}
                    >
                      {`WELCOME, ${user.toUpperCase()}`}
                    </Typography>

                    <Form
                      style={{ display: "flex" }}
                      method="post"
                      action="/logout"
                    >
                      <Button
                        type="submit"
                        sx={{
                          display: { md: "block", xs: "none" },
                          alignSelf: "center",
                          color: "white",
                          margin: "0 20px",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                        onClick={() => {
                          dispatch({ type: "REMOVE_ALL" });
                        }}
                      >
                        Logout
                      </Button>
                    </Form>
                    <NavLink to="cart" style={navLinkStyle}>
                      <IconButton aria-label="cart">
                        <StyledBadge badgeContent={cartItems} color="secondary">
                          <ShoppingCartOutlinedIcon sx={{ my: 2, color: "#fff", display: "block" }} />
                        </StyledBadge>
                      </IconButton>
                    </NavLink>
                  </>
                )}

                {!user && !token && (
                  <NavLink to="access?mode=login" style={navLinkStyle}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      LOGIN
                    </Button>
                  </NavLink>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;

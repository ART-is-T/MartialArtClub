import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { scroller } from "react-scroll";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";

function NavBar({ logout, isAuth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { label: "Главная", to: "hero", scroll: true },
    { label: "Единоборства", to: "martialArts", scroll: true },
    { label: "Зал", to: "gym", scroll: true },
    { label: "Тренеры", to: "trainers", scroll: true },
    { label: "Отзывы", to: "reviews", scroll: true },
    { label: "Контакты", to: "contact", scroll: true },
  ];

  if (isAuth) {
    menuItems.push({ label: "Расписание", to: "/schedule", scroll: false });
  }

  const handleClick = (to) => {
    if (location.pathname === "/") {
      scroller.scrollTo(to, {
        smooth: true,
        offset: -90,
        duration: 500,
      });
    } else {
      navigate("/#" + to);
      setTimeout(() => {
        scroller.scrollTo(to, {
          smooth: true,
          offset: -90,
          duration: 500,
        });
      }, 300);
    }
    setMobileOpen(false);
  };

  // Sidebar (Drawer) для телефонов
  const drawer = (
    <Box sx={{ width: 240, p: 2 }}>
      <List>
        {menuItems.map((item, i) => (
          <ListItem key={i} disablePadding>
            {item.scroll ? (
              <ListItemButton onClick={() => handleClick(item.to)}>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: { color: "white", fontWeight: "bold" }, // обычные пункты белым
                  }}
                />
              </ListItemButton>
            ) : (
              <ListItemButton component={RouterLink} to={item.to}>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: { color: "white", fontWeight: "bold" },
                  }}
                />
              </ListItemButton>
            )}
          </ListItem>
        ))}

        {isAuth ? (
          <>
            {localStorage.getItem("role") === "ADMIN" && (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/admin/trainers">
                    <ListItemText
                      primary="Тренеры+"
                      primaryTypographyProps={{
                        sx: { color: "secondary.main", fontWeight: "bold" }, // 👉 только админ зелёным
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/admin/martial-arts">
                    <ListItemText
                      primary="Единоборства+"
                      primaryTypographyProps={{
                        sx: { color: "secondary.main", fontWeight: "bold" }, // 👉 тоже админ зелёным
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            )}

            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to={`/profile/${localStorage.getItem("userId")}`}>
                <ListItemText
                  primary="Профиль"
                  primaryTypographyProps={{ sx: { color: "white", fontWeight: "bold" } }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemText
                  primary="Выйти"
                  primaryTypographyProps={{ sx: { color: "error.main", fontWeight: "bold" } }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/login">
                <ListItemText
                  primary="Войти"
                  primaryTypographyProps={{ sx: { color: "white", fontWeight: "bold" } }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/register">
                <ListItemText
                  primary="Регистрация"
                  primaryTypographyProps={{ sx: { color: "white", fontWeight: "bold" } }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar sx={{ position: "relative", justifyContent: "flex-end" }}>
          {/* ☰ Для телефонов */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* ✅ Центрированное меню (desktop) */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: { xs: "none", md: "block" },
            }}
          >
            {menuItems.map((item, i) =>
              item.scroll ? (
                <Button
                  key={i}
                  onClick={() => handleClick(item.to)}
                  sx={{
                    mx: 1,
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": { color: "secondary.main" },
                  }}
                >
                  {item.label}
                </Button>
              ) : (
                <Button
                  key={i}
                  component={RouterLink}
                  to={item.to}
                  sx={{
                    mx: 1,
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": { color: "secondary.main" },
                  }}
                >
                  {item.label}
                </Button>
              )
            )}
          </Box>

          {/* 🔑 Справа действия (desktop) */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isAuth ? (
              <>
                {localStorage.getItem("role") === "ADMIN" && (
                  <>
                    <Button
                      component={RouterLink}
                      to="/admin/trainers"
                      sx={{ color: "secondary.main", fontWeight: "bold" }}
                    >
                      Тренеры+
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/admin/martial-arts"
                      sx={{ color: "secondary.main", fontWeight: "bold" }}
                    >
                      Единоборства+
                    </Button>
                  </>
                )}
                <Button
                  component={RouterLink}
                  to={`/profile/${localStorage.getItem("userId")}`}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": { color: "secondary.main" },
                  }}
                >
                  Профиль
                </Button>
                <Button onClick={logout} sx={{ color: "red", fontWeight: "bold" }}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{ color: "white", fontWeight: "bold", "&:hover": { color: "secondary.main" } }}
                >
                  Войти
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  sx={{ color: "white", fontWeight: "bold", "&:hover": { color: "secondary.main" } }}
                >
                  Регистрация
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer для телефонов */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        {drawer}
      </Drawer>
    </>
  );
}

export default NavBar;
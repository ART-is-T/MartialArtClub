import { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", { username, password });

      // сохраняем токен и роль
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);

      if (onLogin) onLogin(); // обновляем глобальный state авторизации
      navigate("/");          // редирект на главную
    } catch (err) {
      console.error("Ошибка логина", err);
      setError("Неверное имя пользователя или пароль");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Вход
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            fullWidth
            required
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Войти
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default LoginForm;
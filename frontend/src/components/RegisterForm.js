import { useState } from "react";
import { TextField, Button, Paper, Typography, Box, MenuItem } from "@mui/material";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    role: "STUDENT", // по умолчанию студент
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/api/users/register", form);
      navigate("/login"); // после регистрации — на страницу входа
    } catch (err) {
      console.error("Ошибка регистрации", err);
      setError("Не удалось зарегистрировать пользователя");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Paper sx={{ p: 4, width: 500 }}>
        <Typography variant="h5" gutterBottom>
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Имя пользователя"
            name="username"
            value={form.username}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Пароль"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Полное имя"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />

          <TextField
            select
            label="Роль"
            name="role"
            value={form.role}
            onChange={handleChange}
            margin="normal"
            fullWidth
          >
            <MenuItem value="STUDENT">Студент</MenuItem>
            <MenuItem value="COACH">Тренер</MenuItem>
            {/* 👇 ADMIN можно дать только вручную */}
          </TextField>

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
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default RegisterForm;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button
} from "@mui/material";
import axios from "../axiosConfig";

function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`/api/users/${id}`)
      .then(res => {
        setUser(res.data);
        setFormData(res.data);
      })
      .catch(err => {
        console.error("Ошибка загрузки профиля", err.response || err.message);
        setError(`Ошибка: ${err.response?.status} ${err.response?.statusText}`);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`/api/users/${id}`, formData);
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Ошибка сохранения профиля", err.response || err.message);
      setError("Не удалось сохранить изменения");
    }
  };

  if (error) {
    return <Typography color="error" sx={{ mt: 8 }}>{error}</Typography>;
  }
  if (!user) {
    return <Typography sx={{ mt: 8 }}>Загрузка...</Typography>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 8,
        px: 2,
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 600, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Профиль пользователя
        </Typography>

        {editMode ? (
          <>
            <TextField
              label="Имя пользователя"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled // ⚠️ логин лучше не менять
            />
            <TextField
              label="Полное имя"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            {user.role === "STUDENT" && (
              <>
                <TextField
                  label="Уровень"
                  name="skillLevel"
                  value={formData.skillLevel || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Предпочитаемое искусство"
                  name="martialArt"
                  value={formData.martialArt || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </>
            )}

            {user.role === "COACH" && (
              <>
                <TextField
                  label="Опыт"
                  name="experience"
                  value={formData.experience || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Сертификаты"
                  name="certificates"
                  value={formData.certificates || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"           // 👈 ярко-зелёный твой secondary
                onClick={handleSave}
                sx={{ mr: 1 }}
              >
                Сохранить
              </Button>
              <Button
                variant="outlined"
                color="secondary"           // 👈 светлая обводка + зеленый текст
                onClick={() => setEditMode(false)}
              >
                Отмена
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography><b>Имя пользователя:</b> {user.username}</Typography>
            <Typography><b>Полное имя:</b> {user.fullName}</Typography>
            <Typography><b>Email:</b> {user.email}</Typography>
            <Typography><b>Роль:</b> {user.role}</Typography>

            {user.role === "STUDENT" && (
              <>
                <Typography><b>Уровень:</b> {user.skillLevel || "—"}</Typography>
                <Typography><b>Боевые искусства:</b> {user.martialArt || "—"}</Typography>
              </>
            )}
            {user.role === "COACH" && (
              <>
                <Typography><b>Опыт:</b> {user.experience || "—"}</Typography>
                <Typography><b>Сертификаты:</b> {user.certificates || "—"}</Typography>
              </>
            )}

            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={() => setEditMode(true)}>
                Редактировать
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default ProfilePage;
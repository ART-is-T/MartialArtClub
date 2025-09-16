import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import dayjs from "dayjs";
import axios from "../axiosConfig";

function SchedulePage() {
  const [entries, setEntries] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({ date: "", startTime: "", endTime: "", martialArt: "" });

  const role = localStorage.getItem("role");

  const loadData = () => {
    axios.get("/api/schedule")
      .then(res => setEntries(res.data))
      .catch(err => console.error("Ошибка загрузки расписания:", err));
  };

  useEffect(() => {
    loadData();
  }, []);

  // === CRUD ===
  const handleOpen = (entry = { date: "", startTime: "", endTime: "", martialArt: "" }) => {
    setCurrent(entry);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrent({ date: "", startTime: "", endTime: "", martialArt: "" });
  };

  const handleSave = async () => {
    try {
      if (current.id) {
        await axios.put(`/api/schedule/${current.id}`, current);
      } else {
        await axios.post("/api/schedule", current);
      }
      loadData();
      handleClose();
    } catch (err) {
      console.error("Ошибка сохранения расписания", err);
      alert("Ошибка сохранения");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Удалить запись?")) {
      try {
        await axios.delete(`/api/schedule/${id}`);
        loadData();
      } catch (err) {
        console.error("Ошибка удаления:", err);
        alert("Ошибка удаления");
      }
    }
  };

  // формируем текущую неделю (Пн–Вс)
  const startOfWeek = dayjs().startOf("week").add(1, "day");
  const daysOfWeek = Array.from({ length: 7 }).map((_, i) => startOfWeek.add(i, "day"));

  // группировка событий по дате
  const eventsByDate = {};
  entries.forEach(e => {
    const dateKey = e.date;
    if (!eventsByDate[dateKey]) eventsByDate[dateKey] = [];
    eventsByDate[dateKey].push(e);
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Расписание на неделю
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {daysOfWeek.map(day => {
          const dateKey = day.format("YYYY-MM-DD");
          const events = eventsByDate[dateKey] || [];
          return (
            <Grid item key={dateKey} xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  height: "100%",
                  minHeight: 300,
                  width: 225,
                  mx: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                  bgcolor: "background.paper",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "secondary.main", textAlign: "center" }}
                >
                  {day.format("DD.MM (dd)")}
                </Typography>

                {events.length === 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2, textAlign: "center" }}
                  >
                    Нет занятий
                  </Typography>
                ) : (
                  events.map(ev => (
                    <Box
                      key={ev.id}
                      sx={{
                        mt: 1,
                        p: 1,
                        borderRadius: 2,
                        bgcolor: "rgba(11,110,79,0.15)",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: "bold", color: "secondary.main" }}>
                        {ev.martialArt}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {ev.startTime} – {ev.endTime}
                      </Typography>

                      {role === "ADMIN" && (
                        <Box sx={{ mt: 0.5, display: "flex", gap: 1 }}>
                          <Button
                            size="small"
                            color="secondary"
                            sx={{ fontSize: "0.7rem", fontWeight: "bold" }}
                            onClick={() => handleOpen(ev)}
                          >
                            Редактировать
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            sx={{ fontSize: "0.7rem", fontWeight: "bold" }}
                            onClick={() => handleDelete(ev.id)}
                          >
                            Удалить
                          </Button>
                        </Box>
                      )}
                    </Box>
                  ))
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {role === "ADMIN" && (
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 4 }}
            onClick={() => handleOpen()}
          >
            Добавить занятие
          </Button>
        </Box>
      )}

      {/* Диалог */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{current.id ? "Редактировать занятие" : "Добавить занятие"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Дата (YYYY-MM-DD)"
            value={current.date}
            onChange={(e) => setCurrent({ ...current, date: e.target.value })}
            fullWidth
          />
          <TextField
            label="Время начала (HH:MM)"
            value={current.startTime}
            onChange={(e) => setCurrent({ ...current, startTime: e.target.value })}
            fullWidth
          />
          <TextField
            label="Время окончания"
            value={current.endTime}
            onChange={(e) => setCurrent({ ...current, endTime: e.target.value })}
            fullWidth
          />
          <TextField
            label="Вид боевого искусства"
            value={current.martialArt}
            onChange={(e) => setCurrent({ ...current, martialArt: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Отмена</Button>
          <Button onClick={handleSave} variant="contained" color="secondary">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SchedulePage;
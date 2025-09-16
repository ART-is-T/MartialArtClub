import { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow,
  TableCell, TableBody, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField
} from "@mui/material";
import axios from "../../axiosConfig";

function AdminTrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({
    name: "",
    slug: "",
    martialArt: "",
    bio: "",
    photoUrl: "",
    backgroundImage: ""
  });

  const loadData = () => {
    axios.get("/api/trainers")
      .then(res => setTrainers(res.data))
      .catch(err => console.error("Ошибка загрузки тренеров:", err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpen = (trainer = {
    name: "",
    slug: "",
    martialArt: "",
    bio: "",
    photoUrl: "",
    backgroundImage: ""
  }) => {
    setCurrent(trainer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      if (current.id) {
        await axios.put(`/api/trainers/${current.id}`, current);
      } else {
        await axios.post("/api/trainers", current);
      }
      loadData();
      handleClose();
    } catch (err) {
      console.error("Ошибка сохранения тренера:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Удалить тренера?")) {
      try {
        await axios.delete(`/api/trainers/${id}`);
        loadData();
      } catch (err) {
        console.error("Ошибка удаления тренера:", err);
      }
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Управление тренерами
      </Typography>

      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Единоборство</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainers.map((tr) => (
              <TableRow key={tr.id}>
                <TableCell>{tr.name}</TableCell>
                <TableCell>{tr.slug}</TableCell>
                <TableCell>{tr.martialArt}</TableCell>
                <TableCell>
                  <img
                    src={tr.photoUrl}
                    alt={tr.name}
                    style={{ width: 60, height: 60, borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleOpen(tr)}
                    sx={{ fontWeight: "bold" }}
                  >
                    Редактировать
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    sx={{ fontWeight: "bold" }}
                    onClick={() => handleDelete(tr.id)}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={() => handleOpen()}
      >
        Добавить тренера
      </Button>

      {/* Диалог добавления/редактирования */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {current.id ? "Редактировать тренера" : "Добавить тренера"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Имя"
            value={current.name}
            onChange={(e) =>
              setCurrent({ ...current, name: e.target.value })
            }
          />
          <TextField
            label="Slug"
            value={current.slug}
            onChange={(e) =>
              setCurrent({ ...current, slug: e.target.value })
            }
          />
          <TextField
            label="Единоборство"
            value={current.martialArt}
            onChange={(e) =>
              setCurrent({ ...current, martialArt: e.target.value })
            }
          />
          <TextField
            label="Биография"
            value={current.bio}
            onChange={(e) =>
              setCurrent({ ...current, bio: e.target.value })
            }
            multiline
            rows={3}
          />
          <TextField
            label="Фото (URL)"
            value={current.photoUrl}
            onChange={(e) =>
              setCurrent({ ...current, photoUrl: e.target.value })
            }
          />
          <TextField
            label="Фон (URL)"
            value={current.backgroundImage}
            onChange={(e) =>
              setCurrent({ ...current, backgroundImage: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSave}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminTrainersPage;
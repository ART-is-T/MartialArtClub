import { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableRow,
  TableCell, TableBody, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField
} from "@mui/material";
import axios from "../../axiosConfig";

function AdminMartialArtsPage() {
  const [arts, setArts] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({
    title: "",
    slug: "",
    description: "",
    bgImage: "",
    iconImage: ""
  });

  const loadData = () => {
    axios.get("/api/martial-arts")
      .then(res => setArts(res.data))
      .catch(err => console.error("Ошибка загрузки:", err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpen = (art = {
    title: "", slug: "", description: "", bgImage: "", iconImage: ""
  }) => {
    setCurrent(art);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      if (current.id) {
        await axios.put(`/api/martial-arts/${current.id}`, current);
      } else {
        await axios.post("/api/martial-arts", current);
      }
      loadData();
      handleClose();
    } catch (err) {
      console.error("Ошибка сохранения:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Удалить вид боевого искусства?")) {
      try {
        await axios.delete(`/api/martial-arts/${id}`);
        loadData();
      } catch (err) {
        console.error("Ошибка удаления:", err);
      }
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Управление боевыми искусствами
      </Typography>

      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Иконка</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arts.map((art) => (
              <TableRow key={art.id}>
                <TableCell>{art.title}</TableCell>
                <TableCell>{art.slug}</TableCell>
                <TableCell>
                  <img src={art.iconImage} alt={art.title} style={{ width: 50, height: 50 }} />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleOpen(art)}
                    sx={{ fontWeight: "bold" }}
                  >
                    Редактировать
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    sx={{ fontWeight: "bold" }}
                    onClick={() => handleDelete(art.id)}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => handleOpen()}>
        Добавить боевое искусство
      </Button>

      {/* Диалог добавления/редактирования */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{current.id ? "Редактировать" : "Добавить боевое искусство"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Название" value={current.title} onChange={(e)=> setCurrent({ ...current, title: e.target.value })}/>
          <TextField label="Slug" value={current.slug} onChange={(e)=> setCurrent({ ...current, slug: e.target.value })}/>
          <TextField label="Описание" value={current.description} multiline rows={3} 
            onChange={(e)=> setCurrent({ ...current, description: e.target.value })}/>
          <TextField label="Фон (URL)" value={current.bgImage} onChange={(e)=> setCurrent({ ...current, bgImage: e.target.value })}/>
          <TextField label="Иконка (URL)" value={current.iconImage} onChange={(e)=> setCurrent({ ...current, iconImage: e.target.value })}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSave} color="secondary" variant="contained">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminMartialArtsPage;
import { useState } from "react";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import axios from "../axiosConfig";

function AddReviewForm({ onSuccess }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/reviews", { text });
      setText("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Ошибка добавления отзыва:", err);
      alert("Необходимо авторизоваться чтобы оставить отзыв");
    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        height: "100%",            // 👈 тянем под равный размер с «Связаться с нами»
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
      elevation={3}
    >
      <Typography variant="h5" gutterBottom>Оставить отзыв</Typography>
      <form onSubmit={handleSubmit} style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <TextField
          fullWidth
          label="Ваш отзыв"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}                // 👈 больше строк, чтобы удобно писать
          margin="normal"
          required
          sx={{ flexGrow: 1 }}
        />
        <Box textAlign="right" sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="secondary">
            Отправить
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default AddReviewForm;
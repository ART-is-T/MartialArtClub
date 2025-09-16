import { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import axios from "../../axiosConfig";

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const role = localStorage.getItem("role");

  // Загружаем только 3 последних отзыва
  const loadReviews = () => {
    axios.get("/api/reviews")
      .then((res) => {
        const latest = res.data.slice(-3);
        setReviews(latest);
      })
      .catch((err) => console.error("Ошибка загрузки отзывов:", err));
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Удалить отзыв?")) {
      try {
        await axios.delete(`/api/reviews/${id}`);
        loadReviews();
      } catch (err) {
        console.error("Ошибка удаления:", err);
      }
    }
  };

  return (
    <Box id="reviews" sx={{ py: 8, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" align="center" gutterBottom>
        Отзывы
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
          alignItems: "stretch",   // 👈 чтобы все карточки равнялись по высоте
          mt: 4,
        }}
      >
        {reviews.length === 0 ? (
          <Typography align="center" variant="body1">
            Отзывов пока нет
          </Typography>
        ) : (
          reviews.map((r) => (
            <Paper
              key={r.id}
              sx={{
                width: 300,           // 👈 фиксированная ширина карточки
                p: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
              }}
              elevation={4}
            >
              <Typography
                variant="body2"
                sx={{
                  fontStyle: "italic",
                  flexGrow: 1,    // текст занимает доступное пространство
                  mb: 2
                }}
              >
                "{r.text}"
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {role === "ADMIN" && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(r.id)}
                  >
                    Удалить
                  </Button>
                )}
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  – {r.username}
                </Typography>
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
}

export default ReviewsSection;
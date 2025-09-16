import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Avatar, CardActionArea } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";   // 👈 используем Link здесь
import axios from "../../axiosConfig";
import "swiper/css";
import "swiper/css/navigation";

function TrainersSection() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios.get("/api/trainers")
      .then((res) => setTrainers(res.data))
      .catch((err) => {
        console.error("Ошибка загрузки тренеров:", err);
        setTrainers([]);
      });
  }, []);

  return (
    <Box id="trainers" sx={{ py: 8, px: { xs: 2, md: 8 }, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Наши тренеры
      </Typography>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop
        autoplay={{ delay: 4000 }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 600: { slidesPerView: 2 }, 960: { slidesPerView: 3 } }}
        style={{ padding: "20px" }}
      >
        {trainers.map((tr) => (
          <SwiperSlide key={tr.id}>
            <Card
              component={Link}
              to={`/trainer/${tr.slug}`}
              elevation={6}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                cursor: "pointer",
                mb: 2,
                textDecoration: "none",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                },
              }}
            >
              <CardActionArea sx={{ display: "flex", flexDirection: "column", borderRadius: "inherit" }}>
                {/* Верхняя часть (фон = фон карточки, без подложки) */}
                <Avatar
                  src={tr.photoUrl}
                  alt={tr.name}
                  sx={{
                    width: 140,
                    height: 140,
                    mt: 3,
                    border: "3px solid #0b6e4f",
                  }}
                />

                {/* Нижняя часть (отдельный фон + скругление снизу) */}
                <CardContent
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    bgcolor: "background.paper",                // 👇 отдельная подложка
                    mt: 2,
                    borderBottomLeftRadius: "inherit",          // сохраняем скругление
                    borderBottomRightRadius: "inherit",
                    transition: "background-color 0.4s ease, opacity 0.4s ease",
                    opacity: 0.95,
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.4)",
                      opacity: 0.9,
                      color: "#fff",
                    },
                  }}
                >
                  <Typography variant="h6">{tr.name}</Typography>
                  <Typography variant="body2">{tr.martialArt}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default TrainersSection;
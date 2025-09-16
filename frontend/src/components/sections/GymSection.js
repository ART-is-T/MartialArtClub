import { Box, Typography, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const images = [
  "/images/gym1.jpg",
  "/images/gym2.jpg",
  "/images/gym3.jpg",
  "/images/gym4.jpg",
];

function GymSection() {
  return (
    <Box id="gym" sx={{ py: 8, px: { xs: 2, md: 8 }, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Наш зал
      </Typography>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop
        autoplay={{ delay: 4000 }}
        slidesPerView={1}
        style={{ maxWidth: "1400px", margin: "auto" }} // ✅ ширина как у тренеров
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <Paper
              elevation={6}
              sx={{
                height: 800, // ✅ повыше, чтобы был "воздух"
                overflow: "hidden",
                borderRadius: 4, // ✅ меньшее скругление
              }}
            >
              <img
                src={img}
                alt={`Зал ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Paper>
          </SwiperSlide>
        ))}
      </Swiper>

      <Typography align="center" sx={{ mt: 4 }} color="text.secondary">
        Современный зал, оборудованный для тренировок всех уровней
      </Typography>
    </Box>
  );
}

export default GymSection;
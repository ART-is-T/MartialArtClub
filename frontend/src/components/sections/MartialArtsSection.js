import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

function MartialArtsSection() {
  const [arts, setArts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/martial-arts")
      .then((res) => setArts(res.data))
      .catch((err) => {
        console.error("Ошибка загрузки направлений:", err);
        setArts([]);
      });
  }, []);

  return (
    <Box id="martialArts" sx={{ py: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Наши направления
      </Typography>

      {/* Desktop - сетка */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Grid container spacing={4} justifyContent="center">
          {arts.map((art) => (
            <Grid item key={art.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  width: 300,
                  height: 400,
                  margin: "auto",
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  },
                }}
                onClick={() => navigate(`/martial-art/${art.slug}`)}
              >
                <CardActionArea
                  sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <Box sx={{ height: "85%", width: "100%" }}>
                    <CardMedia
                      component="img"
                      image={art.iconImage || "/images/default.jpg"}
                      alt={art.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      height: "15%",
                      width: "100%",
                      bgcolor: "background.paper",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background-color 0.4s ease, opacity 0.4s ease",
                      opacity: 0.95,
                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.4)",
                        opacity: 0.7,
                        color: "#fff",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ fontWeight: "bold" }}
                    >
                      {art.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Mobile - горизонтальный скролл */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          overflowX: "auto",
          gap: 2,
          px: 2,
          py: 2,
          "&::-webkit-scrollbar": { display: "none" }, // скрыть полосу прокрутки
        }}
      >
        {arts.map((art) => (
          <Card
            key={art.id}
            sx={{
              minWidth: 250,
              height: 350,
              borderRadius: 4,
              flexShrink: 0, // чтобы все карточки одинаковой ширины
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              },
            }}
            onClick={() => navigate(`/martial-art/${art.slug}`)}
          >
            <CardActionArea
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Box sx={{ height: "75%", width: "100%" }}>
                <CardMedia
                  component="img"
                  image={art.iconImage || "/images/default.jpg"}
                  alt={art.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  height: "25%",
                  width: "100%",
                  bgcolor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.95,
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.4)",
                    opacity: 0.7,
                    color: "#fff",
                  },
                }}
              >
                <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
                  {art.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default MartialArtsSection;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { Box, Typography, Paper } from "@mui/material";

function MartialArtPage() {
  const { slug } = useParams();
  const [art, setArt] = useState(null);

  useEffect(() => {
    axios.get(`/api/martial-arts/slug/${slug}`)
      .then(res => setArt(res.data))
      .catch(err => console.error("Ошибка загрузки вида искусства", err));
  }, [slug]);

  if (!art) return <Typography>Загрузка...</Typography>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${art.bgImage})`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end"
      }}
    >
      <Paper sx={{ width: "70%", p: 4, bgcolor: "rgba(30,30,30,0.9)", color: "#fff" }}>
        <Typography variant="h3">{art.title}</Typography>
        <Typography>{art.description}</Typography>
      </Paper>
    </Box>
  );
}

export default MartialArtPage;
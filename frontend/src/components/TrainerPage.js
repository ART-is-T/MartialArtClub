import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import { useEffect, useState } from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";

function TrainerPage() {
  const { slug } = useParams(); // ⚡ вместо id
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    axios.get(`/api/trainers/slug/${slug}`)
      .then(res => setTrainer(res.data))
      .catch(err => console.error("Ошибка загрузки тренера", err));
  }, [slug]);

  if (!trainer) return <Typography>Загрузка...</Typography>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${trainer.backgroundImage})`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Paper sx={{ p: 4, textAlign: "center", backgroundColor: "rgba(30,30,30,0.9)", color: "#fff" }}>
        <Avatar src={trainer.photoUrl} sx={{ width: 200, height: 200, mb: 3, mx: "auto" }} />
        <Typography variant="h4">{trainer.name}</Typography>
        <Typography variant="h6" color="secondary">{trainer.martialArt}</Typography>
        <Typography>{trainer.bio}</Typography>
      </Paper>
    </Box>
  );
}

export default TrainerPage;
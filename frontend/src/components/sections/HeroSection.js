import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-scroll"; // smooth scroll библиотека

function HeroSection() {
  return (
    <Box
     id="hero"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/images/dojo.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Box sx={{ bgcolor: "rgba(0,0,0,0.7)", p: 4, borderRadius: 2 }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ color: "#b2dfdb" }} // 👈 светлый зелёный для заголовка
        >
          Martial Club
        </Typography>
        <Typography variant="h5" color="secondary" gutterBottom>
          Стань сильнее духом и телом
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="contact"
          smooth={true}
        >
          Записаться на пробное
        </Button>
      </Box>
    </Box>
  );
}
export default HeroSection;
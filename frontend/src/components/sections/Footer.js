import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ bgcolor: "background.paper", py: 3, textAlign: "center" }}>
      <Typography variant="body2">© ММФ БГУ 2025 | Все права защищены</Typography>
      <Typography variant="body2">Телефон: +375 (29) 123-45-67 | Город Минск, ул.Восточная 21</Typography>
    </Box>
  );
}
export default Footer;
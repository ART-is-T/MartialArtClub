import { Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import AddReviewForm from "../AddReviewForm";

function ContactSection() {
  return (
    <Box id="contact" sx={{ py: 8, px: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Левая колонка — форма контактов */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, backgroundColor: "background.paper" }}>
            <Typography variant="h5" gutterBottom>Связаться с нами</Typography>
            <TextField fullWidth label="Имя" margin="normal" />
            <TextField fullWidth label="Телефон/Email" margin="normal" />
            <TextField fullWidth label="Сообщение" margin="normal" multiline rows={4} />
            <Button fullWidth variant="contained" color="secondary" sx={{ mt: 2 }}>
              Отправить
            </Button>
          </Paper>
        </Grid>

        {/* Правая колонка — форма отзыва */}
        <Grid item xs={12} md={6}>
          <AddReviewForm />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactSection;
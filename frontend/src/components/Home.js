import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

const backgroundUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80'; // замени на свою картинку

function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1,
        }}
      />
      <Paper
        elevation={8}
        sx={{
          zIndex: 2,
          p: 5,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.95)',
          maxWidth: 500,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" fontWeight={700} color="primary" gutterBottom>
          Martial Club
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Добро пожаловать в наш клуб единоборств!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Тренировки для всех возрастов и уровней подготовки. Профессиональные тренеры, современный зал, дружелюбная атмосфера.
        </Typography>
        <Button variant="contained" color="primary" href="/register" sx={{ mr: 2 }}>
          Зарегистрироваться
        </Button>
        <Button variant="outlined" color="primary" href="/login">
          Войти
        </Button>
      </Paper>
    </Box>
  );
}

export default Home;
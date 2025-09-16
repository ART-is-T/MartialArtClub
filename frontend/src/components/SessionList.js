import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardActions
} from '@mui/material';
import SportsMmaIcon from '@mui/icons-material/SportsMma';

function SessionList() {
  const [sessions, setSessions] = useState([]);
  const isAuth = !!localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:8080/api/sessions')
      .then(res => setSessions(res.data))
      .catch(() => setSessions([]));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Список тренировок
      </Typography>
      <Grid container spacing={3}>
        {sessions.map(session => (
          <Grid item xs={12} md={6} key={session.id}>
            <Card
              sx={{
                background: 'rgba(44,49,58,0.98)',
                color: '#fff',
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <SportsMmaIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">{session.martialArt}</Typography>
                </Box>
                <Typography color="text.secondary">
                  {new Date(session.startTime).toLocaleString()} — {session.location}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Тренер: {session.coach?.fullName}
                </Typography>
              </CardContent>
              {isAuth && (
                <CardActions>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/book/${session.id}`}
                    fullWidth
                  >
                    Записаться
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      {!isAuth && (
        <Typography color="text.secondary" sx={{ mt: 3 }}>
          Войдите, чтобы записаться на тренировку
        </Typography>
      )}
    </Box>
  );
}

export default SessionList;
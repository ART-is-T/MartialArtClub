import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';

function BookingForm() {
  const { sessionId } = useParams();
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const studentId = localStorage.getItem('userId');
    try {
      await axios.post('http://localhost:8080/api/bookings', {
        student: { id: Number(studentId) },
        session: { id: Number(sessionId) },
        attended: false
      });
      setMessage('Бронирование успешно!');
    } catch (err) {
      setMessage('Ошибка бронирования');
    }
  };

  return (
    <div className="container">
      <h2>Бронирование тренировки #{sessionId}</h2>
      <form onSubmit={handleSubmit}>
        <button className="book-btn" type="submit">Записаться</button>
      </form>
      <div>{message}</div>
    </div>
  );
}

export default BookingForm;
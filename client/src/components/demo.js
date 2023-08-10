import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/material';

export default function Demo({ socket, userId }) {
  const [value, setValue] = useState(30);
  const [message, setMessage] = useState('');

  socket.on('message', (data) => {
    setMessage(data);
  });

  const handleClick = () => {
    console.log(`Message envoyé au server`);
    socket.emit('message', `Message de : ${userId}`);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSliderMouseUp = () => {
    console.log('Slider value on mouse up:', value);
    socket.emit('slider', value);
  };

  return (
    <Paper elevation={8} sx={{width:'40%', p:'2vh'}}>
      <Typography>Showcase</Typography>
      <Typography>User ID: {userId}</Typography>
      <Button variant="contained" color="primary" onClick={handleClick} style={{ marginTop: '16px' }}>
        Send Message
      </Button>
      <p>{message}</p>
      <Box
        style={{
          width: '80%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '16px',
          marginLeft: 'auto',
          marginRight: 'auto' // Ajout de marges automatiques pour centrer horizontalement
        }}
      >
        <Slider aria-label="Volume" value={value} onChange={handleChange} onMouseUp={handleSliderMouseUp} />
        <Typography>Value:</Typography>
        <Typography>{value}</Typography>
      </Box>

    </Paper>
  );
}

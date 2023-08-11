import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Eno({ socket, userId }) {
  return (
    <Paper elevation={8} sx={{m: '2vh', p: '2vh'}}>
      <Typography>Projet Enola</Typography>
      <Typography>En cours ...</Typography>
    </Paper>
  );
}

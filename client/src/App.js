import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Demo from './components/demo'; // Respectez la casse du nom de fichier
import Eno from './components/eno';   // Mettez à jour le chemin d'importation

const socket = io('http://localhost:5000');

export default function App() {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    socket.on('userId', (data) => {
      setUserId(data);
    });
  }, []);

  return (
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        sx={{mt:'2vh'}}
      >

        <Demo socket={socket} userId={userId} />
        <Eno socket={socket} userId={userId} />

      </Grid>
  );
}

import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import io from 'socket.io-client';
const socket = io('http://localhost:5000');

function App() {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    socket.on('userId', (data) => {
      setUserId(data);
    });

    socket.on('message', (data) => {
      console.log(`Received from server (User ${userId}):`, data);
    });
  }, [userId]);

  const handleClick = () => {
    console.log(`Button clicked by User ${userId}`);
    socket.emit('message', `Hello world from User ${userId}`);
  };

  const [value, setValue] = React.useState(30);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    socket.emit('slider', newValue);
  };

  return (
    <><div className="App">
      <p>User ID: {userId}</p>
      <button onClick={handleClick}>Hello World</button>
    </div><Box sx={{ width: 200 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown />
          <Slider aria-label="Volume" value={value} onChange={handleChange} />
          <VolumeUp />
        </Stack>
      </Box></>
  );
}

export default App;
 
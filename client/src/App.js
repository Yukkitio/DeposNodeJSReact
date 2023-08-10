import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  useEffect(() => {
    socket.on('message', (data) => {
      console.log('Received from server:', data);
    });
  }, []);

  const handleClick = () => {
    console.log('Button clicked');
    socket.emit('message', 'Hello world');
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Send Message</button>
    </div>
  );
}

export default App;

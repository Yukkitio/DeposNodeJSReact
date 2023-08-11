import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';

export default function Demo({ socket, userId }) {
  // État local pour différents composants
  const [valeurSlider, setValeurSlider] = useState(30);
  const [message, setMessage] = useState('');
  const [valeurToggleButton, setValeurToggleButton] = useState('bouton1');
  const [valeurChampTexte, setValeurChampTexte] = useState('');
  const [valeurSwitch, setValeurSwitch] = useState(false);
  const [valeurSelect, setValeurSelect] = useState('option1');
  const [valeurCheckbox, setValeurCheckbox] = useState(false);

  // Gestionnaire d'événement pour le bouton de bascule (ToggleButton)
  const gererChangementToggleButton = (event, nouvelleValeur) => {
    setValeurToggleButton(nouvelleValeur);
    socket.emit('toggleButton', nouvelleValeur);
  };

  // Gestionnaire d'événement pour le champ de texte (TextField)
  const gererChangementChampTexte = (event) => {
    setValeurChampTexte(event.target.value);
    socket.emit('text', event.target.value);
  };

  // Gestionnaire d'événement pour l'interrupteur (Switch)
  const gererChangementSwitch = () => {
    setValeurSwitch(!valeurSwitch);
    socket.emit('switch', !valeurSwitch);
  };

  // Gestionnaire d'événement pour la liste déroulante (Select)
  const gererChangementSelect = (event) => {
    setValeurSelect(event.target.value);
    socket.emit('select', event.target.value);
  };

  // Gestionnaire d'événement pour la case à cocher (Checkbox)
  const gererChangementCheckbox = (event) => {
    setValeurCheckbox(event.target.checked);
    socket.emit('checkbox', event.target.checked);
  };

  // Gestionnaire d'événement pour le bouton "Parler au serveur"
  const gererCliqueButton = () => {
    console.log(`Message envoyé au serveur`);
    socket.emit('message', `Salut ! Je suis un client`);
  };
  // Écouteur d'événement pour recevoir les messages du serveur
  socket.on('message', (data) => {
    setMessage(data);
  });

  // Gestionnaire d'événement pour le changement du Slider
  const gererChangementSlider = (event, nouvelleValeur) => {
    setValeurSlider(nouvelleValeur);
  };
  // Gestionnaire d'événement pour le relâchement de la souris après avoir utilisé le Slider
  const gererRelachementSlider = () => {
    console.log('Valeur du Slider au relâchement de la souris :', valeurSlider);
    socket.emit('slider', valeurSlider);
  };

  return (
    <Paper elevation={8} sx={{ width: '40%', p: '2vh' }}>
      <Typography>Showcase</Typography>
      <Typography>ID de l'utilisateur : {userId}</Typography>

      {/* Toggle Button */}
      <Paper elevation={4} sx={{ m: '2vh', p: '2vh' }}>
        <ToggleButtonGroup
          value={valeurToggleButton}
          exclusive
          onChange={gererChangementToggleButton}
        >
          <ToggleButton value="button1">Bouton 1</ToggleButton>
          <ToggleButton value="button2">Bouton 2</ToggleButton>
          <ToggleButton value="button3">Bouton 3</ToggleButton>
        </ToggleButtonGroup>
      </Paper>

      {/* Text Field */}
      <Paper elevation={4} sx={{ m: '2vh', p: '2vh' }}>
        <TextField
          label="Text Field"
          value={valeurChampTexte}
          onChange={gererChangementChampTexte}
        />
      </Paper>

      {/* Switch */}
      <Paper elevation={4} sx={{ m: '2vh', p: '2vh' }}>
        <Typography>Switch: {valeurSwitch ? 'On' : 'Off'}</Typography>
        <Switch checked={valeurSwitch} onChange={gererChangementSwitch} />
      </Paper>

      {/* Select */}
      <Paper elevation={4} sx={{ m: '2vh', p: '2vh' }}>
        <Select
          value={valeurSelect}
          onChange={gererChangementSelect}
          label="Select"
        >
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      </Paper>

      {/* Checkbox */}
      <Paper elevation={4} sx={{ m: '2vh', p: '2vh' }}>
        <Typography>Checkbox: {valeurCheckbox ? 'Checked' : 'Unchecked'}</Typography>
        <Checkbox
          checked={valeurCheckbox}
          onChange={gererChangementCheckbox}
        />
      </Paper>

      {/* Slider */}
      <Paper elevation={4} sx={{ m: '2vh', p: '2vh' }}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
          <Slider aria-label="Volume" value={valeurSlider} onChange={gererChangementSlider} onMouseUp={gererRelachementSlider} />
          <Typography>Valeur : {valeurSlider}</Typography>
        </Stack>
      </Paper>

      {/* Button */}
      <Paper elevation={4} sx={{ m: '2vh', p: '2vh' }}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
          <Button variant="contained" color="primary" onClick={gererCliqueButton}>Parler au serveur</Button>
          <Typography>{message}</Typography>
        </Stack>
      </Paper>
    </Paper>
  );
}

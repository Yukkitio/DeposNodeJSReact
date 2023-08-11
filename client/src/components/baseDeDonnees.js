import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function BaseDeDonnes({ socket, userId }) {
  const [valeurSelectBDD, setValeurSelectBDD] = useState('BDD1');
  const [valeurSelectTable, setValeurSelectTable] = useState('Table1');

  const handleSelectBDD = (event) => {
    setValeurSelectBDD(event.target.value);
  };
  const handleSelectTABLE = (event) => {
    setValeurSelectTable(event.target.value);
  };

  return (
    <Paper elevation={8} sx={{ m: '2vh', p: '2vh' }}>
      <Typography>Connection BDD</Typography>

      <Paper elevation={4} sx={{ m: '2vh', p: '2vh' }}>
        <Stack direction="row" spacing={2}>
            <TextField label="USER" value="admin" sx={{ pb: '1vh'}}/>
            <TextField label="PASSWORD" value="admin" sx={{ pb: '1vh'}}/>
        </Stack>
        <TextField multiline defaultValue="CONNEXION OUPUT" rows={4} sx={{width:'100%', pb: '1vh'}}/>
        <Button variant="contained" sx={{ width:'100%'}}>Connexion</Button>
      </Paper>

      <Paper elevation={4} sx={{ m: '2vh', p: '2vh' }}>
        <Stack direction="row" spacing={2}>
            <Stack spacing={2} sx={{ pb: '1vh'}}>
                <Box>
                    <Select value={valeurSelectBDD} onChange={handleSelectBDD} label="Select">
                        <MenuItem value="BDD1">BDD 1</MenuItem>
                        <MenuItem value="BDD2">BDD 2</MenuItem>
                        <MenuItem value="BDD3">BDD 3</MenuItem>
                    </Select>
                </Box>

                <Box>
                    <Select value={valeurSelectTable} onChange={handleSelectTABLE} label="Select">
                        <MenuItem value="Table1">Table 1</MenuItem>
                        <MenuItem value="Table2">Table 2</MenuItem>
                        <MenuItem value="Table3">Table 3</MenuItem>
                    </Select>
                </Box>
            </Stack>
            <TextField multiline defaultValue="BDD OUPUT" rows={4} sx={{width:'100%'}}/>
        </Stack>
        <Button variant="contained" sx={{ width:'100%'}}>Voir les données</Button>
      </Paper>

      <Paper elevation={4} sx={{ m: '2vh', p: '2vh' }}>
        <TextField multiline defaultValue="Tableau" rows={4} sx={{ width:'100%'}}/>
      </Paper>

    </Paper>
  );
}

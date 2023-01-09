import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { useState } from 'react';

function Navbar() {
  const [mode, setMode] = useState('lb');
  console.log('Navbar ~ mode', mode);

  const darkTheme = createTheme({
    palette: { mode: 'dark' },
  });

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: string
  ) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };
  return (
    <Box className="navbar py-5 bg-slate-700 text-white mb-8 flex  justify-around">
      <h1 className="text-3xl">Barbell Calculator</h1>
      <ThemeProvider theme={darkTheme}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
        >
          <ToggleButton value="lb">lb</ToggleButton>
          <ToggleButton value="kg">kg</ToggleButton>
        </ToggleButtonGroup>
      </ThemeProvider>
    </Box>
  );
}

export default Navbar;

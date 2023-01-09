import { Mode } from '../data/types';
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  createTheme,
  ThemeProvider,
} from '@mui/material';

interface Props {
  mode: Mode;
  updateMode: (newMode: Mode) => void;
}

function Navbar({ updateMode, mode }: Props) {
  const darkTheme = createTheme({
    palette: { mode: 'dark' },
  });

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: Mode
  ) => {
    if (newMode !== null) {
      updateMode(newMode);
    }
  };
  return (
    <Box className="navbar py-5 bg-slate-700 text-white mb-8">
      <div className="flex justify-between  mx-4">
        <h1 className="text-3xl self-center">Barbell Calculator</h1>
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
      </div>
    </Box>
  );
}

export default Navbar;

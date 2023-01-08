import './App.css';
import { useEffect, useState } from 'react';
import {
  plateValues,
  barWeights,
  currentYear,
  INITIAL_BAR_WEIGHT,
  INITIAL_LOADOUT,
} from './data/variables';
import { inPlatesArr, calculateLoadout } from './data/functions';
import { Loadout } from './data/types';
import { calculateTotalPlateWeight } from './data/functions';
import { Box } from '@mui/material';
import {
  INITIAL_PLATES,
  INITIAL_TARGET_WEIGHT,
  INITIAL_INPUT_DATA,
} from './data/variables';
import {
  Table,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
  Button,
} from '@mui/material';
import Form from './sections/Form';
import Navbar from './sections/Navbar';
import { InputData } from './data/interfaces';
import Results from './sections/Results';

function App() {
  const [loadout, setLoadout] = useState<Loadout>(INITIAL_LOADOUT);
  const [inputData, setInputData] = useState<InputData>(INITIAL_INPUT_DATA);

  const [totalPlateWeight, setTotalPlateWeight] = useState<number>(0);

  useEffect(() => {
    const { plates, barWeight, targetWeight } = inputData;
    setLoadout(calculateLoadout(barWeight!, plates!, targetWeight!));
  }, [inputData]);

  // Functions
  const updateLoadout = (updatedLoadout: Loadout) => {
    const updatedTotalPlateWeight = calculateTotalPlateWeight(updatedLoadout);

    setTotalPlateWeight(updatedTotalPlateWeight);
    setLoadout(updatedLoadout);
  };

  const updateInputData = (updatedInputData: InputData) => {
    setInputData({ ...inputData, ...updatedInputData });
  };

  // Event Handlers

  return (
    <Box className="app__container relative min-h-screen">
      <Box className="app__content pb-20">
        {/* Title */}
        <Navbar />
        <Box className="max-w-3xl mx-auto">
          <Form
            updateLoadout={updateLoadout}
            updateInputData={updateInputData}
          />
          <Results
            loadout={loadout}
            updateLoadout={updateLoadout}
            inputData={inputData}
          />
        </Box>
      </Box>
      <footer className=" bg-slate-800 text-white text-center absolute bottom-0 w-full h-20 flex justify-center items-center">
        <p className="text-xs">{`Karl Cereno ${currentYear}`}</p>
      </footer>
    </Box>
  );
}

export default App;

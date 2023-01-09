import { useEffect, useState } from 'react';
import {
  INITIAL_LOADOUT,
  INITIAL_INPUT_DATA,
  plateValuesKg,
} from './data/variables';
import { calculateLoadout } from './data/functions';
import { Loadout, Mode } from './data/types';
import { InputData } from './data/interfaces';
import { Box } from '@mui/material';
import Form from './sections/Form';
import Navbar from './sections/Navbar';
import Results from './sections/Results';
import './App.css';
import Footer from './sections/Footer';
import { plateValuesLb } from './data/variables';

function App() {
  const [loadout, setLoadout] = useState<Loadout>(INITIAL_LOADOUT);
  const [inputData, setInputData] = useState<InputData>(INITIAL_INPUT_DATA);
  console.log('App ~ inputData', inputData);

  const [mode, setMode] = useState<Mode>('lb');

  useEffect(() => {
    // console.log('useffect triggered');
    // const { plates, barWeight, targetWeight } = inputData;
    // setLoadout(calculateLoadout(barWeight!, plates!, targetWeight!));
  }, [inputData]);

  const updateLoadout = (newLoadout: Loadout) => {
    setLoadout(newLoadout);
  };

  const updateInputData = (newInputData: InputData) => {
    setInputData({ ...inputData, ...newInputData });
  };

  const updatedMode = (newMode: Mode) => {
    if (newMode === 'kg') {
      setLoadout(calculateLoadout(20, plateValuesKg, 0));
    }

    if (newMode === 'lb') {
      setLoadout(calculateLoadout(45, plateValuesLb, 0));
    }

    setMode(newMode);
  };

  return (
    <Box className="app__container relative min-h-screen">
      <Box className="app__content pb-20">
        <Navbar
          mode={mode}
          updateMode={updatedMode}
        />
        <Box className="content__wrapper max-w-3xl mx-auto">
          <Form
            updateInputData={updateInputData}
            mode={mode}
            updateLoadout={updateLoadout}
          />
          <Results
            loadout={loadout}
            updateLoadout={updateLoadout}
            inputData={inputData}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;

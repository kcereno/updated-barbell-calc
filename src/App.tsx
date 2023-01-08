import { useEffect, useState } from 'react';
import { INITIAL_LOADOUT, INITIAL_INPUT_DATA } from './data/variables';
import { calculateLoadout } from './data/functions';
import { Loadout } from './data/types';
import { InputData } from './data/interfaces';
import { Box } from '@mui/material';
import Form from './sections/Form';
import Navbar from './sections/Navbar';
import Results from './sections/Results';
import './App.css';
import Footer from './sections/Footer';

function App() {
  const [loadout, setLoadout] = useState<Loadout>(INITIAL_LOADOUT);
  const [inputData, setInputData] = useState<InputData>(INITIAL_INPUT_DATA);

  useEffect(() => {
    const { plates, barWeight, targetWeight } = inputData;
    setLoadout(calculateLoadout(barWeight!, plates!, targetWeight!));
  }, [inputData]);

  const updateLoadout = (newLoadout: Loadout) => {
    setLoadout(newLoadout);
  };

  const updateInputData = (newInputData: InputData) => {
    setInputData({ ...inputData, ...newInputData });
  };

  return (
    <Box className="app__container relative min-h-screen">
      <Box className="app__content pb-20">
        <Navbar />
        <Box className="content__wrapper max-w-3xl mx-auto">
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
      <Footer />
    </Box>
  );
}

export default App;

import {
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  TextField,
} from '@mui/material';
import './App.css';
import { useState } from 'react';

function App() {
  const [barWeight, setBarWeight] = useState<number>(0);
  const [availablePlates, setAvailablePlates] = useState<number[]>([]);
  console.log(availablePlates);

  const handleSetBarWeight = (
    event: React.MouseEvent<HTMLElement>,
    newBarWeight: number
  ) => {
    setBarWeight(newBarWeight);
  };

  const handleSetAvailablePlates = (
    event: React.MouseEvent<HTMLElement>,
    newAvailablePlates: number[]
  ) => {
    setAvailablePlates(newAvailablePlates);
  };

  interface PlateValue {
    value: string;
    weight: number;
  }

  const plateValues: PlateValue[] = [
    { value: '2.5lbs', weight: 2.5 },
    { value: '5lbs', weight: 5 },
    { value: '10lbs', weight: 10 },
    { value: '15lbs', weight: 15 },
    { value: '25lbs', weight: 25 },
    { value: '35lbs', weight: 35 },
    { value: '45lbs', weight: 45 },
    { value: '55lbs', weight: 55 },
  ];

  return (
    <div className="App mx-2">
      <div className="title">
        <h1>Barbell Calculator</h1>
        <h3>By K</h3>
      </div>

      <div className="inputs">
        <div className="input__bar-weight">
          <h2>Bar Weight</h2>
          <ToggleButtonGroup
            exclusive
            value={barWeight}
            onChange={handleSetBarWeight}
          >
            <ToggleButton value="0">No Bar</ToggleButton>
            <ToggleButton value="35">35 lbs</ToggleButton>
            <ToggleButton value="45">45 lbs</ToggleButton>
            <ToggleButton value="60">60 lbs</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="input__available-plates">
          <h2>Available Plates</h2>
          <div className="flex flex-wrap">
            {plateValues.map((plateValue) => (
              <div className="m-1">
                <ToggleButton
                  key={plateValue.value}
                  value={plateValue.value}
                  selected={false}
                >
                  {plateValue.value}
                </ToggleButton>
              </div>
            ))}
          </div>
        </div>
        <div className="input__target-weight">
          <TextField
            label="Target Weight"
            variant="outlined"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

export default App;

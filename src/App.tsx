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
import './App.css';
import { useEffect, useState } from 'react';
import { plateValues, barWeights } from './data/variables';
import {
  inAvailablePlatesArr,
  calculateLoadout,
  generateLoadoutTemplate,
} from './data/functions';
import { LoadoutEntry } from './data/interfaces';

function App() {
  const [barWeight, setBarWeight] = useState<number>(45);
  const [availablePlates, setAvailablePlates] = useState<number[]>([
    2.5, 5, 10, 15, 25, 35, 45,
  ]);
  const [targetWeight, setTargetWeight] = useState<number>(225);
  const [loadout, setLoadout] = useState<LoadoutEntry[]>([]);

  useEffect(() => {
    const INITIAL_LOADOUT = generateLoadoutTemplate(availablePlates);
    setLoadout(INITIAL_LOADOUT);
  }, [availablePlates]);

  // Event Handlers
  const handleChangeBarWeight = (
    event: React.MouseEvent<HTMLElement>,
    newBarWeight: number
  ) => {
    event.preventDefault();
    setBarWeight(newBarWeight);
  };

  const handleChangeAvailablePlates = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    selectedPlate: number
  ) => {
    event.preventDefault();
    let updatedAvailablePlates: number[] = [...availablePlates];

    inAvailablePlatesArr(selectedPlate, availablePlates)
      ? (updatedAvailablePlates = updatedAvailablePlates.filter(
          (plate) => plate !== selectedPlate
        ))
      : updatedAvailablePlates.push(selectedPlate);

    setAvailablePlates(updatedAvailablePlates);
  };

  const handleChangeTargetWeight = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedTargetWeight = event.target.value;
    setTargetWeight(Number(updatedTargetWeight));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    calculateLoadout(barWeight, availablePlates, targetWeight);
  };

  const handleReset = () => [
    setBarWeight(0),
    setAvailablePlates([]),
    setTargetWeight(0),
  ];

  // Edit Buttons
  const editButtons = () => {
    return (
      <ButtonGroup>
        <Button>One</Button>
      </ButtonGroup>
    );
  };

  return (
    <div className="App mx-2">
      {/* Title */}
      <div className="title">
        <h1>Barbell Calculator</h1>
        <h3>By K</h3>
      </div>

      {/* Inputs */}
      <form
        onSubmit={handleSubmit}
        className="inputs mb-5"
      >
        <div className="input__bar-weight">
          <h2>Bar Weight</h2>
          <ToggleButtonGroup
            exclusive
            value={barWeight}
            onChange={handleChangeBarWeight}
          >
            {barWeights.map((bar) => (
              <ToggleButton
                key={bar.entry}
                value={bar.value}
              >
                {bar.entry}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>

        <div className="input__available-plates">
          <h2>Available Plates</h2>
          <div className="flex flex-wrap">
            <ToggleButtonGroup>
              {plateValues.map((plate) => (
                <ToggleButton
                  key={plate.entry}
                  value={plate.value}
                  selected={inAvailablePlatesArr(plate.value, availablePlates)}
                  onClick={handleChangeAvailablePlates}
                >
                  {plate.entry}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
        </div>
        <div className="input__target-weight">
          <TextField
            label="Target Weight"
            variant="outlined"
            fullWidth
            onChange={handleChangeTargetWeight}
          />
        </div>
        <div className="buttons">
          <Button type="submit">Calculate</Button>
          <Button
            type="reset"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </form>

      {/* Results */}
      <div className="resuts">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plate</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Per Side</TableCell>
                <TableCell align="right">Net Weight</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadout.map((entry) => (
                <TableRow key={entry.plateValue}>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    {entry.plateValue}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <ButtonGroup size="small">
                        <Button>+</Button>
                        <Button>-</Button>
                      </ButtonGroup>
                    }
                  </TableCell>
                  <TableCell align="right">{entry.perSide}</TableCell>
                  <TableCell align="right">{entry.netWeight}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Bar Weight</TableCell>
                <TableCell align="center">45lbs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Plate Weight</TableCell>
                <TableCell align="center">200lbs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total Weight</TableCell>
                <TableCell align="center">245lbs</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;

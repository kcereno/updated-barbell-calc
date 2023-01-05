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
import { useState } from 'react';
import { plateValues, data } from './data/variables';
import { inAvailablePlatesArr } from './data/functions';

function App() {
  const [barWeight, setBarWeight] = useState<number>(0);
  const [availablePlates, setAvailablePlates] = useState<number[]>([]);
  const [targetWeight, setTargetWeight] = useState<number>();
  // console.log('App ~ barWeight', barWeight);
  // console.log('App ~ availablePlates', availablePlates);

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
      <div className="inputs mb-5">
        <div className="input__bar-weight">
          <h2>Bar Weight</h2>
          <ToggleButtonGroup
            exclusive
            value={barWeight}
            onChange={handleChangeBarWeight}
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
            <ToggleButtonGroup>
              {plateValues.map((plate) => (
                <div
                  className="m-1"
                  key={plate.entry}
                >
                  <ToggleButton
                    value={plate.value}
                    selected={inAvailablePlatesArr(
                      plate.value,
                      availablePlates
                    )}
                    onClick={handleChangeAvailablePlates}
                  >
                    {plate.entry}
                  </ToggleButton>
                </div>
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
            value={targetWeight}
          />
        </div>
      </div>

      {/* Results */}
      {/* <div className="resuts">
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
              {data.map((entry) => (
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
      </div> */}
    </div>
  );
}

export default App;

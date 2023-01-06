import './App.css';
import { useEffect, useState } from 'react';
import { plateValues, barWeights } from './data/variables';
import { inAvailablePlatesArr, calculateLoadout } from './data/functions';
import { Loadout } from './data/types';
import { calculateTotalPlateWeight } from './data/functions';
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

function App() {
  const [barWeight, setBarWeight] = useState<number>(45);
  const [availablePlates, setAvailablePlates] = useState<number[]>([
    2.5, 5, 10, 15, 25, 35, 45, 55,
  ]);
  const [targetWeight, setTargetWeight] = useState<number>(0);
  const [loadout, setLoadout] = useState<Loadout>([]);
  const [totalPlateWeight, setTotalPlateWeight] = useState<number>(0);

  useEffect(() => {
    setLoadout(calculateLoadout(barWeight, availablePlates, targetWeight));
  }, [availablePlates, barWeight, targetWeight]);

  // Functions
  const updateLoadout = (updatedLoadout: Loadout) => {
    const updatedTotalPlateWeight = calculateTotalPlateWeight(updatedLoadout);

    setTotalPlateWeight(updatedTotalPlateWeight);
    setLoadout(updatedLoadout);
  };

  // Event Handlers
  const handleChangeBarWeight = (
    event: React.MouseEvent<HTMLElement>,
    newBarWeight: number
  ) => {
    if (newBarWeight || newBarWeight === 0) setBarWeight(newBarWeight);
  };

  const handleChangeAvailablePlates = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    updatedAvailablePlates: number[]
  ) => {
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

    const newLoadout = calculateLoadout(
      barWeight,
      availablePlates,
      targetWeight
    );

    updateLoadout(newLoadout);
  };

  const handleReset = () => [
    setBarWeight(0),
    setAvailablePlates([]),
    setTargetWeight(0),
  ];

  const handleClickAddButton = (plate: number) => {
    const updatedLoadout = loadout.map((entry) => {
      if (entry.plateValue === plate) {
        return {
          ...entry,
          perSide: entry.perSide + 2,
          netWeight: entry.netWeight + plate * 2,
        };
      }
      return entry;
    });

    updateLoadout(updatedLoadout);
  };

  const handleClickSubtractButton = (plate: number) => {
    const updatedLoadout = loadout.map((entry) => {
      if (entry.plateValue === plate) {
        return {
          ...entry,
          perSide: entry.perSide - 2,
          netWeight: entry.netWeight - plate * 2,
        };
      } else {
        return entry;
      }
    });

    updateLoadout(updatedLoadout);
  };

  // Edit Buttons

  return (
    <div className="App ">
      {/* Title */}
      <div className="title text-center py-5 bg-slate-700 text-white mb-10">
        <h1 className="text-3xl">Barbell Calculator</h1>
      </div>

      {/* Inputs */}
      <form
        onSubmit={handleSubmit}
        className="inputs mb-5 mx-3"
      >
        <div className="input__bar-weight mb-5">
          <h2 className="uppercase mb-2">Bar Weight</h2>
          <ToggleButtonGroup
            exclusive
            value={barWeight}
            onChange={handleChangeBarWeight}
            size="large"
            color="primary"
            fullWidth
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

        <div className="input__available-plates mb-5 ">
          <h2 className="uppercase mb-3">Available Plates</h2>
          <div className="flex flex-col">
            <ToggleButtonGroup
              value={availablePlates}
              onChange={handleChangeAvailablePlates}
              color="primary"
              size="large"
              fullWidth
            >
              {plateValues.map((plate, index) => {
                if (index < 4)
                  return (
                    <ToggleButton
                      key={plate}
                      value={plate}
                      selected={inAvailablePlatesArr(plate, availablePlates)}
                    >
                      {`${plate} lbs`}
                    </ToggleButton>
                  );

                return null;
              })}
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={availablePlates}
              onChange={handleChangeAvailablePlates}
              color="primary"
              size="large"
              fullWidth
            >
              {plateValues.map((plate, index) => {
                if (index >= 4)
                  return (
                    <ToggleButton
                      key={plate}
                      value={plate}
                      selected={inAvailablePlatesArr(plate, availablePlates)}
                    >
                      {`${plate} lbs`}
                    </ToggleButton>
                  );

                return null;
              })}
            </ToggleButtonGroup>
          </div>
        </div>

        <div className="input__target-weight mb-5">
          <TextField
            label="Target Weight"
            variant="outlined"
            fullWidth
            onChange={handleChangeTargetWeight}
          />
        </div>
        <div className="buttons flex gap-1">
          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Calculate
          </Button>
          <Button
            type="reset"
            onClick={handleReset}
            variant="outlined"
            color="error"
            size="large"
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
                        <Button
                          onClick={() => {
                            handleClickAddButton(entry.plateValue);
                          }}
                        >
                          +
                        </Button>
                        <Button
                          disabled={entry.perSide === 0}
                          onClick={() => {
                            handleClickSubtractButton(entry.plateValue);
                          }}
                        >
                          -
                        </Button>
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
                <TableCell align="center">{barWeight}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Plate Weight</TableCell>
                <TableCell align="center">{totalPlateWeight}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total Weight</TableCell>
                <TableCell align="center">
                  {barWeight + totalPlateWeight}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;

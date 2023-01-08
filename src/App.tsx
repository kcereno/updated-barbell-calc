import './App.css';
import { useEffect, useState } from 'react';
import {
  plateValues,
  barWeights,
  currentYear,
  INITIAL_BAR_WEIGHT,
  INITIAL_LOADOUT,
} from './data/variables';
import { inplatesArr, calculateLoadout } from './data/functions';
import { Loadout } from './data/types';
import { calculateTotalPlateWeight } from './data/functions';
import { Box } from '@mui/material';
import { INITIAL_PLATES, INITIAL_TARGET_WEIGHT } from './data/variables';
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
  const [barWeight, setBarWeight] = useState<number>(INITIAL_BAR_WEIGHT);
  const [plates, setPlates] = useState<number[]>(INITIAL_PLATES);
  const [targetWeight, setTargetWeight] = useState<number>(
    INITIAL_TARGET_WEIGHT
  );
  const [loadout, setLoadout] = useState<Loadout>(INITIAL_LOADOUT);

  const [totalPlateWeight, setTotalPlateWeight] = useState<number>(0);
  const [formIsValid, setFormIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setLoadout(calculateLoadout(barWeight, plates, targetWeight));
  }, [plates, barWeight, targetWeight]);

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

  const handleChangeplates = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    updatedplates: number[]
  ) => {
    setPlates(updatedplates);
  };

  const handleChangeTargetWeight = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedTargetWeight = event.target.value;
    setTargetWeight(Number(updatedTargetWeight));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (plates.length === 0) {
      setErrorMessage('At lest one plate must be selected');
      setFormIsValid(false);
      return;
    }

    if (targetWeight < barWeight) {
      setErrorMessage('Target Weight must be greater than Bar Weight');
      setFormIsValid(false);
      return;
    }

    const newLoadout = calculateLoadout(barWeight, plates, targetWeight);
    setFormIsValid(true);
    updateLoadout(newLoadout);
  };

  const handleReset = () => [
    setBarWeight(0),
    setPlates([]),
    setTargetWeight(0),
    setFormIsValid(true),
  ];

  const handleClickAddButton = (plate: number) => {
    const updatedLoadout = loadout.map((entry) => {
      if (entry.plateValue === plate) {
        return {
          ...entry,
          perSide: entry.perSide + 1,
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
          perSide: entry.perSide - 1,
          netWeight: entry.netWeight - plate * 2,
        };
      } else {
        return entry;
      }
    });

    updateLoadout(updatedLoadout);
  };

  return (
    <Box className="app__container relative min-h-screen">
      <Box className="app__content pb-20">
        {/* Title */}
        <Box className="title text-center py-5 bg-slate-700 text-white mb-8">
          <h1 className="text-3xl">Barbell Calculator</h1>
        </Box>
        <Box className="max-w-3xl mx-auto">
          <Box
            component="form"
            className="mx-3 mb-8"
            onSubmit={handleSubmit}
          >
            <Box className="input__bar-weight mb-4">
              <h2 className="uppercase mb-2">Bar Weight</h2>
              <ToggleButtonGroup
                exclusive
                value={barWeight}
                onChange={handleChangeBarWeight}
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
            </Box>

            <Box className="input__available-plates mb-6 ">
              <h2 className="uppercase mb-2">Available Plates</h2>
              <Box className="flex flex-col">
                <ToggleButtonGroup
                  value={plates}
                  onChange={handleChangeplates}
                  color="primary"
                  fullWidth
                >
                  {plateValues.map((plate, index) => {
                    if (index < 4)
                      return (
                        <ToggleButton
                          key={plate}
                          value={plate}
                          selected={inplatesArr(plate, plates)}
                        >
                          {`${plate} lbs`}
                        </ToggleButton>
                      );

                    return null;
                  })}
                </ToggleButtonGroup>
                <ToggleButtonGroup
                  value={plates}
                  onChange={handleChangeplates}
                  color="primary"
                  fullWidth
                >
                  {plateValues.map((plate, index) => {
                    if (index >= 4)
                      return (
                        <ToggleButton
                          key={plate}
                          value={plate}
                          selected={inplatesArr(plate, plates)}
                        >
                          {`${plate} lbs`}
                        </ToggleButton>
                      );

                    return null;
                  })}
                </ToggleButtonGroup>
              </Box>
            </Box>

            <Box className="input__target-weight mb-6">
              <TextField
                label="Target Weight"
                variant="outlined"
                fullWidth
                onChange={handleChangeTargetWeight}
                type="number"
                error={!formIsValid}
                helperText={!formIsValid && errorMessage}
              />
            </Box>
            <Box className="buttons flex gap-1 justify-center">
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
            </Box>
          </Box>

          {/* Results */}
          {plates.length > 0 && (
            <Box className="results mb-10">
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Plate</TableCell>
                      <TableCell align="center">Edit</TableCell>
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
                      <TableCell colSpan={2} />
                      <TableCell colSpan={1}>
                        <span className="font-bold">Bar</span>
                      </TableCell>
                      <TableCell align="center">{barWeight}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} />
                      <TableCell colSpan={1}>
                        <span className="font-bold">Plates</span>
                      </TableCell>
                      <TableCell align="center">{totalPlateWeight}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} />
                      <TableCell colSpan={1}>
                        <span className="font-bold">Total</span>
                      </TableCell>
                      <TableCell align="center">
                        {barWeight + totalPlateWeight}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </Box>
      <footer className=" bg-slate-800 text-white text-center absolute bottom-0 w-full h-20 flex justify-center items-center">
        <p className="text-xs">{`Karl Cereno ${currentYear}`}</p>
      </footer>
    </Box>
  );
}

export default App;

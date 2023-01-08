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

function App() {
  const [loadout, setLoadout] = useState<Loadout>(INITIAL_LOADOUT);
  console.log('App ~ loadout', loadout);
  const [inputData, setInputData] = useState<InputData>(INITIAL_INPUT_DATA);
  console.log('App ~ inputData', inputData);

  const [totalPlateWeight, setTotalPlateWeight] = useState<number>(0);

  // useEffect(() => {
  //   setLoadout(calculateLoadout(barWeight, plates, targetWeight));
  // }, [plates, barWeight, targetWeight]);

  // Functions
  const updateLoadout = (updatedLoadout: Loadout) => {
    const updatedTotalPlateWeight = calculateTotalPlateWeight(updatedLoadout);

    setTotalPlateWeight(updatedTotalPlateWeight);
    setLoadout(updatedLoadout);
  };

  const updateInputData = (updatedInputData: InputData) => {
    setInputData(updatedInputData);
  };

  // Event Handlers

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
        <Navbar />
        <Box className="max-w-3xl mx-auto">
          <Form
            updateLoadout={updateLoadout}
            updateInputData={updateInputData}
          />

          {/* Results */}
          {/* {plates.length > 0 && (
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
          )} */}
        </Box>
      </Box>
      <footer className=" bg-slate-800 text-white text-center absolute bottom-0 w-full h-20 flex justify-center items-center">
        <p className="text-xs">{`Karl Cereno ${currentYear}`}</p>
      </footer>
    </Box>
  );
}

export default App;

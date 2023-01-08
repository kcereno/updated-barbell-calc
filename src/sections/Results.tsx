import React, { Fragment } from 'react';
import { Loadout } from '../data/types';
import { InputData } from '../data/interfaces';
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
  Box,
} from '@mui/material';

interface Props {
  loadout: Loadout;
  updateLoadout: (updatedLoadout: Loadout) => void;
  inputData: InputData;
}

const Results = ({ loadout, updateLoadout, inputData }: Props) => {
  console.log('Results ~ loadout', loadout);
  const { plates, barWeight } = inputData;

  const totalPlateWeight = loadout.reduce(
    (total, value) => (total += value.plateValue * value.perSide * 2),
    0
  );

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
    <Fragment>
      {plates!.length > 0 && (
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
                    {barWeight! + totalPlateWeight}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Fragment>
  );
};

export default Results;
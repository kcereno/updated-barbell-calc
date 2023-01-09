import React, { useState } from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { barWeightsLb, plateValuesLb, barWeightsKg } from '../data/variables';
import { inPlatesArr } from '../data/functions';
import { calculateLoadout } from '../data/functions';
import { Loadout } from '../data/types';
import { InputData, PlateValue } from '../data/interfaces';
import { Mode } from '../data/types';
import { useEffect } from 'react';
import {
  plateValuesKg,
  INITIAL_BAR_WEIGHT_LB,
  INITIAL_BAR_WEIGHT_KG,
} from '../data/variables';

interface Props {
  updateLoadout: (updatedLoadout: Loadout) => void;
  updateInputData: (inputData: InputData) => void;
  mode: Mode;
}

function Form({ updateLoadout, updateInputData, mode }: Props) {
  const [bars, setBars] = useState<PlateValue[]>([]);
  const [barWeight, setBarWeight] = useState<number>(0);
  const [plates, setPlates] = useState<number[]>([]);
  const [userPlates, setUserPlates] = useState<number[]>([]);
  const [targetWeight, setTargetWeight] = useState<number>(0);
  const [formIsValid, setFormIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [plateIndex, setPlateIndex] = useState<number>(0);

  useEffect(() => {
    if (mode === 'lb') {
      setBars(barWeightsLb);
      setBarWeight(INITIAL_BAR_WEIGHT_LB);
      setPlates(plateValuesLb);
      setPlateIndex(4);
      setTargetWeight(0);
      setUserPlates(plateValuesLb);
    }

    if (mode === 'kg') {
      setBars(barWeightsKg);
      setBarWeight(INITIAL_BAR_WEIGHT_KG);
      setPlates(plateValuesKg);
      setPlateIndex(5);
      setUserPlates(plateValuesKg);
      setTargetWeight(0);
    }
  }, [mode]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (plates.length === 0) {
      setErrorMessage('At least one plate must be selected');
      setFormIsValid(false);
      return;
    }

    if (targetWeight! < 0) {
      setErrorMessage('Weight must not be negative');
      setFormIsValid(false);
      return;
    }

    if (targetWeight! < barWeight) {
      setErrorMessage('Target Weight must be greater than Bar Weight');
      setFormIsValid(false);
      return;
    }

    const newLoadout = calculateLoadout(barWeight, userPlates, targetWeight!);

    setFormIsValid(true);

    updateLoadout(newLoadout);
    updateInputData({ barWeight, plates, targetWeight });
  };

  const handleChangeBarWeight = (
    event: React.MouseEvent<HTMLElement>,
    newBarWeight: number
  ) => {
    if (newBarWeight !== null) {
      setBarWeight(newBarWeight);
      updateInputData({ barWeight, plates, targetWeight });
    }
  };

  const handleChangeplates = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    updatedplates: number[]
  ) => {
    setUserPlates(updatedplates);
    updateInputData({ plates: updatedplates });
  };

  const handleChangeTargetWeight = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedTargetWeight = event.target.value;
    setTargetWeight(+updatedTargetWeight);
  };

  const handleReset = () => {
    setBarWeight(0);
    setUserPlates([]);
    setTargetWeight(0);
    setFormIsValid(true);
  };

  return (
    <Box
      component="form"
      className="mx-3 mb-8"
      onSubmit={handleSubmit}
    >
      <Box className="input__bar-weight mb-4">
        <h2 className="uppercase mb-2">Bar</h2>
        <ToggleButtonGroup
          exclusive
          value={barWeight}
          onChange={handleChangeBarWeight}
          color="primary"
          fullWidth
        >
          {bars!.map((bar) => (
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
        <h2 className="uppercase mb-2">Plates</h2>
        <Box className="flex flex-col">
          <ToggleButtonGroup
            value={userPlates}
            onChange={handleChangeplates}
            color="primary"
            fullWidth
          >
            {plates.map((plate, index) => {
              if (index < plateIndex)
                return (
                  <ToggleButton
                    key={plate}
                    value={plate}
                    selected={inPlatesArr(plate, userPlates)}
                  >
                    {plate}
                  </ToggleButton>
                );

              return null;
            })}
          </ToggleButtonGroup>
          <ToggleButtonGroup
            value={userPlates}
            onChange={handleChangeplates}
            color="primary"
            fullWidth
          >
            {plates.map((plate, index) => {
              if (index >= plateIndex)
                return (
                  <ToggleButton
                    key={plate}
                    value={plate}
                    selected={inPlatesArr(plate, userPlates)}
                  >
                    {plate}
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
          value={targetWeight}
          onClick={(event: any) => {
            event.target.select();
          }}
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
  );
}

export default Form;

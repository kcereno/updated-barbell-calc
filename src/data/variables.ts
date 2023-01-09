import { InputData } from './interfaces';

import { Loadout } from './types';

export const INITIAL_BAR_WEIGHT_LB = 45;
export const INITIAL_BAR_WEIGHT_KG = 20;
export const INITIAL_PLATES = [55, 45, 35, 25, 15, 10, 5, 2.5];
export const INITIAL_TARGET_WEIGHT = 0;
export const INITIAL_LOADOUT: Loadout = INITIAL_PLATES.map((plate) => {
  return { plateValue: plate, perSide: 0, netWeight: 0 };
});

export const INITIAL_INPUT_DATA: InputData = {
  barWeight: INITIAL_BAR_WEIGHT_LB,
  plates: INITIAL_PLATES,
  targetWeight: INITIAL_TARGET_WEIGHT,
};

export const barWeightsLb = [
  { entry: 'No Bar', value: 0 },
  { entry: '35', value: 35 },
  { entry: '45', value: 45 },
  { entry: '60', value: 60 },
];

export const barWeightsKg = [
  { entry: 'No Bar', value: 0 },
  { entry: '5', value: 5 },
  { entry: '15', value: 15 },
  { entry: '20', value: 20 },
];

export const plateValuesLb: number[] = [55, 45, 35, 25, 15, 10, 5, 2.5];
export const plateValuesKg: number[] = [
  50, 25, 20, 15, 10, 5, 2.5, 1.25, 0.5, 0.25,
];

export const currentYear = new Date().getFullYear();

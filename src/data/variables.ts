import { InputData } from './interfaces';

import { Loadout } from './types';

export const INITIAL_BAR_WEIGHT = 45;
export const INITIAL_PLATES = [55, 45, 35, 25, 15, 10, 5, 2.5];
export const INITIAL_TARGET_WEIGHT = 0;
export const INITIAL_LOADOUT: Loadout = INITIAL_PLATES.map((plate) => {
  return { plateValue: plate, perSide: 0, netWeight: 0 };
});
export const INITIAL_INPUT_DATA: InputData = {
  barWeight: INITIAL_BAR_WEIGHT,
  plates: INITIAL_PLATES,
  targetWeight: INITIAL_TARGET_WEIGHT,
};

export const barWeights = [
  { entry: 'No Bar', value: 0 },
  { entry: '35lbs', value: 35 },
  { entry: '45lbs', value: 45 },
  { entry: '60lbs', value: 60 },
];

export const plateValues: number[] = [55, 45, 35, 25, 15, 10, 5, 2.5];

export const currentYear = new Date().getFullYear();

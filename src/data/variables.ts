import { PlateValue, DataEntry } from './interfaces';

export const plateValues: PlateValue[] = [
  { entry: '2.5lbs', value: 2.5 },
  { entry: '5lbs', value: 5 },
  { entry: '10lbs', value: 10 },
  { entry: '15lbs', value: 15 },
  { entry: '25lbs', value: 25 },
  { entry: '35lbs', value: 35 },
  { entry: '45lbs', value: 45 },
  { entry: '55lbs', value: 55 },
];

export const data: DataEntry[] = [
  { plateValue: '2.5lbs', perSide: 2, netWeight: 5 },
  { plateValue: '5lbs', perSide: 2, netWeight: 10 },
  { plateValue: '10lbs', perSide: 2, netWeight: 20 },
  { plateValue: '15lbs', perSide: 2, netWeight: 30 },
];

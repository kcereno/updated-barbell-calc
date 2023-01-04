import { PlateValue, DataEntry } from './interfaces';

export const plateValues: PlateValue[] = [
  { value: '2.5lbs', weight: 2.5 },
  { value: '5lbs', weight: 5 },
  { value: '10lbs', weight: 10 },
  { value: '15lbs', weight: 15 },
  { value: '25lbs', weight: 25 },
  { value: '35lbs', weight: 35 },
  { value: '45lbs', weight: 45 },
  { value: '55lbs', weight: 55 },
];

export const data: DataEntry[] = [
  { plateValue: '2.5lbs', perSide: 2, netWeight: 5 },
  { plateValue: '5lbs', perSide: 2, netWeight: 10 },
  { plateValue: '10lbs', perSide: 2, netWeight: 20 },
  { plateValue: '15lbs', perSide: 2, netWeight: 30 },
];

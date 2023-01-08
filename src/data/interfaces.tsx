import { barWeights } from './variables';
export interface PlateValue {
  entry: string;
  value: number;
}

export interface LoadoutEntry {
  plateValue: number;
  perSide: number;
  netWeight: number;
}

export interface InputData {
  barWeight?: number;
  plates?: number[];
  targetWeight?: number;
}

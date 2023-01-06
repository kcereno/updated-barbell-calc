import {} from './interfaces';
import { Loadout } from './types';

export const inAvailablePlatesArr = (
  plate: number,
  plateArr: number[]
): boolean => {
  return plateArr.includes(plate);
};

export const calculateLoadout = (
  barWeight: number,
  plates: number[],
  targetWeight: number
) => {
  let netTargetWeight = (targetWeight - barWeight) / 2;
  const sortedPlates = plates.sort((a, b) => b - a);
  // let result: ResultEntry[] = [];

  //iterate through plates array
  // if current plate is less than netTargetWeight
  //divide netTargetWeight by current plate and round down
  // create an entry in result obkect with plate value and number of plates

  // sortedPlates.forEach((plate) => {
  //   if (plate < netTargetWeight) {
  //     const quantity = Math.floor(netTargetWeight / plate);
  //     netTargetWeight = netTargetWeight - quantity * plate;
  //     result = [
  //       ...result,
  //       { plateValue: plate, perSide: quantity, netWeight: plate * quantity },
  //     ];
  //   }
  // });

  // console.log(result);
};

export const generateLoadoutTemplate = (plates: number[]): Loadout =>
  plates.map((plate) => {
    return { plateValue: plate, perSide: 0, netWeight: 0 };
  });

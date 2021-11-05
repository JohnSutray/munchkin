export const justTrollDoorId = 'justTrollDoorId';
export const pukachuDoorId = 'pukachuDoorId';
export const geekDoorId = 'geekDoorId';
export const halfingDoorId = 'halfingDoorId';
export const hippogriffDoorId = 'hippogriffDoorId';

export const flamingArmorTreasureId = 'flamingArmorTreasureId';
export const mithrilArmorTreasureId = 'mithrilArmorTreasureId';

export const helmOfCourageTreasureId = 'helmOfCourageTreasureId';
export const hornyHelmetTreasureId = 'hornyHelmetTreasureId';

export const bootsOfButtKickingTreasureId = 'bootsOfButtKickingTreasureId';
export const bootsOfRunningReallyFastTreasureId = 'bootsOfRunningReallyFastTreasureId';

export const gentleManSClubTreasureId = 'gentleManSClubTreasureId';
export const hammerOfKneecappingTreasureId = 'hammerOfKneecappingTreasureId';
export const mageOfSharpnessTreasureId = 'mageOfSharpnessTreasureId';
export const bucklerOfSwashingTreasureId = 'bucklerOfSwashingTreasureId';
export const bowWithRibbonsTreasureId = 'bowWithRibbonsTreasureId';

export const doorsCollection: string[] = [
  justTrollDoorId,
  pukachuDoorId,
  geekDoorId,
  halfingDoorId,
  hippogriffDoorId,
];
export const treasuresCollection: string[] = [
  flamingArmorTreasureId,
  mithrilArmorTreasureId,
  helmOfCourageTreasureId,
  hornyHelmetTreasureId,
];

export const headEquipment = [
  helmOfCourageTreasureId,
  hornyHelmetTreasureId,
];

export const bodyEquipment = [
  mithrilArmorTreasureId,
  flamingArmorTreasureId,
];

export const bootsEquipment = [
  bootsOfButtKickingTreasureId,
  bootsOfRunningReallyFastTreasureId,
];

export const handEquipment = [
  gentleManSClubTreasureId,
  hammerOfKneecappingTreasureId,
  mageOfSharpnessTreasureId,
  bucklerOfSwashingTreasureId,
  bowWithRibbonsTreasureId,
];

export const twoHandItems = [
  bowWithRibbonsTreasureId,
];

export const isHead = (item: string) => headEquipment.includes(item);
export const isBody = (item: string) => bodyEquipment.includes(item);
export const isHand = (item: string) => handEquipment.includes(item);
export const isBoots = (item: string) => bootsEquipment.includes(item);
export const isTwoHandItem = (item: string) => twoHandItems.includes(item);

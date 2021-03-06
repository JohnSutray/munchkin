export const justTrollDoorId = 'justTrollDoorId';
export const placeholderDoorId = 'placeholderDoorId';
export const placeholderTreasureId = 'placeholderTreasureId';
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

export const damageDealers = {
  [flamingArmorTreasureId]: 2,
  [mithrilArmorTreasureId]: 3,
  [helmOfCourageTreasureId]: 1,
  [hornyHelmetTreasureId]: 1,
};

export const monsterDamage = {
  [justTrollDoorId]: 10,
  [pukachuDoorId]: 6,
  [geekDoorId]: 6,
  [hippogriffDoorId]: 16,
};

export const twoHandItems = [
  bowWithRibbonsTreasureId,
];

export const creatures = [
  justTrollDoorId,
  pukachuDoorId,
  geekDoorId,
  hippogriffDoorId,
];

export enum EItem {
  HEAD = 'head',
  BODY = 'body',
  HAND = 'hand',
  BOOTS = 'boots',
}

export const allItemTypes: string[] = [
  EItem.HAND,
  EItem.HEAD,
  EItem.BODY,
  EItem.BOOTS,
];

// export const isTreasure = (cardId: string): boolean => treasuresCollection.includes(cardId);

export enum ECardType {
  TREASURE = 'treasure',
  DOOR = 'door'
}

export const getMonsterDamage = (doorId: string): number => {
  if (monsterDamage[doorId]) {
    return monsterDamage[doorId];
  }

  throw new Error('Monster has no registered damage!');
};

export const getItemDamage = (itemId: string): number => damageDealers[itemId] || 0;

export const isCreature = (cardId: string) => creatures.includes(cardId);

export const getCardType = (cardId: string): ECardType => {
  if (cardId === placeholderTreasureId || treasuresCollection.includes(cardId)) {
    return ECardType.TREASURE;
  }

  if (cardId === placeholderDoorId || doorsCollection.includes(cardId)) {
    return ECardType.DOOR;
  }

  throw new Error(`Card type not recognized! Card id: ${cardId}`);
};

export const isItemType = (value: string): value is EItem => allItemTypes.includes(value);

export const getItemType = (itemId: string): EItem => {
  if (isHead(itemId)) return EItem.HEAD;
  if (isBody(itemId)) return EItem.BODY;
  if (isHand(itemId)) return EItem.HAND;
  if (isBoots(itemId)) return EItem.BOOTS;

  debugger;
  throw new Error(`Unknown item type! Item id: ${itemId}`);
};

export const isHead = (item: string) => headEquipment.includes(item);
export const isBody = (item: string) => bodyEquipment.includes(item);
export const isHand = (item: string) => handEquipment.includes(item);
export const isBoots = (item: string) => bootsEquipment.includes(item);
export const isTwoHandItem = (item: string) => twoHandItems.includes(item);

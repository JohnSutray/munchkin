import { Game } from '../models/game';
import { find } from 'lodash';
import { Player } from '../models/player';
import { getItemDamage, getMonsterDamage } from '../cards/cards-collection';

export const getPlayerTotalDamage = (player: Player): number =>
  player.level
  + player.items.reduce((total, item) => getItemDamage(item) + total, 0);

export const getMonsterSideTotalDamage = (game: Game): number => {
  return getMonsterDamage(game.currentBrokenDoor);
};

export const getPlayerSideTotalDamage = (game: Game): number => {
  const player = find(game.players, { id: game.currentPlayer });

  return getPlayerTotalDamage(player);
};

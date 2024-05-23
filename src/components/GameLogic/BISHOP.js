import { TeamType } from "../Constants";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const GetPossibleBishopMoves = (bishop, board) => {
  let possibleMoves = [];
  for (let j = 0; j < 2; j++) {
    const multiplier = j === 0 ? 1 : -1;
    for (let i = bishop.x + 1; i < 8; i++) {
      if (tileIsOccupied(i, bishop.y + multiplier * (i - bishop.x), board)) {
        if (tileIsOccupiedByOpponent(i, bishop.y + multiplier * (i - bishop.x), board, bishop.team)) {
          possibleMoves.push({ x: i, y: bishop.y + multiplier * (i - bishop.x) });
        }
        break;
      } else possibleMoves.push({ x: i, y: bishop.y + multiplier * (i - bishop.x) });
    }
  }
  for (let j = 0; j < 2; j++) {
    const multiplier = j === 0 ? 1 : -1;
    for (let i = bishop.x - 1; i >= 0; i--) {
      if (tileIsOccupied(i, bishop.y + multiplier * (i - bishop.x), board)) {
        if (tileIsOccupiedByOpponent(i, bishop.y + multiplier * (i - bishop.x), board, bishop.team)) {
          possibleMoves.push({ x: i, y: bishop.y + multiplier * (i - bishop.x) });
        }
        break;
      } else possibleMoves.push({ x: i, y: bishop.y + multiplier * (i - bishop.x) });
    }
  }

  return possibleMoves.filter((move) => move.x >= 0 && move.y >= 0 && move.x < 8 && move.y < 8);
};

export const opponentBishopMove = (king, bishop, board) => {
  const allMoves = [];
  for (let j = 0; j < 2; j++) {
    const multiplier = j === 0 ? 1 : -1;
    for (let i = bishop.x + 1; i < 8; i++) {
      if (tileIsOccupied(i, bishop.y + multiplier * (i - bishop.x), board)) {
        if (king.x === i && king.y === bishop.y + multiplier * (i - bishop.x)) continue;
        if (!tileIsOccupiedByOpponent(i, bishop.y + multiplier * (i - bishop.x), board, bishop.team)) {
          allMoves.push({ x: i, y: bishop.y + multiplier * (i - bishop.x) });
        }
        break;
      } else allMoves.push({ x: i, y: bishop.y + multiplier * (i - bishop.x) });
    }
  }
  for (let j = 0; j < 2; j++) {
    const multiplier = j === 0 ? 1 : -1;
    for (let i = bishop.x - 1; i >= 0; i--) {
      if (tileIsOccupied(i, bishop.y + multiplier * (i - bishop.x), board)) {
        if (king.x === i && king.y === bishop.y + multiplier * (i - bishop.x)) continue;
        if (!tileIsOccupiedByOpponent(i, bishop.y + multiplier * (i - bishop.x), board, bishop.team)) {
          allMoves.push({ x: i, y: bishop.y + multiplier * (i - bishop.x) });
        }
        break;
      } else allMoves.push({ x: i, y: bishop.y + multiplier * (i - bishop.x) });
    }
  }

  return allMoves.filter((move) => move.x >= 0 && move.y >= 0);
};

export const canBishopKillOpponentKing = (king, bishop, board) => {
  const allMoves = [];
  return allMoves.filter((move) => move.x >= 0 && move.y >= 0);
};

import { TeamType, Piece } from "../Constants";
import Refree from "./Refree";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const GetPossibleRookMoves = (rook, board) => {
  let possibleMoves= [];

  // Check horizontally
  for (let x = rook.x + 1; x < 8; x++) {
    if (!processTile(x, rook.y)) break;
  }
  for (let x = rook.x - 1; x >= 0; x--) {
    if (!processTile(x, rook.y)) break;
  }

  // Check vertically
  for (let y = rook.y + 1; y < 8; y++) {
    if (!processTile(rook.x, y)) break;
  }
  for (let y = rook.y - 1; y >= 0; y--) {
    if (!processTile(rook.x, y)) break;
  }

  function processTile(x, y) {
    if (tileIsOccupied(x, y, board)) {
      if (tileIsOccupiedByOpponent(x, y, board, rook.team)) {
        possibleMoves.push({x, y});
      }
      return false;
    } else {
      possibleMoves.push({x, y});
      return true;
    }
  }

  return possibleMoves.filter((move)=>move.x>=0 &&  move.y>=0  && move.x<8 && move.y<8);
};
export const opponentRookMove = (king,rook, board) => {
  
  const allMoves= []
  for (let x = rook.x + 1; x < 8; x++) {
    if (!processTile(x, rook.y)) break;
  }
  for (let x = rook.x - 1; x >= 0; x--) {
    if (!processTile(x, rook.y)) break;
  }

  // Check vertically
  for (let y = rook.y + 1; y < 8; y++) {
    if (!processTile(rook.x, y)) break;
  }
  for (let y = rook.y - 1; y >= 0; y--) {
    if (!processTile(rook.x, y)) break;
  }
  return allMoves;

  function processTile(x, y) {
    if (tileIsOccupied(x, y, board)) {
      if ((king.x === x && king.y === y)) return true;
      if (!tileIsOccupiedByOpponent(x, y, board, rook.team)) {
        allMoves.push({x, y});
      }
      return false;
    } else {
      allMoves.push({x, y});
      return true;
    }
  }

  return allMoves;
}

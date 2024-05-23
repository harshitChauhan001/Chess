import { TeamType, Piece } from "../Constants";
import Refree from "./Refree";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const GetPossiblePawnMoves = (pawn, board) => {
  const specialRow = (pawn.team === TeamType.OUR) ? 1 : 6;

  const possibleMoves = [];
  const pawnDirection = pawn.team === TeamType.OUR ? 1 : -1;
  if (!(tileIsOccupied(pawn.x, pawn.y + pawnDirection, board))) {
    possibleMoves.push({x:pawn.x, y:pawn.y+pawnDirection})
    if (pawn.y===specialRow && !(tileIsOccupied(pawn.x, pawn.y + 2 * pawnDirection, board))) {
      possibleMoves.push({x:pawn.x,y: pawn.y + 2 * pawnDirection})
    }
  }
  // upper left && bottom left
  if (tileIsOccupiedByOpponent(pawn.x - 1, pawn.y + pawnDirection, board, pawn.team)) {
    possibleMoves.push({x:pawn.x-1, y:pawn.y+pawnDirection})
  }
  // upper right && bottom right
  if (tileIsOccupiedByOpponent(pawn.x + 1, pawn.y + pawnDirection, board, pawn.team)) {
    possibleMoves.push({x:pawn.x+1, y:pawn.y+pawnDirection})
  }
  return possibleMoves.filter((move)=>move.x>=0 &&  move.y>=0  && move.x<8 && move.y<8)
}


export const opponentPawnMove = (pawn, board) => {
  
  const allMoves = []
  const pawnDirection = pawn.team === TeamType.OUR ? 1 : -1;
  allMoves.push({x:pawn.x+1,y:pawn.y+pawnDirection})
  allMoves.push({x:pawn.x-1,y:pawn.y+pawnDirection})
  return allMoves.filter((move)=>move.x>=0 &&  move.y>=0);
}
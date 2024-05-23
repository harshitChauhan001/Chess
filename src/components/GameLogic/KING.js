import { TeamType, Piece, PieceType } from "../Constants";
import Refree from "./Refree";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";
import { allOpponentMoves } from "./AllMoves";



export const GetPossibleKingMoves = (king, board)=> {
  let possibleMoves = [];
  let allCases = [{ x: 1, y: 1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }]
  for (let i = 0; i < allCases.length; i++) {
      if (!tileIsOccupied(king.x+allCases[i].x, king.y+allCases[i].y, board) || tileIsOccupiedByOpponent(king.x+allCases[i].x, king.y+allCases[i].y, board, king.team)) {
        possibleMoves.push({x:king.x+allCases[i].x,y: king.y+allCases[i].y})
      }
  }
  // removing all the moves of king at which king can die

  const allMoves=allOpponentMoves(king,board)
  const updatedPossibleMoves = possibleMoves.map((move) => {
    if (allMoves.find((m) => m.x === move.x && m.y === move.y || move.x<0 || move.y<0 )) {
      return undefined; // Return undefined if move is found
    } else {
      return move; // Return move if it's not found
    }
  });
  
  // Filter out undefined values and return the resulting array
  return updatedPossibleMoves.filter((move) => move !== undefined && move.x<8 && move.y<8) ;
}

export const opponentKingMove = (king, board)=> {

  const allMoves= []
  let allCases = [{ x: 1, y: 1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }]
  for (let i = 0; i < allCases.length; i++) {
      allMoves.push({x:king.x+allCases[i].x,y: king.y+allCases[i].y})
  }
  return allMoves;
}


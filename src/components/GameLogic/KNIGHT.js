import { TeamType, Piece } from "../Constants";
import Refree from "./Refree";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";


export const GetPossibleKnightMoves = (knight, board)=> { 
  let possibleMoves = []
  let allCases= [{ x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: 1 }, { x: -2, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: -2 }]
  for (let i = 0; i < allCases.length; i++) {
      if (!tileIsOccupied(knight.x+allCases[i].x, knight.y+allCases[i].y, board) || tileIsOccupiedByOpponent(knight.x+allCases[i].x, knight.y+allCases[i].y, board, knight.team)) {
        possibleMoves.push({x:knight.x+allCases[i].x,y: knight.y+allCases[i].y})
      }
  }
  return possibleMoves.filter((move)=>move.x>=0 &&  move.y>=0  && move.x<8 && move.y<8)
}

export const opponentKnightMove = (knight, board)=> {
  
  const allMoves = []
  let allCases = [{ x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: 1 }, { x: -2, y: -1 }, { x: 1, y: 2 }, { x: -1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: -2 }]
  for (let i = 0; i < allCases.length; i++) {
      if (!tileIsOccupied(knight.x+allCases[i].x, knight.y+allCases[i].y, board) || tileIsOccupiedByOpponent(knight.x+allCases[i].x, knight.y+allCases[i].y, board, knight.team)) {
        allMoves.push({x:knight.x+allCases[i].x,y: knight.y+allCases[i].y})
      }
  }
  return allMoves;
}
import { GetPossibleBishopMoves, opponentBishopMove } from "./BISHOP";
import { GetPossibleRookMoves, opponentRookMove } from "./ROOK";

export const GetPossibleQueenMoves = (queen, board) => {
  
  return [...GetPossibleBishopMoves(queen,board),... GetPossibleRookMoves(queen, board) ]
}
export const opponentQueenMove= (king, queen, board)=> {
  return [...opponentBishopMove(king,queen, board),...opponentRookMove(king,queen, board) ]

}
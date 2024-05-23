import { Piece,PieceType,TeamType } from "../Constants";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";
import { GetPossiblePawnMoves } from "./PAWN";
import { GetPossibleRookMoves } from "./ROOK";
import { GetPossibleKingMoves } from "./KING";
import { GetPossibleBishopMoves } from "./BISHOP";
import { GetPossibleKnightMoves } from "./KNIGHT";
import { GetPossibleQueenMoves } from "./QUEEN";
import { allOpponentMoves } from "./AllMoves";


// Define a JSDoc comment for the Piece structure
/**
* @typedef {Object} Move
* @property {number} fromX
* @property {number} fromY
* @property {number} toX
* @property {number} toY

*/

// Define the TeamType and PieceType as objects

export const Move={
    fromX:0,
    fromY:0,
    toX:0,
    toY:0
}

export default class Refree {
 
  isValidMove(px,py, x,y,type,team,board) {
  
    
    const piece = { x: px, y: py, type: type, team: team, image: "undefined" }
    // making a copy of the board and then checking if after moving the other pieces then king will the king get killed then the move shoudl be invalid
    if (type !== PieceType.KING) {
      
      const copyBoard = [...board];
      const updatedCopyBoard = copyBoard.reduce((results, p) => {
        if (p.x === px && p.y === py) {
          const newPiece ={x:x, y:y, type: type, team: team, image: "undefined" }
          results.push(newPiece);
            } else if (!(p.x === x && p.y === y)) {
              results.push(p);
            }
            return results;
      }, [] );
      
      // this is for checking if by moving a piece our king is getting in danger i.e. moving piece and king in same team
      const isKingInDanger = this.canKingBeKilled(piece.team, updatedCopyBoard);
      console.log("king was in danger so this move is removed")
      if (isKingInDanger) return false
      
    }

      // getting all the valid moves of the piece and checking if it contain the desired move
      const allValidMoves = this.getValidMoves(piece, board)
      const isValid = allValidMoves.find((move) => move.x === x && move.y === y)
      if (isValid) return true;
      return false;
      

  
  }
  getValidMoves(piece, board){
    switch (piece.type) {
      case PieceType.BISHOP:
        return GetPossibleBishopMoves(piece, board);
      case PieceType.PAWN:
        return GetPossiblePawnMoves(piece,board) 
      case PieceType.KING:
        return GetPossibleKingMoves(piece, board);
      case PieceType.QUEEN:
        return GetPossibleQueenMoves(piece, board)
      case PieceType.ROOK:
        return GetPossibleRookMoves(piece, board);
      case PieceType.KNIGHT:
        return GetPossibleKnightMoves(piece, board);
        
      default:
        []
    }
    return []
  }

  canKingBeKilled(team, copyBoard){
    //this function will only check if the king can be killed or not

    
    // making of copy and moving the piece in the copied board will be done in the isValidMove function above
    
    
    // make a copy of the board and let the piece of the same team move to its desired location
    // now using this copy of board get all the opponent moves 
    // check if the opponent moves contain the king location
    // if contain return false
    // else true
    
        const kingPiece = copyBoard.find((p) => p.team === team && p.type === PieceType.KING)

        const allMoves = copyBoard.reduce((acc, p) => {
          if (p.team !== team) {
              const moves = this.getValidMoves(p, copyBoard);
              return [...acc, ...moves];
          } else {
              return acc;
          }
        }, []);
        const canBeKilled = allMoves.find((move) => move.x === kingPiece.x && move.y === kingPiece.y) 
        if (canBeKilled) return true;
        return false;
  }
}



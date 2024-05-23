import { PieceType } from "../Constants";
import { opponentBishopMove } from "./BISHOP";
import { opponentPawnMove } from "./PAWN";
import { opponentKingMove } from "./KING";
import { opponentRookMove } from "./ROOK";
import { opponentKnightMove } from "./KNIGHT";
import { opponentQueenMove } from "./QUEEN";

export const allOpponentMoves = (king, board) => {
    const allMoves = [];
    board.forEach((piece) => {
        if (piece.team !== king.team) {
            let move = [];
            switch (piece.type) {
                case PieceType.BISHOP:
                    move = opponentBishopMove(king, piece, board);
                    break;
                case PieceType.PAWN:
                    move = opponentPawnMove(piece, board);
                    break;
                case PieceType.KING:
                    move = opponentKingMove(piece, board);
                    break;
                case PieceType.QUEEN:
                    move = opponentQueenMove(king, piece, board);
                    break;
                case PieceType.ROOK:
                    move = opponentRookMove(king, piece, board);
                    break;
                case PieceType.KNIGHT:
                    move = opponentKnightMove(piece, board);
                    break;
                default:
                    break;
            }
            allMoves.push(...move);
        }
    });
    return allMoves;
};

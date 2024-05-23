export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

  export const TeamType = {
    OPPONENT: "OPPONENT",
    OUR: "OUR",
  };
  
  export const PieceType = {
    PAWN: "PAWN",
    BISHOP: "BISHOP",
    KNIGHT: "KNIGHT",
    ROOK: "ROOK",
    QUEEN: "QUEEN",
    KING: "KING",
};
export const Piece = {
    image: "",
    x: 0,
    y: 0,
    type: PieceType.PAWN,
    team: TeamType.OUR,
    possibleMoves: [],
  };
// Define a JSDoc comment for the Piece structure
/**
 * @typedef {Object} Piece
 * @property {string} image
 * @property {number} x
 * @property {number} y
 * @property {PieceType} type
 * @property {TeamType} team
 * @property {Array<{x: number, y: number}>} [possibleMoves]
 */



export const initialBoardState = [
  {
    image: "../assets/rook_black.png",
    x: 0,
    y: 7,
    type: PieceType.ROOK,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/knight_black.png",
    x: 1,
    y: 7,
    type: PieceType.KNIGHT,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/bishop_black.png",
    x: 2,
    y: 7,
    type: PieceType.BISHOP,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/queen_black.png",
    x: 3,
    y: 7,
    type: PieceType.QUEEN,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/king_black.png",
    x: 4,
    y: 7,
    type: PieceType.KING,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/bishop_black.png",
    x: 5,
    y: 7,
    type: PieceType.BISHOP,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/knight_black.png",
    x: 6,
    y: 7,
    type: PieceType.KNIGHT,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/rook_black.png",
    x: 7,
    y: 7,
    type: PieceType.ROOK,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/rook_white.png",
    x: 0,
    y: 0,
    type: PieceType.ROOK,
    team: TeamType.OUR,
  },
  {
    image: "../assets/knight_white.png",
    x: 1,
    y: 0,
    type: PieceType.KNIGHT,
    team: TeamType.OUR,
  },
  {
    image: "../assets/bishop_white.png",
    x: 2,
    y: 0,
    type: PieceType.BISHOP,
    team: TeamType.OUR,
  },
  {
    image: "../assets/queen_white.png",
    x: 3,
    y: 0,
    type: PieceType.QUEEN,
    team: TeamType.OUR,
  },
  {
    image: "../assets/king_white.png",
    x: 4,
    y: 0,
    type: PieceType.KING,
    team: TeamType.OUR,
  },
  {
    image: "../assets/bishop_white.png",
    x: 5,
    y: 0,
    type: PieceType.BISHOP,
    team: TeamType.OUR,
  },
  {
    image: "../assets/knight_white.png",
    x: 6,
    y: 0,
    type: PieceType.KNIGHT,
    team: TeamType.OUR,
  },
  {
    image: "../assets/rook_white.png",
    x: 7,
    y: 0,
    type: PieceType.ROOK,
    team: TeamType.OUR,
  },
  {
    image: "../assets/pawn_black.png",
    x: 0,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/pawn_black.png",
    x: 1,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/pawn_black.png",
    x: 2,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/pawn_black.png",
    x: 3,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/pawn_black.png",
    x: 4,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/pawn_black.png",
    x: 5,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/pawn_black.png",
    x: 6,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/pawn_black.png",
    x: 7,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: "../assets/pawn_white.png",
    x: 0,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: "../assets/pawn_white.png",
    x: 1,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: "../assets/pawn_white.png",
    x: 2,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: "../assets/pawn_white.png",
    x: 3,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: "../assets/pawn_white.png",
    x: 4,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: "../assets/pawn_white.png",
    x: 5,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: "../assets/pawn_white.png",
    x: 6,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: "../assets/pawn_white.png",
    x: 7,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
];
export const copyOfInitialBoardState = JSON.parse(
  JSON.stringify(initialBoardState)
);

import { Piece, TeamType } from "../Constants";
export const tileIsOccupied=(x, y, board)=>{
    const piece = board.find((p) => p.x === x && p.y === y);
    if (piece) return true;
    return false;
}
export const tileIsOccupiedByOpponent=(x, y, board, team)=>{
    const piece=board.find((p)=>p.x===x && p.y===y && p.team!==team)
    if (piece) return true;
    return false;
}
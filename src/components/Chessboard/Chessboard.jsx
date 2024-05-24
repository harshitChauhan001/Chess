import io from 'socket.io-client';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Tile from "../Tile/Tile";
import "./Chessboard.css";
import Refree from "../GameLogic/Refree";
import {
  horizontalAxis,
  verticalAxis,
  Piece,
  TeamType,
  PieceType,
  initialBoardState,
  copyOfInitialBoardState
} from "../Constants";

// try to send updated pieces to other one

const Chessboard = ({ UniqueKey }) => {

  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState(initialBoardState);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [promotionPawn, setPromotionPawn] = useState();
  const [activePiece, setActivePiece] = useState(null);
  const chessboardRef = useRef(null);
  const [totalTurns, setTotalTurns] = useState(1);
  const [isCheck, setIsCheck] = useState(false);
  const [win, setWin] = useState(false);
  const refree = new Refree();
  const navigate = useNavigate();


     const socket = io('https://chess-redis-server.onrender.com/');
    useEffect(() => {
      socket.emit('join', UniqueKey);
  
      socket.on('connect', () => {
       });
  
      socket.on('disconnect', () => {
        setWin(true);
       });
      socket.on('restart', () => {
        setPieces(copyOfInitialBoardState);
        setWin(false);
        setIsCheck(false);
        setTotalTurns(1);
      })
      socket.on('new game', () => {
        navigate("/");
      })
  
      socket.on('move', (updatedBoardAfterMoving,turnData,winData,checkData) => {
        setPieces(updatedBoardAfterMoving)
        setTotalTurns(turnData);
        setWin(winData);
        setIsCheck(checkData)
      });
  
      return () => {
        socket.off('disconnect');
      };
    }, [UniqueKey]);
  
  
   const simulateMove = (pieces, piece,x,y) => {
    return pieces.map((p) => {
      if (p === piece) {
        return { ...p, x: x, y: y };  
      } else {
        return p;
      }
    });
  };
  
  const winCheck = (updatedPieces, turns) => {
    const team = turns % 2 === 0 ? TeamType.OPPONENT : TeamType.OUR;
    const king = updatedPieces.find((p) => p.type === PieceType.KING && p.team === team);
 
  
    for (const piece of updatedPieces  ) {
      if (piece.team !== team) {
        continue;
      }
      const moves = refree.getValidMoves(piece, updatedPieces);
       for (const move of moves) {
         const updatedPiecesCopy = simulateMove(updatedPieces, piece, move.x,move.y);
        // Check if moving this piece puts the king in danger
        if (!refree.canKingBeKilled(team, updatedPiecesCopy)) {
          return false; 
        }
      }
    }
    return true; 
  };
  
  

  const updateValidMoves = () => {
    setPieces((currentPieces) => {
      return currentPieces.map((p) => {
        p.possibleMoves = refree.getValidMoves(p, currentPieces);
        return p;
      });
    });
  };
  const handleWin = () => {
    socket.emit('restart', UniqueKey)
    setWin(false);
  setPieces(copyOfInitialBoardState);
  setTotalTurns(1);
  setIsCheck(false);
  };
  const handleNewGame = () => {
    navigate("/");
    socket.emit('new game',UniqueKey)
  }



  function grabPiece(e) {
    updateValidMoves();
    const element = e.target ;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      const rect = chessboard.getBoundingClientRect();
      const gridX = Math.floor((e.clientX - rect.left) / (rect.width / 8));
      const gridY = 7 - Math.floor((e.clientY - rect.top) / (rect.height / 8));
      setGridX(gridX);
      setGridY(gridY);
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      
      setActivePiece(element);
    }
  }

  function movePiece(e) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboardRef.current.offsetLeft - 25;
      const minY = chessboardRef.current.offsetTop - 25;
      const maxX = minX + chessboardRef.current.clientWidth - 50;
      const maxY = minY + chessboardRef.current.clientHeight - 55;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      if (x < minX) activePiece.style.left = `${minX}px`;
      else if (x > maxX) activePiece.style.left = `${maxX}px`;
      else activePiece.style.left = `${x}px`;

      if (y < minY) activePiece.style.top = `${minY}px`;
      else if (y > maxY) activePiece.style.top = `${maxY}px`;
      else activePiece.style.top = `${y}px`;
    }
  }
 

  function dropPiece(e) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const rect = chessboard.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / (rect.width / 8));
      const y = 7 - Math.floor((e.clientY - rect.top) / (rect.height / 8));

      const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
      let isTurnValid = false;
      if (currentPiece?.team === TeamType.OUR && totalTurns % 2 !== 0) {
        isTurnValid = true;
      } else if (currentPiece?.team === TeamType.OPPONENT && totalTurns % 2 === 0) {
        isTurnValid = true;
      }

      if (currentPiece) {
        const validMove = refree.isValidMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        );
        if (isTurnValid && validMove && !(x === gridX && y === gridY)) {
          // update the piece position
          // if a piece is attacked, remove it
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              piece.x = x;
              piece.y = y;
              let promotionRow = piece.team === TeamType.OUR ? 7 : 0;
              if (y === promotionRow && piece.type === PieceType.PAWN) {
                setPromotionPawn(piece);
                setShowPromotionModal(true);
              }
              results.push(piece);
            } else if (!(piece.x === x && piece.y === y)) {
              results.push(piece);
            }
            return results;
          }, [] );
          setPieces(updatedPieces);
          const turns = totalTurns;
          setTotalTurns((turns) => turns + 1);

          socket.emit('move',UniqueKey, updatedPieces, turns + 1, false, false);

          const opponentTeam = currentPiece.team === TeamType.OPPONENT ? TeamType.OUR : TeamType.OPPONENT;
          const check = refree.canKingBeKilled(opponentTeam, updatedPieces);
          if (winCheck(updatedPieces, turns + 1)) {
            setWin(true);
            socket.emit('move',UniqueKey, updatedPieces, turns + 1, true, check);
           }
          else {
            socket.emit('move',UniqueKey, updatedPieces, turns + 1, false, check);
             if (check) {
              setIsCheck(true);
            } else {
              setIsCheck(false);
            }
          }
        } else {
          // reset the piece position
          activePiece.style.position = 'relative';
          activePiece.style.removeProperty('top');
          activePiece.style.removeProperty('left');
        }
      }

      setActivePiece(null);
    }
  }
  const handlePawnPromotion = (pieceType) => {
    
    if (promotionPawn) {
      const updatedPieces = pieces.reduce((results, piece) => {
        if (piece.x === promotionPawn.x && piece.y === promotionPawn.y) {
          const teamType = piece.team === TeamType.OUR ? "white" : "black";
          let name = "";
          switch (pieceType) {
            case PieceType.ROOK:
              name = "rook";
              break;
            case PieceType.KNIGHT:
              name = "knight";
              break;
            case PieceType.BISHOP:
              name = "bishop";
              break;
            case PieceType.KING:
              name = "king";
              break;
            default:
          }
          piece.image = `/assets/${name}_${teamType}.png`;
          piece.type = pieceType;
        }
        results.push(piece);
        return results;
      }, [] );
      setPieces(updatedPieces);
    }
    setShowPromotionModal(false);
  };
  const promotionTeamType = () => {
    return promotionPawn?.team === TeamType.OUR ? "white" : "black";
  };

  let board = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      let number = j + i + 2;
      let image = undefined;
      const piece = pieces.find((p) => {
        if (p.x === i && p.y === j) {
          return p;
        }
      });

      image = piece ? piece.image : undefined;
      
      let currentPiece = pieces.find((p) => {
        if (p.x === gridX && p.y === gridY) {
          return p;
        }
      });
      let isTurnValid = false;
      if (currentPiece?.team === TeamType.OUR && totalTurns % 2 !== 0) {
        isTurnValid = true;
      } else if (
        currentPiece?.team === TeamType.OPPONENT &&
        totalTurns % 2 === 0
      ) {
        isTurnValid = true;
      }

      let highlight = activePiece != null ? currentPiece?.possibleMoves ? currentPiece.possibleMoves.some((p) => p.x === i && p.y === j) : false : false;
      if (!isTurnValid) highlight = false;
      board.push(
        <Tile
          key={`${i}+${j}`}
          image={image}
          number={number}
          highlight={highlight}
        />
      );
    }
  }

  
  return (
    <div className="main-container">
    <p className="turn">{(totalTurns % 2 === 0) ? "Black Move" : "White Move"}</p>
      
      {win &&
        <div className="check-mate">
            <div className="check-mate-modal"><span>The winning team is {(totalTurns % 2 === 0) ? "White " : "Black "}</span>
            <button onClick={handleWin}>Play Another again</button>
          <button onClick={handleNewGame}>Back to Home</button>
          </div>
          </div>
      }
      <div
        className="pawn-promotion"
        id={showPromotionModal === false ? "hidden" : ""}
      >
        <div className="pawn-promotion-modal">
          <img
            onClick={() => handlePawnPromotion(PieceType.ROOK)}
            src={`/assets/rook_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => handlePawnPromotion(PieceType.KNIGHT)}
            src={`/assets/knight_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => handlePawnPromotion(PieceType.BISHOP)}
            src={`/assets/bishop_${promotionTeamType()}.png`}
          />
          <img
            onClick={() => handlePawnPromotion(PieceType.KING)}
            src={`/assets/king_${promotionTeamType()}.png`}
          />
        </div>
      </div>
      <div
        className="chessboard"
        onMouseDown={(e) => grabPiece(e)}
        onMouseMove={(e) => movePiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        ref={chessboardRef}
      >
        {board}
      </div>
      {isCheck && !win && (
          <div className="check">
            CHECK!
          </div>
      )}
    </div>
  );
}

export default Chessboard;

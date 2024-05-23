import React from 'react';
import { useParams } from 'react-router-dom';
import Chessboard from "../../components/Chessboard/Chessboard"
import "./Game.css"

export default function Game() {
  const { key } = useParams();

  return (
    <div>
      <Chessboard UniqueKey={key} />
    </div>
  );
}

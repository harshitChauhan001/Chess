import React from 'react';
import './Tile.css';

function Tile({ number, image, highlight }) {
    if (number % 2 === 0) {
        return (
            <div className={(highlight === true && !image) ? "tile black-tile tile-highlight" : "tile black-tile"}>
                {image &&
                    <div className={highlight === true ? "chess-piece chess-piece-danger" : "chess-piece"} style={{ backgroundImage: `url(${image})` }}></div>
                }
            </div>
        );
    } else {
        return (
            <div className={(highlight === true && !image) ? "tile white-tile tile-highlight" : "tile white-tile"}>
                {image &&
                    <div className={highlight === true ? "chess-piece chess-piece-danger" : "chess-piece"} style={{ backgroundImage: `url(${image})` }}></div>
                }
            </div>
        )
    }
}

export default Tile;

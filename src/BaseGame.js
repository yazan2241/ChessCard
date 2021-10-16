import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
import React from 'react'
import NGame from './components/game1'
import NNGame from './components/game'
export const BaseGame = () => {
        const config = {"pieces": {
            "E1":"K",
            "E8":"k",
            "D2":"P",
            "F2":"P",
            "E3":"P",
            "D7":"p",
            "F7":"p",
            "E6":"p",
        
        },
        "isFinished": false,
        "check": false,
        "checkMate": false,
        "castling": {
            "whiteLong": true,
            "whiteShort": true,
            "blackLong": true,
            "blackShort": true    
        },
        "halfMove": 0,
        "fullMove": 1
        }
   const game = new Game(config);
   
    return (
        <>

        <NGame game = {game} />

        </>
    )
}
export default BaseGame

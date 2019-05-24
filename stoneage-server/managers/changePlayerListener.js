
const changePlayerListener = (room, players, playerIndex) => {
   stoneage.to(room).emit(players[++playerIndex])
}

module.exports = changePlayerListener;
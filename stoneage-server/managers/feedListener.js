
const feedListener = (room, playerStatistics, players, playerIndex, socket, stoneage, cardsArr) => {
   let neededFood = playerStatistics[socket.id].population - playerStatistics[socket.id].agronomy
    if (neededFood > 0) {
      playerStatistics[socket.id].food -= neededFood
   }
   socket.emit('changes', playerStatistics[socket.id])
   stoneage.to(room).emit('changePlayer', players[++playerIndex])
   if (playerIndex >= players.length) {
      playerIndex = 0
      const cards = cardsArr.slice(0,4);
      stoneage.to(room).emit('changePhase', 'movement')
      stoneage.to(room).emit('changePlayer', players[playerIndex])
      stoneage.to(room).emit('cards', cards)
   } 
   return playerIndex;
}

module.exports = feedListener;
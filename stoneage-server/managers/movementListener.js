
const movementListener = (data, stoneage, socket, players, players2, playerIndex, playerMovements, playerStatistics, redisClient, cardsArr) => {
   if (playerStatistics[socket.id].population >= data.amount) {
      if (data.resource) {
        playerMovements[socket.id][data.resource] += data.amount
        playerStatistics[socket.id].population -= data.amount
      }
      if (data.staff) {
        playerMovements[socket.id][data.staff] += data.amount
        playerStatistics[socket.id].population -= data.amount
      }
      if (data.card) {
         playerStatistics[socket.id].population -= data.amount
      }
      socket.emit('changes', playerStatistics[socket.id])
      stoneage.to(data.room).emit('movement', data)
      if (playerStatistics[socket.id].population === 0) {
         players.splice(playerIndex, 1)
         if (players.length === 0) {
            for (let item of players2) {
               players.push(item)
            }
            playerIndex = 0
            stoneage.to(data.room).emit('changePhase', 'return')
            stoneage.to(data.room).emit('changePlayer', players[playerIndex])
          } else {
             stoneage.to(data.room).emit('changePlayer', players[playerIndex])
          }
      } else {
         if ((playerIndex + 1) < players.length) {
            playerIndex++
            stoneage.to(data.room).emit('changePlayer', players[playerIndex])
          } else {
            stoneage.to(data.room).emit('changePlayer', players[0])
            playerIndex = 0
          }
      }
         
    } else {
      socket.emit('movementError', 'Not enough people')
    }
    /*if (playerStatistics[socket.id].population === 0) {
      players.splice(playerIndex - 1, 1)
      stoneage.to(data.room).emit('changePlayer', players[--playerIndex])
      if (players.length === 0) {
       for (let item of players2) {
          players.push(item)
       }
       playerIndex = 0
       stoneage.to(data.room).emit('changePhase', 'return')
       stoneage.to(data.room).emit('changePlayer', players[playerIndex])
     }
    }*/
    return playerIndex;
}

module.exports = movementListener;
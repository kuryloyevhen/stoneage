
const disconnectListener = (playerIndex, players, players2, playerStatistics, playerMovements, redisClient, socket) => {
   playerIndex = 0
   players = [ ]
   players2 = [ ]
   playerStatistics = { }
   playerMovements = { }
   redisClient.hdel('players', socket.id)
}

module.exports = disconnectListener;
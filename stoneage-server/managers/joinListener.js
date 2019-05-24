
const joinListener = (data, stoneage, socket, players, players2, playerIndex, playerMovements, playerStatistics, redisClient, cardsArr, dwellingsArr) => {
   players.push(socket.id)
   players2.push(socket.id)
   const cards = cardsArr.slice(0,4)
   playerMovements[socket.id] = {
     food: 0,
     wood: 0,
     clay: 0,
     stone: 0,
     gold: 0,
     agronomy: 0,
     smithy: 0,
     population: 0,
     id: socket.id
   }
   playerStatistics[socket.id] = {
     wood: 10,
     clay: 10,
     stone: 10,
     gold: 10,
     agronomy: 0,
     smithy: 0,
     dwellings: {},
     civilizationCards: {},
     points: 0,
     population: 5,
     food: 12,
     id: socket.id
   }
   socket.join(data.room)
   socket.emit('cards', cards)
   socket.emit('dwellings', dwellingsArr)
   socket.emit('changes', playerStatistics[socket.id])
   socket.emit('changePhase', 'movement')
   redisClient.hset('players', socket.id, data.player)
   redisClient.hgetall('players', (err, reply) => {
     stoneage.to(data.room).emit('join', reply)
   })
   redisClient.lrange('msgs', 0, -1, (err, reply) => {
     stoneage.to(data.room).emit('message', reply)
   })
   stoneage.to(data.room).emit('changePlayer', players[playerIndex])
}

module.exports = joinListener;
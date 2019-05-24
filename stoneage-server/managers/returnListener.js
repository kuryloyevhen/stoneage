
const returnListener = (data, playerStatistics, playerMovements, stoneage, socket, cardsArr) => {
   if (data.card) {
      switch (data.type) {
         case "tools":
            if (data.resource === "permanent") {
               playerStatistics[socket.id].workTools += data.amount;
            }
            if (data.resource === "temporary") {
               // functionality for one-off tools
            }
            break;
         case "resource":
            playerStatistics[socket.id][data.resource] += data.amount;
            break;
         case "agronomy":
            playerStatistics[socket.id].agronomy += data.amount;
            break;
         case "dice":
            playerStatistics[socket.id][resource] += data.amount;
            break;
         case "points":
            playerStatistics[socket.id].points += data.amount;
            break;
         case "random":
            playerStatistics[socket.id][data.resource] += data.amount;
            break;
      }
      playerStatistics[socket.id].civilizationCards[cardsArr[data.card].id] = cardsArr.splice(data.card,1)
      stoneage.emit('return', data)
      socket.emit('changes', playerStatistics[socket.id])
   } else if (data.dwelling) {
      for (let item in data) {
         if (data.hasOwnProperty(item) && data.propertyIsEnumerable(item)) {
            switch (item) {
               case "wood":
                  playerStatistics[socket.id].wood -= data.wood;
                  break;
               case "clay":
                  playerStatistics[socket.id].clay -= data.clay;
                  break;
               case "stone":
                  playerStatistics[socket.id].stone -= data.stone;
                  break;
               case "gold":
                  playerStatistics[socket.id].gold -= data.gold;
                  break;
               case "points":
                  playerStatistics[socket.id].points += data.points;
                  break;
               case "dwelling":
                  playerStatistics[socket.id].dwellings[data.dwelling] = data.dwelling
                  break;
            }
         }
      }
      stoneage.emit('return', data)
      socket.emit('changes', playerStatistics[socket.id])
   } else {
      playerStatistics[socket.id].population += data.people
      playerMovements[socket.id][data.resourceName] = 0
      playerStatistics[socket.id][data.resourceName] += data.resourceAmount
      socket.emit('changes', playerStatistics[socket.id])
      stoneage.emit('return', data)
   }
   
}

module.exports = returnListener;
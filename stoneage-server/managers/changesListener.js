
const changeListener = (data, playerStatistics, socket) => {
   for (let prop in data) {
      if (data.hasOwnProperty(prop) && data.propertyIsEnumerable(prop)) {
        playerStatistics[socket.id][prop] = data[prop]
      }
    }
}

module.exports = changeListener;
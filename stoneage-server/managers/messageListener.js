
const messageListener = (data, redisClient, stoneage) => {
   redisClient.rpush('msgs', data.message)
    redisClient.lrange('msgs', 0, -1, (err, reply) => {
      stoneage.to(data.room).emit('message', reply)
    })
}

module.exports = messageListener;
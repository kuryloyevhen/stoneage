
const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app)
const socketIo = require('socket.io')
const io = socketIo(server)
const bodyParser = require('body-parser')
const cors = require('./middlewares/cors')
const session = require('./middlewares/session').session
const redisClient = require('./middlewares/session').redisClient
const auth = require('./routers/auth')
const game = require('./routers/game')
const cards = require('./managers/cards')
const dwellings = require('./managers/dwellings')
const joinListener = require('./managers/joinListener')
const movementListener = require('./managers/movementListener')
const messageListener = require('./managers/messageListener')
const changesListener = require('./managers/changesListener')
const changePlayerListener = require('./managers/changePlayerListener')
const returnListener = require('./managers/returnListener')
const feedListener = require('./managers/feedListener')
const disconnectListener = require('./managers/disconnectListener')

const stoneage = io.of('/stoneage')
var playerStatistics = { }
var playerMovements = { }
var players = []
var players2 = []
var playerIndex = 0
var cardsArr = []
var dwellingsArr = []

stoneage.on('connection', socket => {
  cards.getAll().then( result => cardsArr = result)
  dwellings.getAll().then( result => dwellingsArr = result )
  socket.on('join', data => 
   joinListener(data, stoneage, socket, players, players2, playerIndex, playerMovements, playerStatistics, redisClient, cardsArr, dwellingsArr))

  socket.on('message', data => {
   messageListener(data, redisClient, stoneage)
  })

  socket.on('movement', data => {
   playerIndex = movementListener(data, stoneage, socket, players, players2, playerIndex, playerMovements, playerStatistics, redisClient, cardsArr)
  })

  socket.on('changes', data => {
   changesListener(data, playerStatistics, socket)
  })

  socket.on('changePlayer', room => 
   changePlayerListener(room, players, playerIndex))

  socket.on('return', data => {
   returnListener(data, playerStatistics, playerMovements, stoneage, socket, cardsArr)
})

  socket.on('feed', room => 
   playerIndex = feedListener(room, playerStatistics, players, playerIndex, socket, stoneage, cardsArr))

  socket.on('disconnect', () => 
   disconnectListener(playerIndex, players, players2, playerStatistics, playerMovements, redisClient, socket))
})

app.use((req, res, next) => {
  res.io = io
  next()
})
app.use(session)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors)

app.use('/', auth)
app.use('/games', game)

app.use((err, req, res) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err
  })
})

const appExports = {
  app,
  server
}

module.exports = appExports

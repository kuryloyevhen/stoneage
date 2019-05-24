const model = require('../models/cards')

const getAll = () => model()

cardsManager = {
   getAll
}

module.exports = cardsManager;
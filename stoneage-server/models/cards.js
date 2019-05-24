const orm = require('./sequelize-config')

const Card = orm.sequelize.define("cards", {
 id: {
  type: orm.Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true
 },
  instantType: {
    type: orm.Sequelize.STRING
  },
  instantSubtype: {
    type: orm.Sequelize.STRING
  },
  instantAmount: {
    type: orm.Sequelize.INTEGER
  },
   deferredType: {
     type: orm.Sequelize.STRING
   },
   deferredSubtype: {
     type: orm.Sequelize.STRING
   },
   deferredValue: {
     type: orm.Sequelize.INTEGER
   }
}, {
  freezeTableName: true,
  timestamps: false
})
/*
Card.create({
    instantType: "random",
    instantSubtype: null,
    instantAmount: null,
    deferredType: "dwellings",
    deferredSubtype: "multiplier",
    deferredValue: 2
})

Card.create({
  instantType: "resource",
  instantSubtype: "gold",
  instantAmount: 1,
  deferredType: "people",
  deferredSubtype: "multiplier",
  deferredValue: 1
})

Card.create({
  instantType: "resource",
  instantSubtype: "food",
  instantAmount: 2,
  deferredType: "dwellings",
  deferredSubtype: "multiplier",
  deferredValue: 2
})

Card.create({
  instantType: "random",
  instantSubtype: null,
  instantAmount: null,
  deferredType: "dwellings",
  deferredSubtype: "multiplier",
  deferredValue: 1
})

Card.create({
  instantType: "points",
  instantSubtype: null,
  instantAmount: 3,
  deferredType: "dwellings",
  deferredSubtype: "multiplier",
  deferredValue: 3
})

Card.create({
  instantType: "resource",
  instantSubtype: "food",
  instantAmount: 4,
  deferredType: "dwellings",
  deferredSubtype: "multiplier",
  deferredValue: 1
})

Card.create({
  instantType: "resource",
  instantSubtype: "stone",
  instantAmount: 2,
  deferredType: "green",
  deferredSubtype: "cart",
  deferredValue: null
})

Card.create({
  instantType: "random",
  instantSubtype: null,
  instantAmount: null,
  deferredType: "agronomy",
  deferredSubtype: "multiplier",
  deferredValue: 1
})

Card.create({
  instantType: "random",
  instantSubtype: null,
  instantAmount: null,
  deferredType: "agronomy",
  deferredSubtype: "multiplier",
  deferredValue: 2
})

Card.create({
  instantType: "resource",
  instantSubtype: "stone",
  instantAmount: 1,
  deferredType: "agronomy",
  deferredSubtype: "multiplier",
  deferredValue: 1
})

Card.create({
  instantType: "agronomy",
  instantSubtype: "permanent",
  instantAmount: 1,
  deferredType: "agronomy",
  deferredSubtype: "multiplier",
  deferredValue: 1
})

Card.create({
  instantType: "resource",
  instantSubtype: "food",
  instantAmount: 3,
  deferredType: "agronomy",
  deferredSubtype: "multiplier",
  deferredValue: 2
})

Card.create({
  instantType: "tools",
  instantSubtype: "temporary",
  instantAmount: 4,
  deferredType: "tools",
  deferredSubtype: "multiplier",
  deferredValue: 1
})

Card.create({
  instantType: "tools",
  instantSubtype: "temporary",
  instantAmount: 3,
  deferredType: "tools",
  deferredSubtype: "multiplier",
  deferredValue: 1
})

Card.create({
  instantType: "tools",
  instantSubtype: "temporary",
  instantAmount: 2,
  deferredType: "tools",
  deferredSubtype: "multiplier",
  deferredValue: 2
})

Card.create({
  instantType: "random",
  instantSubtype: null,
  instantAmount: null,
  deferredType: "tools",
  deferredSubtype: "multiplier",
  deferredValue: 2
})

Card.create({
  instantType: "random",
  instantSubtype: null,
  instantAmount: null,
  deferredType: "tools",
  deferredSubtype: "multiplier",
  deferredValue: 2
})

Card.create({
  instantType: "dice",
  instantSubtype: "stone",
  instantAmount: null,
  deferredType: "people",
  deferredSubtype: "multiplier",
  deferredValue: 1
})

Card.create({
  instantType: "dice",
  instantSubtype: "wood",
  instantAmount: null,
  deferredType: "people",
  deferredSubtype: "multiplier",
  deferredValue: 2
})

Card.create({
  instantType: "resource",
  instantSubtype: "stone",
  instantAmount: 1,
  deferredType: "people",
  deferredSubtype: "multiplier",
  deferredValue: 1
})

Card.create({
  instantType: "resource",
  instantSubtype: "clay",
  instantAmount: 1,
  deferredType: "people",
  deferredSubtype: "multiplier",
  deferredValue: 2
})

Card.create({
  instantType: "resource",
  instantSubtype: "food",
  instantAmount: 5,
  deferredType: "green",
  deferredSubtype: "branch",
  deferredValue: null
})

Card.create({
  instantType: "resource",
  instantSubtype: "food",
  instantAmount: 7,
  deferredType: "green",
  deferredSubtype: "pot",
  deferredValue: null
})

Card.create({
  instantType: "points",
  instantSubtype: null,
  instantAmount: 3,
  deferredType: "green",
  deferredSubtype: "fife",
  deferredValue: null
})

Card.create({
  instantType: "points",
  instantSubtype: null,
  instantAmount: 3,
  deferredType: "green",
  deferredSubtype: "fife",
  deferredValue: null
})

Card.create({
  instantType: "random",
  instantSubtype: null,
  instantAmount: null,
  deferredType: "green",
  deferredSubtype: "watch",
  deferredValue: null
})

Card.create({
  instantType: "tools",
  instantSubtype: "permanent",
  instantAmount: 1,
  deferredType: "green",
  deferredSubtype: "statuette",
  deferredValue: null
})

Card.create({
  instantType: "dice",
  instantSubtype: "gold",
  instantAmount: null,
  deferredType: "green",
  deferredSubtype: "statuette",
  deferredValue: null
})

Card.create({
  instantType: "card",
  instantSubtype: null,
  instantAmount: null,
  deferredType: "green",
  deferredSubtype: "plate",
  deferredValue: null
})

Card.create({
  instantType: "random",
  instantSubtype: null,
  instantAmount: null,
  deferredType: "green",
  deferredSubtype: "pot",
  deferredValue: null
})

Card.create({
  instantType: "agronomy",
  instantSubtype: "permanent",
  instantAmount: 1,
  deferredType: "green",
  deferredSubtype: "watch",
  deferredValue: null
})

Card.create({
  instantType: "random",
  instantSubtype: null,
  instantAmount: null,
  deferredType: "green",
  deferredSubtype: "cart",
  deferredValue: null
})

Card.create({
  instantType: "resource",
  instantSubtype: "food",
  instantAmount: 1,
  deferredType: "green",
  deferredSubtype: "weave",
  deferredValue: null
})

Card.create({
  instantType: "resource",
  instantSubtype: "any",
  instantAmount: 2,
  deferredType: "green",
  deferredSubtype: "branch",
  deferredValue: null
})

Card.create({
  instantType: "random",
  instantSubtype: null,
  instantAmount: null,
  deferredType: "green",
  deferredSubtype: "plate",
  deferredValue: null
})

Card.create({
  instantType: "resource",
  instantSubtype: "food",
  instantAmount: 3,
  deferredType: "green",
  deferredSubtype: "weave",
  deferredValue: null
})
*/
const getAllCards = () => Card.findAll()

module.exports = getAllCards;

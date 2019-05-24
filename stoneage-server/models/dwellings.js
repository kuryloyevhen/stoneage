const orm = require('./sequelize-config')

const Dwelling = orm.sequelize.define("dwellings", {
  id: {
    type: orm.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pointsAmount: {
    type: orm.Sequelize.INTEGER
  },
  type: {
    type: orm.Sequelize.STRING
  },
  wood: {
    type: orm.Sequelize.INTEGER
  },
  clay: {
    type: orm.Sequelize.INTEGER
  },
  stone: {
    type: orm.Sequelize.INTEGER
  },
  gold: {
    type: orm.Sequelize.INTEGER
  },
  requiredResourceAmount: {
    type: orm.Sequelize.INTEGER
  },
  differenceRequirement: {
    type: orm.Sequelize.INTEGER
  }
}, {
  freezeTableName: true,
  timestamps: false
})
/*
Dwelling.create({
  pointsAmount: null,
  type: "count",
  wood: null,
  clay: null,
  stone: null,
  gold: null,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: null,
  type: "count",
  wood: null,
  clay: null,
  stone: null,
  gold: null,
  requiredResourceAmount: 5,
  differenceRequirement: 2
})

Dwelling.create({
  pointsAmount: null,
  type: "count",
  wood: null,
  clay: null,
  stone: null,
  gold: null,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: null,
  type: "count",
  wood: null,
  clay: null,
  stone: null,
  gold: null,
  requiredResourceAmount: 4,
  differenceRequirement: 2
})

Dwelling.create({
  pointsAmount: null,
  type: "count",
  wood: null,
  clay: null,
  stone: null,
  gold: null,
  requiredResourceAmount: 4,
  differenceRequirement: 1
})

Dwelling.create({
  pointsAmount: null,
  type: "count",
  wood: null,
  clay: null,
  stone: null,
  gold: null,
  requiredResourceAmount: 5,
  differenceRequirement: 1
})

Dwelling.create({
  pointsAmount: 11,
  type: "standart",
  wood: 2,
  clay: null,
  stone: 1,
  gold: null,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: null,
  type: "count",
  wood: null,
  clay: null,
  stone: null,
  gold: null,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 10,
  type: "standart",
  wood: 2,
  clay: 1,
  stone: null,
  gold: null,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 12,
  type: "standart",
  wood: 1,
  clay: 1,
  stone: 1,
  gold: null,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 15,
  type: "standart",
  wood: null,
  clay: 1,
  stone: 1,
  gold: 1,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 11,
  type: "standart",
  wood: 1,
  clay: 2,
  stone: null,
  gold: null,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 13,
  type: "standart",
  wood: 1,
  clay: null,
  stone: 2,
  gold: null,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 14,
  type: "standart",
  wood: null,
  clay: 1,
  stone: 2,
  gold: null,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 14,
  type: "standart",
  wood: 1,
  clay: null,
  stone: 1,
  gold: 1,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 13,
  type: "standart",
  wood: 1,
  clay: 1,
  stone: null,
  gold: 1,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: null,
  type: "count",
  wood: null,
  clay: null,
  stone: null,
  gold: null,
  requiredResourceAmount: 4,
  differenceRequirement: 4
})

Dwelling.create({
  pointsAmount: null,
  type: "count",
  wood: null,
  clay: null,
  stone: null,
  gold: null,
  requiredResourceAmount: 5,
  differenceRequirement: 4
})

Dwelling.create({
  pointsAmount: null,
  type: "count",
  wood: null,
  clay: null,
  stone: null,
  gold: null,
  requiredResourceAmount: 5,
  differenceRequirement: 3
})

Dwelling.create({
  pointsAmount: 16,
  type: "standart",
  wood: null,
  clay: null,
  stone: 2,
  gold: 1,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 15,
  type: "standart",
  wood: null,
  clay: 1,
  stone: 1,
  gold: 1,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 12,
  type: "standart",
  wood: 2,
  clay: null,
  stone: null,
  gold: 1,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 13,
  type: "standart",
  wood: null,
  clay: 2,
  stone: 1,
  gold: null,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 12,
  type: "standart",
  wood: 1,
  clay: 1,
  stone: 1,
  gold: null,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 14,
  type: "standart",
  wood: 1,
  clay: null,
  stone: 1,
  gold: 1,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 14,
  type: "standart",
  wood: null,
  clay: 2,
  stone: null,
  gold: 1,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: 13,
  type: "standart",
  wood: 1,
  clay: 1,
  stone: null,
  gold: 1,
  requiredResourceAmount: null,
  differenceRequirement: null
})

Dwelling.create({
  pointsAmount: null,
  type: "count",
  wood: null,
  clay: null,
  stone: null,
  gold: null,
  requiredResourceAmount: 4,
  differenceRequirement: 3
})
*/
const getAllDwellings = () => Dwelling.findAll()

module.exports = getAllDwellings;

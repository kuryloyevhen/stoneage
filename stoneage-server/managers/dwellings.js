const model = require("../models/dwellings");

const getAll = () => model();

const dwellingModel = {
  getAll
};

module.exports = dwellingModel;

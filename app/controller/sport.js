const { Sport } = require('../models/index');

const controller = {
  getAllSports: async (_, res) => {
    try {
      const sports = await Sport.findAll();

      res
        .status(200)
        .json(sports);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  },

  getOneSport: async (req, res) => {
    try {
      const { id } = req.params;
      const sport = await Sport.findByPk(id);

      res
        .status(200)
        .json(sport);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  }
};

module.exports = controller;
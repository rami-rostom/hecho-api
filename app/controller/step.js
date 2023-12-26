const { Step } = require('../models/index');

const controller = {
  getAllSteps: async (_, res) => {
    try {
      const steps = await Step.findAll();

      res
        .status(200)
        .json(steps);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  },

  getOneStep: async (req, res) => {
    try {
      const { id } = req.params;
      const step = await Step.findByPk(id);

      res
        .status(200)
        .json(step);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  }
};

module.exports = controller;
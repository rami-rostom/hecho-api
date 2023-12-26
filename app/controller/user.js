const { User } = require('../models/index');

const controller = {
  getAllUsers: async (_, res) => {
    try {
      const users = await User.findAll();

      res
        .status(200)
        .json(users);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  },

  getOneUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      res
        .status(200)
        .json(user);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  }
};

module.exports = controller;
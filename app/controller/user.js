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
    }
  }
};

module.exports = controller;
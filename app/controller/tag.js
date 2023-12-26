const { Tag } = require('../models/index');

const controller = {
  getAllTags: async (_, res) => {
    try {
      const tags = await Tag.findAll();

      res
        .status(200)
        .json(tags);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  },

  getOneTag: async (req, res) => {
    try {
      const { id } = req.params;
      const tag = await Tag.findByPk(id);

      res
        .status(200)
        .json(tag);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  }
};

module.exports = controller;
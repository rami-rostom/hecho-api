const { Workout } = require('../models/index');

const controller = {
  getAllWorkouts: async (_, res) => {
    try {
      const workouts = await Workout.findAll({
        include: ['steps', 'tags']
      });

      res
        .status(200)
        .json(workouts);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  },

  getOneWorkout: async (req, res) => {
    try {
      const { id } = req.params;
      const workout = await Workout.findByPk(id, {
        include: ['steps', 'tags']
      });

      res
        .status(200)
        .json(workout);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  }
};

module.exports = controller;
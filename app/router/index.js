const { Router } = require('express');
const router = Router();

const {
  homeController,
  userController,
  sportController,
  workoutController
} = require('../controller');

// HOME
router.get('/', homeController.renderHomePage);

// USER
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);

// SPORT
router.get('/sports', sportController.getAllSports);
router.get('/sport/:id', sportController.getOneSport);

// WORKOUT
router.get('/workouts', workoutController.getAllWorkouts);
router.get('/workout/:id', workoutController.getOneWorkout);

module.exports = router;
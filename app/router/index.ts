import { Router } from 'express';
const router = Router();

import {
  homeController,
  userController,
  sportController,
  workoutController,
  stepController,
  tagController
} from '../controller';

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
router.patch('/workout/:id', workoutController.updateOneWorkout);
router.delete('/workout/:id', workoutController.deleteOneWorkout);
router.post('/workout', workoutController.createOneWorkout);

// STEP
router.get('/steps', stepController.getAllSteps);
router.get('/step/:id', stepController.getOneStep);

// TAG
router.get('/tags', tagController.getAllTags);
router.get('/tag/:id', tagController.getOneTag);

export default router;
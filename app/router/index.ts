import { Router } from 'express';
const router = Router();

import {
  homeController,
  userController,
  sportController,
  workoutController,
  stepController,
  tagController,
  authController
} from '../controller';

// HOME
router.get('/', homeController.renderHomePage);

// AUTHENTIFICATION
router.post('/signup', authController.handleSignUp);
// router.post('/signin', authController.handleSignIn);

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
router.patch('/step/:id', stepController.updateOneStep);
router.delete('/step/:id', stepController.deleteOneStep);
router.post('/step', stepController.createOneStep);

// TAG
router.get('/tags', tagController.getAllTags);
router.get('/tag/:id', tagController.getOneTag);
router.patch('/tag/:id', tagController.updateOneTag);
router.delete('/tag/:id', tagController.deleteOneTag);
router.post('/tag', tagController.createOneTag);

export default router;
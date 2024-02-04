import { Router } from 'express';
const router = Router();

import verifyToken from '../middlewares/auth';

import {
  homeController,
  userController,
  sportController,
  workoutController,
  stepController,
  tagController,
  authController,
  goalController
} from '../controller';

// HOME
router.get('/', homeController.renderHomePage);

// AUTHENTIFICATION
router.post('/signup', authController.handleSignUp);
router.post('/signin', authController.handleSignIn);

// USER
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);

// SPORT
router.get('/sports', sportController.getAllSports);
router.get('/sport/:id', sportController.getOneSport);

// WORKOUT
router.get('/workouts', workoutController.getAllWorkouts);
router.get('/workouts/user/:id', workoutController.getAllUserWorkouts);
router.get('/workout/:id', workoutController.getOneWorkout);
router.patch('/workout/:id', workoutController.updateOneWorkout);
router.delete('/workout/:id', workoutController.deleteOneWorkout);
router.post('/workout', workoutController.createOneWorkout);
router.patch('/workout/:id/step/add', workoutController.addStepToWorkout);
router.patch('/workout/:id/step/remove', workoutController.removeStepFromWorkout);
router.patch('/workout/:id/tag/add', workoutController.addTagToWorkout);
router.patch('/workout/:id/tag/remove', workoutController.removeTagFromWorkout);

// STEP
router.get('/steps', stepController.getAllSteps);
router.get('/step/:id', stepController.getOneStep);
router.patch('/step/:id', stepController.updateOneStep);
router.delete('/step/:id', stepController.deleteOneStep);
router.post('/step', stepController.createOneStep);

// TAG
router.get('/tags', tagController.getAllTags);
router.get('/tag/:id', tagController.getOneTag);
router.get('/tags/user/:id', tagController.getAllUserTags);
router.patch('/tag/:id', tagController.updateOneTag);
router.delete('/tag/:id', tagController.deleteOneTag);
router.post('/tag', tagController.createOneTag);

// GOAL
router.get('/goal/:id', goalController.getOneGoal);
router.get('/goal/user/:id', goalController.getUserGoal);
router.patch('/goal/:id', goalController.updateOneGoal);
router.post('/goal', goalController.createOneGoal);
router.delete('/goal/:id', goalController.deleteOneGoal);

export default router;
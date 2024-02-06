"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const controller_1 = require("../controller");
// HOME
router.get('/', controller_1.homeController.renderHomePage);
// AUTHENTIFICATION
router.post('/signup', controller_1.authController.handleSignUp);
router.post('/signin', controller_1.authController.handleSignIn);
// USER
router.get('/users', controller_1.userController.getAllUsers);
router.get('/user/:id', controller_1.userController.getOneUser);
// SPORT
router.get('/sports', controller_1.sportController.getAllSports);
router.get('/sport/:id', controller_1.sportController.getOneSport);
// WORKOUT
router.get('/workouts', controller_1.workoutController.getAllWorkouts);
router.get('/workouts/user/:id', controller_1.workoutController.getAllUserWorkouts);
router.get('/workout/:id', controller_1.workoutController.getOneWorkout);
router.patch('/workout/:id', controller_1.workoutController.updateOneWorkout);
router.delete('/workout/:id', controller_1.workoutController.deleteOneWorkout);
router.post('/workout', controller_1.workoutController.createOneWorkout);
router.patch('/workout/:id/step/add', controller_1.workoutController.addStepToWorkout);
router.patch('/workout/:id/step/remove', controller_1.workoutController.removeStepFromWorkout);
router.patch('/workout/:id/tag/add', controller_1.workoutController.addTagToWorkout);
router.patch('/workout/:id/tag/remove', controller_1.workoutController.removeTagFromWorkout);
// STEP
router.get('/steps', controller_1.stepController.getAllSteps);
router.get('/step/:id', controller_1.stepController.getOneStep);
router.patch('/step/:id', controller_1.stepController.updateOneStep);
router.delete('/step/:id', controller_1.stepController.deleteOneStep);
router.post('/step', controller_1.stepController.createOneStep);
// TAG
router.get('/tags', controller_1.tagController.getAllTags);
router.get('/tag/:id', controller_1.tagController.getOneTag);
router.get('/tags/user/:id', controller_1.tagController.getAllUserTags);
router.patch('/tag/:id', controller_1.tagController.updateOneTag);
router.delete('/tag/:id', controller_1.tagController.deleteOneTag);
router.post('/tag', controller_1.tagController.createOneTag);
// GOAL
router.get('/goal/:id', controller_1.goalController.getOneGoal);
router.get('/goal/user/:id', controller_1.goalController.getUserGoal);
router.patch('/goal/:id', controller_1.goalController.updateOneGoal);
router.post('/goal', controller_1.goalController.createOneGoal);
router.delete('/goal/:id', controller_1.goalController.deleteOneGoal);
exports.default = router;

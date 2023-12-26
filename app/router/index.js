const { Router } = require('express');
const router = Router();

const {
  homeController,
  userController,
  sportController
} = require('../controller');

// HOME
router.get('/', homeController.renderHomePage);

// USER
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);

// SPORT
router.get('/sports', sportController.getAllSports);
router.get('/sport/:id', sportController.getOneSport);

module.exports = router;
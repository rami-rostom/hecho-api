const { Router } = require('express');
const router = Router();

const { homeController, userController } = require('../controller');

// HOME
router.get('/', homeController.renderHomePage);

// USER
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);

module.exports = router;
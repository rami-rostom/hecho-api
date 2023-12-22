const { Router } = require('express');
const router = Router();

const { homeController, userController } = require('../controller');

// HOME
router.get('/', homeController.renderHomePage);

// USER
router.get('/users', userController.getAllUsers);

module.exports = router;
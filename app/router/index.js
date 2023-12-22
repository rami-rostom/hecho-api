const { Router } = require('express');
const router = Router();

const { homeController } = require('../controller');

// HOME
router.get('/', homeController.renderHomePage);

module.exports = router;
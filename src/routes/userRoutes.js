const { Router } = require('express');
const { getUsers } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

const router = Router();

router.get('/', authMiddleware, isAdminMiddleware, getUsers);

module.exports = router;

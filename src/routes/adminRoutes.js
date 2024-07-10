const { Router } = require('express');
const { createFilm } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

const router = Router();

router.post('/films', authMiddleware, isAdminMiddleware, createFilm);

module.exports = router;

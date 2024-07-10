const { Router } = require('express');
const { getFilms, viewFilm, createFilm } = require('../controllers/filmController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

const router = Router();

router.get('/', getFilms);
router.get('/:id', authMiddleware, viewFilm);
router.post('/', authMiddleware, isAdminMiddleware, createFilm);

module.exports = router;

const { PrismaClient } = require('@prisma/client');
const { filmSchema } = require('../validations/filmValidation');
const validateSchema = require('../middlewares/validateMiddleware');
const prisma = new PrismaClient();

const getFilms = async (req, res) => {
    try {
        const films = await prisma.film.findMany();
        res.json({ data: films });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const viewFilm = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const film = await prisma.film.findUnique({ where: { id } });
        if (!film) return res.status(404).json({ message: 'Film not found' });

        const existingView = await prisma.view.findUnique({
            where: { userId_filmId: { userId, filmId: id } },
        });

        if (!existingView) {
            await prisma.view.create({
                data: { userId, filmId: id },
            });

            await prisma.film.update({
                where: { id },
                data: { views: { increment: 1 } },
            });
        }

        res.json({ data: film });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createFilm = async (req, res) => {
    const { error } = validateSchema(filmSchema, req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { title, description, link, year, duration, genre } = req.body;

    try {
        const film = await prisma.film.create({
            data: { title, description, link, year, duration, genre },
        });

        res.status(201).json({ data: film });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getFilms,
    viewFilm,
    createFilm
};

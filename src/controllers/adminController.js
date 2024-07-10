const { PrismaClient } = require('@prisma/client');
const { validateSchema } = require('../middlewares/validateMiddleware');
const { filmSchema } = require('../validations/filmValidation');

const prisma = new PrismaClient();

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
    createFilm,
};

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json({ data: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
};

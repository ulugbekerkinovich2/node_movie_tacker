require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const config = require('../../config');

const start = (app) => {
    const server = http.createServer(app);
    const PORT = config.port || process.env.PORT || 3000;

    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

    });

    server.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};

module.exports = { start, Server };

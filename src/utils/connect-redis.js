const { createClient } = require("redis");

const client = createClient({
    url: 'redis://localhost:6379', // Replace 'localhost' and '6379' with your Redis server's address and port if different
});

client.on('error', (err) => {
    console.error('Redis client error:', err);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.connect().catch(console.error);

module.exports = client;

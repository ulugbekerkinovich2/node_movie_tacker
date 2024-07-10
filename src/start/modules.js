require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require('../routes/authRoutes');
const adminRoutes = require('../routes/adminRoutes');
const filmRoutes = require('../routes/filmRoutes');
const userRoutes = require('../routes/userRoutes');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const modules = async (app, express) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(fileUpload());
    app.use(cors());

    app.use('/api/auth', authRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/films', filmRoutes);
    app.use('/api/users', userRoutes);
}

module.exports = modules
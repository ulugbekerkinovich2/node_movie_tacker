const Joi = require('joi');

const userSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('USER', 'ADMIN').required(),
});

module.exports = {
    userSchema,
};

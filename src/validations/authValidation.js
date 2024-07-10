const Joi = require('joi');

const registerSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('USER', 'ADMIN'),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const otpSchema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).required(),
});

module.exports = {
    registerSchema,
    loginSchema,
    otpSchema,
};

const Joi = require('joi');

const filmSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    link: Joi.string().required(),
    year: Joi.string().length(4).required(),
    duration: Joi.string().required(),
    genre: Joi.string().valid('horror', 'fantastic', 'romance', 'comedy', 'melodramma', 'action').required(),
});

module.exports = {
    filmSchema,
};

const validateSchema = (schema, data) => {
    const { error } = schema.validate(data);
    return { error };
};

module.exports = validateSchema;

const Joi = require('joi');
const userValidator = require('express-joi-validation').createValidator({passError: true})

const bodySchemaUser = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*')).required(),
    age: Joi.number().integer().min(4).max(130)
});

module.exports = {
    create: userValidator.body(bodySchemaUser),
    update: userValidator.body({...bodySchemaUser, id: Joi.string().required()}),
}
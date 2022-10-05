const Joi = require('joi');

const errMsgLogin = {
  email: {
    'any.required': 'O campo "email" é obrigatório',
    'string.email': 'O "email" deve ter o formato "email@email.com"',
  },
  password: {
    'any.required': 'O campo "password" é obrigatório',
    'string.min': 'O "password" deve ter pelo menos 6 caracteres',
  },
};

const schema = Joi.object().keys({
  email: Joi.string().trim().email().required()
    .messages(errMsgLogin.email),
  password: Joi.string().min(6).required().messages(errMsgLogin.password),
});

module.exports = schema;

const Joi = require('joi');

const errMsgTalker = {
  name: {
    'string.min': 'O "name" deve ter pelo menos 3 caracteres',
    'any.required': 'O campo "name" é obrigatório',
  },
  age: {
    'number.min': 'A pessoa palestrante deve ser maior de idade',
    'any.required': 'O campo "age" é obrigatório',
  },
  talk: {
    'any.required': 'O campo "talk" é obrigatório',
  },
  watchedAt: {
    'any.required': 'O campo "watchedAt" é obrigatório',
    'string.pattern.base': 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  },
  rate: {
    'any.required': 'O campo "rate" é obrigatório',
    'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
    'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
  },
};

const talkObjKeySchema = Joi.object().keys({
  watchedAt: Joi.string().pattern(/[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}/).required()
    .messages(errMsgTalker.watchedAt),
  rate: Joi.number().integer().min(1).max(5)
    .required()
    .messages(errMsgTalker.rate),
});
const schema = Joi.object().keys({
  name: Joi.string().trim().min(3).required()
    .messages(errMsgTalker.name),
  age: Joi.number().min(18).required().messages(errMsgTalker.age),
  talk: talkObjKeySchema.required().messages(errMsgTalker.talk),
});

module.exports = schema;

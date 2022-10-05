const Joi = require('joi');

const errMsgTalker = {
  age: {
    'number.min': 'A pessoa palestrante deve ser maior de idade',
  },
  watchedAt: {
    'string.pattern.base': 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  },
  rate: {
    'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
    'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
  },
};

const talkObjKeySchema = Joi.object().keys({
  watchedAt: Joi.string().pattern(/[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}/).required()
    .label('watchedAt')
    .messages(errMsgTalker.watchedAt),
  rate: Joi.number().integer().min(1).max(5)
    .required()
    .label('rate')
    .messages(errMsgTalker.rate),
});
const schema = Joi.object().keys({
  name: Joi.string().trim().min(3).required(),
  age: Joi.number().min(18).required().messages(errMsgTalker.age),
  talk: talkObjKeySchema.required(),
}).messages({
  'any.required': 'O campo {{#label}} é obrigatório',
  'string.min': 'O {{#label}} deve ter pelo menos {{#limit}} caracteres',
});

module.exports = schema;

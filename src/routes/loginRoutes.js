const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Joi = require('joi');
const { saveToken } = require('../utils/fsUtils');

const router = express.Router();

router.use(bodyParser.json());

const emailErrMsg = {
  'any.required': 'O campo "email" é obrigatório',
  'string.email': 'O "email" deve ter o formato "email@email.com"',
};

const passwordErrMsg = {
  'any.required': 'O campo "password" é obrigatório',
  'string.min': 'O "password" deve ter pelo menos 6 caracteres',
};

function validateUserLogin(userDataObj) {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required()
      .messages(emailErrMsg),
    password: Joi.string().min(6).required().messages(passwordErrMsg),
  });
  const { error } = schema.validate(userDataObj);
  return error;
}

router.post('/', async (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const error = validateUserLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  await saveToken(token);
  res.status(200).json({ token });
});

module.exports = router;

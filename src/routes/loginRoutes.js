const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Joi = require('joi');

const router = express.Router();

router.use(bodyParser.json());

function convertErrorMessage(errorMessage) {
  if (errorMessage.search(/"email" is required/i) >= 0) {
    return 'O campo "email" é obrigatório';
  }

  if (errorMessage.search(/"email" must be/i) >= 0) {
    return 'O "email" deve ter o formato "email@email.com"';
  }

  if (errorMessage.search(/"password" is required/i) >= 0) {
    return 'O campo "password" é obrigatório';
  }

  if (errorMessage.search(/"password" length/i) >= 0) {
    return 'O "password" deve ter pelo menos 6 caracteres';
  }
}

router.post('/', (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const schema = Joi.object().keys({
    email: Joi.string().trim().email()
            .required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error.message);
    const message = convertErrorMessage(error.message);
    console.log(message);
    return res.status(400).json({ message });
  }
  res.status(200).json({ token });
});

module.exports = router;

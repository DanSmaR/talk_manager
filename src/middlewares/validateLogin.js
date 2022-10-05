const schemaLogin = require('../validationJoi/loginValidation ');

function validateUserLogin(req, res, next) {
  const { error } = schemaLogin.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

module.exports = validateUserLogin;
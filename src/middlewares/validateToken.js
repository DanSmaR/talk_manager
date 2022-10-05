const { getToken } = require('../utils/fsUtils');

async function isTokenValid(userToken) {
  const tokenInDatabase = await getToken();
  return userToken === tokenInDatabase;
}

async function validateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  const isTokenConfirmed = await isTokenValid(token);
  if (!isTokenConfirmed) return res.status(401).json({ message: 'Token inválido' });
  next();
}

module.exports = validateToken;

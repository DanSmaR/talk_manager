const { getTalkerById } = require('../utils/fsUtils');
const schemaTalker = require('../validationJoi/talkerValidation');

async function checkHasTalker(req, res, next) {
  const { talkerId } = req.params;
  const talker = await getTalkerById(Number(talkerId));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  req.talker = talker;
  next();
}

function validateNewTalker(req, res, next) {
  const { error } = schemaTalker.validate(req.body);
  console.log(error);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

module.exports = {
  checkHasTalker,
  validateNewTalker,
};

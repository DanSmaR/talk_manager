const { getAllTalkers, addNewTalker, updateTalker, deleteTalker, searchTalker } = require('../utils/fsUtils');
const { validateNewTalker, checkHasTalker } = require('../middlewares/validateTalker');
const validateToken = require('../middlewares/validateToken');

async function getTalkers(_req, res) {
  const talkers = await getAllTalkers();
  if (!talkers) return res.status(500).json({ message: 'data not found' });
  res.status(200).json(talkers);
}

async function getOneTalker(req, res) {
  res.status(200).json(req.talker);
}

async function removeTalker(req, res) {
  const { talkerId } = req.params;
  const isTalkerDeleted = await deleteTalker(Number(talkerId));
  if (!isTalkerDeleted) return res.status(500).json({ message: 'talker not deleted' });
  res.status(204).end();
}

async function insertTalker(req, res) {
  const newTalker = await addNewTalker(req.body);
  if (!newTalker) return res.status(500).json({ message: 'Talker not created' });
  res.status(201).json(newTalker);
}

async function editTalker(req, res) {
  const { talkerId } = req.params;
  const newTalkerData = req.body;
  const talkerUpdated = await updateTalker(Number(talkerId), newTalkerData);
  if (!talkerUpdated) return res.status(500).json({ message: 'talker not updated' });
  res.status(200).json(talkerUpdated);
}

async function searchTalkerByName(req, res) {
  const { q } = req.query;
  const filteredTalkersList = await searchTalker(q);
  if (filteredTalkersList === null) {
    return res.status(500).json({ message: 'Talkers not found in database' }); 
  }
  res.status(200).json(filteredTalkersList);
}

module.exports = {
  getTalkers,
  getOneTalker,
  removeTalker,
  insertTalker,
  editTalker,
  searchTalkerByName,
};
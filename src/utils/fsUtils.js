const fs = require('fs').promises;
const path = require('path');

const PATH_TALKER_LIST = path.resolve(__dirname, '..', 'talker.json');

async function getAllTalkers() {
  return JSON.parse(await fs.readFile(PATH_TALKER_LIST, 'utf-8'));
}

async function getTalkerById(talkerId) {
  const talkersList = await getAllTalkers();
  return talkersList.find(({ id }) => id === talkerId);
}

module.exports = {
  getAllTalkers,
  getTalkerById,
};

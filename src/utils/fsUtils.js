const fs = require('fs').promises;
const path = require('path');

const PATH_TALKER_LIST = path.resolve(__dirname, '..', 'talker.json');
const PATH_TOKEN = path.resolve(__dirname, '..', 'token.txt');

async function getAllTalkers() {
  return JSON.parse(await fs.readFile(PATH_TALKER_LIST, 'utf-8'));
}

async function getTalkerById(talkerId) {
  const talkersList = await getAllTalkers();
  return talkersList.find(({ id }) => id === talkerId);
}

async function saveToken(token) {
  await fs.writeFile(PATH_TOKEN, token);
}

async function getToken() {
  return fs.readFile(PATH_TOKEN, 'utf-8');
}

module.exports = {
  getAllTalkers,
  getTalkerById,
  saveToken,
  getToken,
};

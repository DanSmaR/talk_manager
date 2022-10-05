const fs = require('fs').promises;
const path = require('path');

const PATH_TALKER_LIST = path.resolve(__dirname, '..', 'talker.json');
const PATH_TOKEN = path.resolve(__dirname, '..', 'token.txt');

function getMaxId(talkerList) {
  const newUserList = [...talkerList];
  return newUserList.sort((a, b) => b.id - a.id)[0].id + 1;
}

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

async function addNewTalker(newTalker) {
  const prevTalkerList = await getAllTalkers();
  const newTalkerWithId = {
    name: newTalker.name,
    age: newTalker.age,
    id: getMaxId(prevTalkerList),
    talk: newTalker.talk,
  };
  const newTalkerList = JSON.stringify([...prevTalkerList, newTalkerWithId], null, 2);
  await fs.writeFile(PATH_TALKER_LIST, newTalkerList);
  return newTalkerWithId;
}

module.exports = {
  getAllTalkers,
  getTalkerById,
  saveToken,
  getToken,
  addNewTalker,
};

'use strict';
const findById = (fbid, sessionStore) => {
  for(let [key, value] of sessionStore) {
    if(value.fbid === fbid) {
      return key;
    }
  }
}

const fetchEntity = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value;

    if(!val) {
      return null;
    } else {
      return typeof val === 'object' ? val.value : val;
    }
}

module.exports = {
  findById,
  fetchEntity
}

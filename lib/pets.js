const fs = require('fs');
const path = require('path');

function filterByQuery(query, petsArray) {
  let personalityTraitsArray = [];
  let filteredResults = petsArray;
  if (query.personalityTraits) {
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    console.log(personalityTraitsArray);
    personalityTraitsArray.forEach(trait => {
      filteredResults = filteredResults.filter(
        pet => pet.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.species) {
    filteredResults = filteredResults.filter(pet => pet.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(pet => pet.name === query.name);
  }
  return filteredResults;
}

function findById(id, petsArray) {
  const result = petsArray.filter(pet => pet.id === id)[0];
  return result;
}

function createNewPet(body, petsArray) {
  const pet = body;
  petsArray.push(pet);
  fs.writeFileSync(
    path.join(__dirname, '../data/pets.json'),
    JSON.stringify({ pets: petsArray }, null, 2)
  );
  return pet;
}

function validatePet(pet) {
  if (!pet.name || typeof pet.name !== 'string') {
    return false;
  }
  if (!pet.species || typeof pet.species !== 'string') {
    return false;
  }
  if (!pet.personalityTraits || !Array.isArray(pet.personalityTraits)) {
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNewPet,
  validatePet,
};
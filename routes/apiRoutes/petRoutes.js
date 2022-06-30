const router = require('express').Router();
const { filterByQuery, findById, createNewPet, validatePet} = require('../../lib/pets');
const { pets } = require('../../data/pets');
const { validatePet, createNewPet } = require('../../lib/pets');

router.get('/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/pets/:id', (req, res) => {
  const result = findById(req.params.id, pets);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/pets', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = pets.length.toString();

  if (!validatePet(req.body)) {
    res.status(400).send('The pet is not properly formatted.');
  } else {
    const pet = createNewPet(req.body, pets);
    res.json(pet);
  }
});

module.exports = router;
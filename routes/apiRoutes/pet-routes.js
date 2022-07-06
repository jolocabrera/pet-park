const router = require("express").Router();
const { Pet, User } = require("../../models");

// get all pets
router.get("/", (req, res) => {
  console.log("=================");
  Pet.findAll({
    attributes: ["id", "name", "species", "description", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPetData) => res.json(dbPetData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get pet by id #
router.get("/:id", (req, res) => {
  Pet.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name", "species", "description", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPetData) => {
      if (!dbPetData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPetData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//creates a pet
router.post("/", (req, res) => {
  // expects {name: 'Fluffy', species: 'Dog', description: 'Fun, family friendly, hates cheese', user_id: 1}
  Pet.create({
    name: req.body.name,
    species: req.body.species,
    description: req.body.description,
    user_id: req.body.user_id,
  })
    .then((dbPetData) => res.json(dbPetData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//updates name and description of pet
router.put("/:id", (req, res) => {
  Pet.update(
    {
      name: req.body.name,
      description: req.body.description,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPetData) => {
      if (!dbPetData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPetData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//deletes a pet
router.delete("/:id", (req, res) => {
  Pet.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPetData) => {
      if (!dbPetData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPetData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

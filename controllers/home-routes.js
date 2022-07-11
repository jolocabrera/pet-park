const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Pet } = require("../models");

// Main Page Route (homepage)
router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("homepage", {loggedIn: req.session.loggedIn});
});

// Login Page Route 
router.get("/login", (req, res) => {
  res.render("login", {loggedIn: req.session.loggedIn});
});

router.get("/createpet", (req, res) => {
  res.render("createpet", );
});

//Main Page Route (dashboard)
router.get("/dashboard", (req, res) => {
  console.log(req.session);
  Pet.findAll({
    // where: {
    //   user_id: req.session.user_id
    // },
    attributes: ["id", "name", "species","description","user_id"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPetData) => {
      // pass a single pet object into the homepage template
      const pets = dbPetData.map((pet) => pet.get({ plain: true }));
      // const pets = dbPetData.get({plain: true})
      const userPet = pets.find((obj) => {
        return obj.user_id === req.session.user_id;
      })
      // const pets = dbPetData.get({ plain: true });
      res.render("dashboard", { pets,userPet, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//single user page
router.get("/user/:id", (req, res) => {
  console.log(req.session);
  Pet.findOne({
    where: {
      user_id: req.params.id
    },
    attributes: ["id", "name", "species","description","user_id"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPetData) => {
      // pass a single pet object into the homepage template
      const pet = dbPetData.get({plain: true})
      res.render("userpage", { pet, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;

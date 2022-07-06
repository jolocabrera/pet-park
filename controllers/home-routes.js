const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Pet } = require("../models");

// Main Page Route
router.get("/", (req, res) => {
  res.render("homepage");
});

// Login Page Route (home page)
router.get("/login", (req, res) => {
  //   if (req.session.loggedIn) {
  //     res.redirect("/");
  //     return;
  //   }

  res.render("login");
});

router.get("/createpet", (req, res) => {
  res.render("createpet");
});

//Main Page Route (dashboard)
router.get("/dashboard", (req, res) => {
  console.log(req.session);
  Pet.findAll({
    attributes: ["id", "name", "species"],
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
      res.render("dashboard", { pets });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

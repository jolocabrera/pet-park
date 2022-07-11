const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Pet } = require("../models");

// Main Page Route
router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("homepage");
});

// Login Page Route (home page)
router.get("/login", (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect("/dashboard");
  //   return;
  // }

  res.render("login");
});

router.get("/createpet", (req, res) => {
  res.render("createpet");
});

//Main Page Route (dashboard)
router.get("/dashboard", (req, res) => {
  console.log(req.session);
  Pet.findAll({
    attributes: ["id", "name", "species","description"],
    include: [
      {
        model: User,
        attributes: ["username","user_id"],
      },
    ],
  })
    .then((dbPetData) => {
      console.log(dbPetData);
      // pass a single pet object into the homepage template
      const pets = dbPetData.map((pet) => pet.get({ plain: true }));
      // const pets = dbPetData.get({ plain: true });
      res.render("dashboard", { pets });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

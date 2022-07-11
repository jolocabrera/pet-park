const User = require("./User");
const Pet = require("./Pet");

//create associations
User.hasOne(Pet, {
  foreignKey: "user_id",
});

Pet.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Pet };

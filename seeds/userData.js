const { User } = require('../models');

const userdata =
[
  {
    "username": "Robina",
    "password": "password"
  },
  {
    "username": "Annie",
    "password": "password"
  },
  {
    "username": "Mike",
    "password": "password"
  }
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;


"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let roles = [true, false];
    let employment = [true, false];
    

    let generateUser = function() {
      return {
        fullName: faker.name.firstName() + faker.name.lastName(),
        email: faker.internet.email(),
        password: "root",
        role: roles[Math.floor(Math.random() * roles.length)],
        location: faker.address.streetAddress(),
        technologies: faker.lorem.word(),
        courseGraduated: faker.lorem.word(),
        employment: employment[Math.floor(Math.random() * employment.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    };
    let payload = [];

    for (let index = 0; index < 100; index++) {
      payload.push(generateUser());
    }
    return queryInterface.bulkInsert("Users", payload);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};

"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let industry = ["Tech", "Agriculture", "HR", "Medical supplies", "Dentistry"]
    
    let generateUser = function() {
      return {
        companyName:faker.company.companyName(),
        numberEmployees:faker.random.number(),
        industry: industry[Math.floor(Math.random() * industry.length)],
        location: faker.address.city(),
        createdAt: new Date(),
        updatedAt: new Date(),

      };
    };
    let payload = [];

    for (let index = 0; index < 100; index++) {
      payload.push(generateUser());
    }
    return queryInterface.bulkInsert("Companies", payload);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Companies", null, {});
  },
};


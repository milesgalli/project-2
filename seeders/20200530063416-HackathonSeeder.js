"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {

  
    let generateUser = function() {
      return {
        title: faker.name.title(),
        description: faker.lorem.words(),
        maxStudent:faker.random.number(), 
        startDate:new Date(),
        endDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    };
  //   title: { type: DataTypes.STRING },
  //   description: { type: DataTypes.STRING },
  //   maxStudent: { type: DataTypes.INTEGER },
  //   startDate: { type: DataTypes.DATE },
  //   endDate: { type: DataTypes.DATE },
  //   createdAt: { type: DataTypes.DATE },
  //   updatedAt: { type: DataTypes.DATE },
  // });
    let payload = [];

    for (let index = 0; index < 100; index++) {
      payload.push(generateUser());
    }
    return queryInterface.bulkInsert("Hackathons", payload);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Hackathons", null, {});
  },
};

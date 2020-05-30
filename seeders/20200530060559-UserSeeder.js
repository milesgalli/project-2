'use strict';
const faker = require('faker');
const bcrypt = require("bcryptjs");


module.exports = {
  up: (queryInterface, Sequelize) => {


    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

   return queryInterface.bulkInsert('Users', [{
    fullName: 'yolomir', 
    email: "galli.miles@gmail.com",
    password: 'secret',
    role:true,
    location: "attadale", 
    technologies: "html, js", 
    courseGraduated: 'uwa', 
    employment: true, 
    createdAt: new Date(), 
    updatedAt: new Date(), 

  }], {});
  },
  

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

'use strict';
const faker = require('faker');
const se

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

   return queryInterface.bulkInsert('Companys', [{
    companyName: 'Facebook', 
    numberEmployees: "50",
    password: 'secret',
    industry: "Technology",
    location: "West Perth", 
    startDate: new Date(), 
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

'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
   

   return queryInterface.bulkInsert('Hackathons', [{
    title: 'Inventory Management issue', 
    description: "Keep loosing track of incoming and items in the warehouse",
    password: 'secret',
    maxStudent: 10,
    location: "attadale", 
    startDate: new Date(), 
    endDate: 2020-06-20, 
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

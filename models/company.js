module.exports = function (sequelize, Sequelize) {
  // Sequelize user model is initialized earlier as User
  const Company = sequelize.define("Company", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    company_name: { type: Sequelize.STRING },
    number_employees: { type: Sequelize.INTEGER },
    email: { type: Sequelize.STRING, validate: { isEmail: true } },
    industry: { type: Sequelize.STRING },
    location: { type: Sequelize.STRING },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE },

  });

  Company.associate = function (models) {
   Company.hasMany(models.User)
 };


  // User.drop();
  return Company;
};

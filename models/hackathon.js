module.exports = function (sequelize, Sequelize) {
  // Sequelize user model is initialized earlier as User
  const Hackathon = sequelize.define("Hackathon", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    maxStudent: { type: Sequelize.INTEGER },
    startDate: { type: Sequelize.DATE },
    endDate: { type: Sequelize.DATE },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE },
  });

  Hackathon.associate = function (models) {
    Hackathon.belongsTo(models.Company, {
      foreignKey: "companyId",
    });
    Hackathon.belongsToMany(models.User, { through: "HackathonUser" });

 
  };

  return Hackathon;
};

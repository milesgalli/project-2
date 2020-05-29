module.exports = function (sequelize,DataTypes) {
  // DataTypes user model is initialized earlier as User
  const Hackathon = sequelize.define("Hackathon", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    maxStudent: { type: DataTypes.INTEGER },
    startDate: { type: DataTypes.DATE },
    endDate: { type: DataTypes.DATE },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  });

  Hackathon.associate = function (models) {
    Hackathon.belongsTo(models.Company, {
      foreignKey: "companyIdentification",
    });
    Hackathon.belongsToMany(models.User, { through: "HackathonUser" });

 
  };

  return Hackathon;
};

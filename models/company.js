module.exports = function (sequelize, DataTypes) {
  // DataTypes user model is initialized earlier as User
  const Company = sequelize.define("Company", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    companyName: { type: DataTypes.STRING },
    numberEmployees: { type: DataTypes.INTEGER },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    industry: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },

  });

  Company.associate = function (models) {
   Company.hasMany(models.User)
 };


  // User.drop();
  return Company;
};

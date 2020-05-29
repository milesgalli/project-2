module.exports = function(sequelize, DataTypes) {
  const HackathonUser = sequelize.define("HackathonUser", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    userIdentification: {
      type: DataTypes.INTEGER,
    },
    hackathonIdentification: {
      type: DataTypes.INTEGER,
    },
  });


  return HackathonUser;
};

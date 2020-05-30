module.exports = function(sequelize, DataTypes) {
  const HackathonUser = sequelize.define("HackathonUser", {

    UserId: {
      type: DataTypes.INTEGER,primaryKey: true, 
    },
    HackathonId: {
      type: DataTypes.INTEGER,primaryKey: true, 
    },
  });


  return HackathonUser;
};

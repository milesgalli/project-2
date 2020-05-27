module.exports = function (sequelize, Sequelize) {

  const HackathonUser = sequelize.define("HackathonUser", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: models.User, // 'Movies' would also work
        key: "id",
      },
    },
    hackathonId: {
      type: DataTypes.INTEGER,
      references: {
        model: models.Hackathon, // 'Actors' would also work
        key: "id",
      },
    },
  });

  return HackathonUser;
};

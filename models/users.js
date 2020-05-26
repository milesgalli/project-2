module.exports = function (sequelize, Sequelize) {
  // Sequelize user model is initialized earlier as User
  const Hackathon = sequelize.define("Hackathon", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    firstname: { type: Sequelize.STRING },
    lastname: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING, validate: { isEmail: true } },
    password: { type: Sequelize.STRING },
    location: {type:Sequelize.STRING},
    // 
    technologies:{type:Sequelize.STRING},
    course_graduated: {type:Sequelize.STRING},
    employment: {type:Sequelize.STRING},
    businessname:{type:Sequelize.STRING},


  });

  // User.drop();
  return User;
};

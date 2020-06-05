// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
const db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/dashboard", isAuthenticated, function(req, res) {
    // retrieves user info from database
    const user = db.User.findOne({
      where: {
        id: req.user.id,
      },
      include: { model: db.Company },
    });
    // retrieves all hackathons from database
    const hackathons = db.Hackathon.findAll({
      raw: true,
      include: {
        model: db.Company,
      },
    });

    // retrieves all hackathons a student is attending from database
    const attending = db.Hackathon.findAll({
      include: {
        model: db.User,
        where: {
          id: req.user.id,
        },
      },
    });
    // retrieves all hackathons a company user has created from database
    const created = db.Hackathon.findAll({
      where: {
        CompanyId: req.user.CompanyId,
      },
    });
    // retrieves users associated to a hackathon
    const user_in_hackathons = db.Hackathon.findAll({
      where: {
        CompanyId: req.user.CompanyId,
      },
      include: {
        model: db.User,
      },
    });

    Promise.all([
      user,
      hackathons,
      attending,
      created,
      user_in_hackathons,
    ]).then((responses) => {
      // console.log(responses[4]);
      // res.json(responses[1]);
      // return;
      const data = {
        user: responses[0].dataValues,
        hackathons: responses[1],
        attending: responses[2],
        created: responses[3],
        usersAttendingHackathons: responses[4],
      };
      // console.log(responses[4]);
      res.render("dashboard", data);
    });
  });
};

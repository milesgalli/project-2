// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
const db = require("../models/index.js");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app
    .get("/student-dashboard", isAuthenticated, function(req, res) {
      console.log(req.user);
      // console.log(results);

      // res.json(results);
      res.render("student-dashboard", req.user);
    })
 

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/create-hackathon", function(req, res) {});

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    // check user type
    let isCompanyUser = true; // FIX this

    // if company user redirect to company profile pg
    if (isCompanyUser) {
      // TODO: fetch hackathonds data from db

      //  TODO: fetch company data from db
      res.render("company-dashboard", {
        hackathons: [],
        company: {},
      });
    } else {
      res.render("student.-dashboard", {});
    }

    // if student user redirect to student profile page

    // render
    res.render();

    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};

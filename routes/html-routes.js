// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });
  app.get("/student-dashboard", function(req, res) {
    res.render("student-dashboard");
  });
  app.get("/student-dashboard", function(req, res) {
    res.render("company-dashboard");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });


  app.get('/create-hackathon', function(req, res){

  })

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {

    // check user type
    let isCompanyUser = true  // FIX this

    // if company user redirect to company profile pg
    if(isCompanyUser){

      // TODO: fetch hackathonds data from db

      //  TODO: fetch company data from db
      res.render('company-dashboard', {
        hackathons:  [],
        company: {}
      })
    }else{


      res.render('student.-dashboard', {})
    }

    // if student user redirect to student profile page


    // render
    res.render()

    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};

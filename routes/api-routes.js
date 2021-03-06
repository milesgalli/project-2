// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error

  // LEAVE
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  // LEAVE
  // Route for signing up user if role = 0 then is a student user, if role = 1 then a company user
  app.post("/api/user/signup", function(req, res) {
    console.log(req.body);
    if (req.body.role === "0") {
      db.User.create({
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
        location: req.body.location,
        role: req.body.role,
        technologies: req.body.technologies,
        courseGraduated: req.body.courseGraduated,
        employment: req.body.employment,
      })
        .then(function() {
          res.redirect(307, "/api/login");
        })
        .catch(function(err) {
          res.status(422).json(err);
        });
    } else {
      db.Company.create({
        companyName: req.body.companyName,
        numberEmployees: req.body.numberEmployees,
        industry: req.body.industry,
        location: req.body.location,
      })
        .then(
          // gets the id of the latest company created and assigns it to the user (using a +1 as it actually gets the previous company - not the one just created???)
          db.Company.findAll({
            limit: 1,
            order: [["createdAt", "DESC"]],
          }).then(function(result) {
            // console.log(result[0].dataValues.id);
            db.User.create({
              email: req.body.email,
              password: req.body.password,
              fullName: req.body.fullName,
              location: req.body.location,
              role: req.body.role,
              CompanyId: result[0].dataValues.id + 1,
            });
          })
        )
        .then(function() {
          res.redirect(307,"/api/login");
        })
        .catch(function(err) {
          res.status(422).json(err);
        });
    }
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // route for a user joining a hackathon
  app.post("/api/users/join-hackathon/:id", function(req, res) {
    console.log(req.user);
    db.HackathonUser.create({
      UserId: req.user.id,
      HackathonId: req.params.id,
    })
      .then(function(hackathon) {
        res.json(hackathon);
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  });


  // Post Route for Creating a new Post

  app.post("/api/hackathons", function(req, res) {
  
    db.Hackathon.create({
      title: req.body.title,
      description: req.body.description,
      maxStudent: req.body.maxStudent,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      CompanyId: req.user.CompanyId, 
    }).then(function(dbHackathon) {
      res.json(dbHackathon);
    });
  });

  // Route for deleting hackathons post
  app.delete("/api/hackathons/:id", function(req, res) {
    db.Hackathon.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function(dbHackathon) {
      res.json(dbHackathon);
    });
  });

  // Route for unjoining hackathon
  app.delete("/api/hackathons/unjoin/:id", function(req, res) {
    // console.log(UserId);
    db.HackathonUser.destroy({
      where: {
        HackathonId: req.params.id,
        UserId: req.user.id,
      },
    }).then(function(dbHackathon) {
      res.json(dbHackathon);
    });
  });

  //last parenthesis for app
};

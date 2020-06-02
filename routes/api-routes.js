// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error

  // could have api/student signup

  // LEAVE
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error

  // LEAVE

  app.post("/api/user/signup", function(req, res) {
    console.log(req.body);
    // console.log(req.body);
    if (req.body.role === "0") {
      // console.log("creating student");
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
      db.User.create({
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName,
        location: req.body.location,
        role: req.body.role,
        CompanyId: 1,
      });
      db.Company.create({
        companyName: req.body.companyName,
        numberEmployees: req.body.numberEmployees,
        industry: req.body.industry,
        location: req.body.location,
      })
        .then(function() {
          res.redirect(307, "/api/login");
        })
        .catch(function(err) {
          res.status(422).json(err);
        });
    }
  });

  // redirect company to signup form

  //post request

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

  // Get Route for finding all Hackathons

  app.get("/api/hackathons/", function(req, res) {
    db.Hackathon.findAll({}).then(function(dbHackathon) {
      res.json(dbHackathon);
    });
  });

  // Get Route for retreieving a hackathon post from a specific company

  //check when populated
  app.get("/api/company/:companyName", function(req, res) {
    db.Hackathon.findAll({
      where: {
        companyName: req.params.companyName,
      },
    }).then(function(dbCompany) {
      res.json(dbCompany);
    });
  });

  app.post("/api/users/join-hackathon/:id", function(req, res) {
    console.log(req.user);
    db.HackathonUser.create({
      UserId: req.user.id,
      HackathonId: req.params.id,
    }).then(function(hackathon) {
      res.json(hackathon);
    });
  });

  app.get("/playground", function(req, res) {
    db.User.findOne({ where: { id: 1 } }).then((user) => {
      db.Hackathon.findOne({ where: { id: 1 } }).then((hackathon) => {
        user.joinHackathon(hackathon);
        res.json({ data: "ok" });
      });
    });
  });

  // Post Route for Creating a new Post

  app.post("/api/hackathons", function(req, res) {
    // if(!req.user.CompanyId){
    //   res.json({errpr: "You are not a company user!!!"}).status(401)
    // }

    //checked
    db.Hackathon.create({
      title: req.body.title,
      description: req.body.description,
      maxStudent: req.body.maxStudent,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      // CompanyId: req.user.CompanyId
      CompanyId: null, // FIXME: fix this req.user.CompanyId
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

  // route for updating hackathon posts

  app.put("/api/hackathons", function(req, res) {
    db.Hackathon.update(req.body, {
      where: {
        title: req.body.title,
        description: req.body.description,
        maxStudent: req.body.maxStudent,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
    }).then(function(dbHackathon) {
      res.json(dbHackathon);
    });
  });

  // LEAVE

  app.post("/api/hackathon/hackathonUser", function(req, res) {
    db.HackathonUser.create({
      UserId: req.user,
      HackathonId: req.body.HackathonId,
    })
      .then(function() {
        res.redirect(307, "/api/hackathons");
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  });

  // Need to create one to get the userId from the hackathon

  app.get("/api/hackathon/hackathonUser/:UserId", function(req, res) {
    db.HackathonUser.findOne({
      where: {
        UserId: req.user,
      },
    })
      .then(function() {
        res.redirect(307, "/api/hackathons");
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  });

  app.get("/api/hackathon/hackathonUser/:HackathonId", function(req, res) {
    db.HackathonUser.findOne({
      where: {
        HackathonId: req.user.HackathonId,
      },
    })
      .then(function() {
        res.redirect(307, "/api/hackathons");
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  });

  // need to create one get the hackathon Id

  // need to create a GET method for  when a user clicks going to a hackathon.

  //last parenthesis for app
};

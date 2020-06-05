  // Get Route for finding all Hackathons
  // app.get("/api/hackathons/", function(req, res) {
  //   db.Hackathon.findAll({}).then(function(dbHackathon) {
  //     res.json(dbHackathon);
  //   });
  // });

  // Get Route for retreieving a hackathon post from a specific company

  //check when populated
  // app.get("/api/company/:companyName", function(req, res) {
  //   db.Hackathon.findAll({
  //     where: {
  //       companyName: req.params.companyName,
  //     },
  //   }).then(function(dbCompany) {
  //     res.json(dbCompany);
  //   });
  // });

  //SAMS Code 

    // app.post("/api/hackathon/hackathonUser", function(req, res) {
  //   db.HackathonUser.create({
  //     UserId: req.user,
  //     HackathonId: req.body.HackathonId,
  //   }).then(function() {
  //     res.redirect(307, "/api/hackathons");
  //   });
  // });

  // app.get("/playground", function(req, res) {
  //   db.User.findOne({ where: { id: 1 } }).then((user) => {
  //     db.Hackathon.findOne({ where: { id: 1 } }).then((hackathon) => {
  //       user.joinHackathon(hackathon);
  //       res.json({ data: "ok" });
  //     });
  //   });
  // });

  // Authentication 
    // if(!req.user.CompanyId){
    //   res.json({errpr: "You are not a company user!!!"}).status(401)
    // }
    //checked


    
  // // route for updating hackathon posts
  // app.put("/api/hackathons", function(req, res) {
  //   db.Hackathon.update(req.body, {
  //     where: {
  //       title: req.body.title,
  //       description: req.body.description,
  //       maxStudent: req.body.maxStudent,
  //       startDate: req.body.startDate,
  //       endDate: req.body.endDate,
  //     },
  //   }).then(function(dbHackathon) {
  //     res.json(dbHackathon);
  //   });
  // });

  // Need to create one to get the userId from the hackathon

  // app.get("/api/hackathon/hackathonUser/:UserId", function(req, res) {
  //   db.HackathonUser.findOne({
  //     where: {
  //       UserId: req.user,
  //     },
  //   })
  //     .then(function() {
  //       res.redirect(307, "/api/hackathons");
  //     })
  //     .catch(function(err) {
  //       res.status(422).json(err);
  //     });
  // });

  // app.get("/api/hackathon/hackathonUser/:HackathonId", function(req, res) {
  //   db.HackathonUser.findOne({
  //     where: {
  //       HackathonId: req.user.HackathonId,
  //     },
  //   })
  //     .then(function() {
  //       res.redirect(307, "/api/hackathons");
  //     })
  //     .catch(function(err) {
  //       res.status(422).json(err);
  //     });
  // });

  // need to create one get the hackathon Id

  // need to create a GET method for  when a user clicks going to a hackathon.

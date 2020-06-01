$(document).ready(function() {
  // Getting references to our form and input
  let signUpForm = $("form.signup");
  let emailInput = $("input#email-input");
  let passwordInput = $("input#password-input");
  let locationInput = $("input#location-input");

  let studentNameInput = $("input#fullName-input");
  let courseInput = $("input#course-input");
  let technologyInput = $("input#technology-input");

  // let companyInput = $("input#companyInput");
  let companyNameInput = $("input#companyName-input");
  let industryInput = $("input#industry-input");
  let maxEmployeesInput = $("input#maxEmployees-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    let roleInput = $("input[name='role-answer']:checked");
    let employmentInput = $("input[name=employmentanswer]:checked");
    //states.counter = 0;
    event.preventDefault();
    let userData = {
      email: emailInput.val() ? emailInput.val().trim() : null,
      password: passwordInput ? passwordInput.val().trim() : null,
      role: roleInput.val(),
      location: locationInput.val() ? locationInput.val().trim() : null,
      fullName: studentNameInput.val() ? studentNameInput.val().trim() : null,
      technologies: technologyInput.val() ? technologyInput.val().trim() : null,
      courseGraduated: courseInput.val() ? courseInput.val().trim() : null,
      employment: employmentInput.val() ? employmentInput.val().trim() : null,
      companyName: companyNameInput.val()
        ? companyNameInput.val().trim()
        : null,
      industry: industryInput.val() ? industryInput.val().trim() : null,
      numberEmployees: maxEmployeesInput.val()
        ? maxEmployeesInput.val().trim()
        : null,
    };
    // console.log(userData);
    // console.log(JSON.stringify(userData));
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    // console.log(userData);
    $.post("/api/user/signup", userData)
      .then(function(data) {
        window.location.replace("/dashboard");
      // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  const questions = $(".questionsAppend");

  let states = {
    counter: 0,
    inputData: {
      email: "1",
      password: "null",
      user_type: "null",
    }, // student / company
  };

  //when next is clicked add 1 to state
  //when previous is clicked -1 to state
  $("#next").click(function add() {
    if (states.counter < 4) {
      states.counter++;
    }

    if (states.counter === 2) {
      // we are currently in social page
      renderUserTypeOnSignup();
    }

    if (states.counter === 3) {
      //hide next btn on last step, create submit
      $("#next").attr("style", "display:none;");
      $("#submit-btn").attr("style", "display:inline;");
    }
  });

  $("#previous").click(function add() {
    if (states.counter >= 1) {
      states.counter--;
    }

    //next is displayed when going back
    $("#next").show();
    $("#submitAppend").css("display", "none");
  });

  function renderUserTypeOnSignup() {
    let isStudent = $("#studentInput").prop("checked");
    let isCompany = $("#companyInput").prop("checked");

    if (isStudent) {
      //unhide/hide questions
      $(".student-questions").removeClass("hidden");
      $(".company-questions").addClass("hidden");
    }
    if (isCompany) {
      $(".company-questions").removeClass("hidden");
      $(".student-questions").addClass("hidden");
    }
  }
});

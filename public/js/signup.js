$(document).ready(function() {
  // Getting references to our form and input
  let signUpForm = $("form.signup");
  let emailInput = $("input#email-input");
  let passwordInput = $("input#password-input");
  let locationInput = $("input#location-input");

  let studentNameInput = $("input#fullName-input");
  let courseInput = $("input#course-input");
  let technologyInput = $("input#technology-input");

  let companyNameInput = $("input#companyName-input");
  let industryInput = $("input#industry-input");
  let maxEmployeesInput = $("input#maxEmployees-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    let roleInput = $("input[name='roleAnswer']:checked");
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
    signUpUser(userData)
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

  let states = {
    counter: 0
  };

  function nextStep() {
    states.counter++;
    document.getElementById('next-hidden').click();
  }

  //when next is clicked add 1 to state
  //when previous is clicked -1 to state
  $("#next").click(function(event) {

    event.preventDefault();

    let isStudent = $("#studentInput").prop("checked");
    let isCompany = $("#companyInput").prop("checked");

    let userHasNotSelectedAnOption = (isStudent === false && isCompany === false);

    if(states.counter === 0 && userHasNotSelectedAnOption){
      alert("choose something");
      return;
    }

    let emptyEmailInput = $("input#email-input").val() === "";
    let emptyPasswordInput = $("input#password-input").val() === "";
    let emptyLocationInput = $("input#location-input").val() === "";

    emptyProfileQuestions = (emptyEmailInput || emptyPasswordInput || emptyLocationInput);

    if (states.counter === 1 && emptyProfileQuestions) {
      alert("cant have empty fields");
      return;
    }

      // we are currently in social page
    renderUserTypeOnSignup();


    let emptyStudentNameInput = $("input#fullName-input").val() === "";
    let emptyCourseInput = $("input#course-input").val() === "";
    let emptyTechnologyInput = $("input#technology-input").val() === "";

    emptyStudentQuestions = (emptyStudentNameInput || emptyCourseInput || emptyTechnologyInput);

    if (states.counter === 2 && isStudent && emptyStudentQuestions) {
      alert("cant be empty");
      return;
    }

    let emptyCompanyNameInput = $("input#companyName-input").val() === "";
    let emptyIndustryInput = $("input#industry-input").val() === "";
    let emptyMaxEmployeesInput = $("input#maxEmployees-input").val() === "";

    let emptyCompanyQuestions = (emptyCompanyNameInput || emptyIndustryInput || emptyMaxEmployeesInput);

    if (states.counter === 2 && isCompany && emptyCompanyQuestions) {
      alert("cant be empty");
      return;
    }

    nextStep();

    if (states.counter === 3) {
      //hide next btn on last step, create submit
      $("#next").attr("style", "display:none;");
      $("#submit-btn").attr("style", "display:inline;");
    }
  });

  $("#previous").click(function() {
    if (states.counter >= 1) {
      states.counter--;
    }
    //next is displayed when going back
    $("#next").show();
    $("#submitAppend").addClass("hidden");
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

  
  function appendError() {

    $("#appendValidateResult").empty();

    let errorHtml = $("<h1>").html("Please fill make sure all fields are filled");

    $("#appendValidateResult").append(errorHtml);

  }

  function appendSuccess() {

    $("#appendValidateResult").empty();

    let successHtml = $("<h1>").html("Your account has been created! Click the Sign Up button");

    $("#appendValidateResult").append(successHtml);
  }
});



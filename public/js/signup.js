
$(document).ready(function() {
  // Getting references to our form and input
  let signUpForm = $("form.signup");
  let emailInput = $("input#email-input");
  let passwordInput = $("input#password-input");
  let locationInput = $("input#location-input")

  // let studentInput = $("#studentInput");
  let studentNameInput = $("input#fullName-input");
  let courseInput = $("input#course-input");
  let technologyInput = $("input#technology-input");
  // let employmentInput = $("#");

  // let companyInput = $("input#companyInput");
  let companyNameInput = $("input#companyName-input");
  let industryInput = $("input#industry-input");
  let maxEmployeesInput = $("input#maxEmployees");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      location: locationInput.val().trim(),
      technologies: technologyInput.val().trim(),
      course_graduated: courseInput.val().trim(),
      employment: employmentInput.val().trim(),
      industry: industryInput.val().trim(),
      numberEmployees: maxEmployeesInput.val().trim(),

    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", states.inputData)
      .then(function(data) {
        window.location.replace("/members");
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
      user_type: "null"
    },  // student / company
  }

  //when next is clicked add 1 to state
  //when previous is clicked -1 to state
  $("#next").click(function add() {

    if (states.counter <= 5) {
      states.counter++;
      console.log(states.counter)
    }

    if(states.counter === 2){
      // we are currently in social page
      renderUserTypeOnSignup()
    }

    if (states.counter === 3) {
      //hide next btn on last step, create submit
      $("#next").attr('style', 'display:none;');
      $("#submitAppend").append(`<a type="submit" class="button is-light">Sign Up</a>`)
    } 

    //error if student or company isnt clicked

    if (!$("#studentInput").is(':checked') || !$("#companyInput").is(':checked')) {
      questionsError();
    }

  })

  $("#previous").click(function add() {

    if (states.counter >= 1) {
      states.counter--;
      console.log(states.counter)
    }

    //next is displayed when going back
    $("#next").show();
    $("#submitAppend").css("display", "none")

  })

  function renderUserTypeOnSignup() {

    questions.empty()

    let isStudent = $("#studentInput").prop("checked")
    let isCompany = $("#companyInput").prop("checked")

    if (isStudent) {

      let studentQuestionText = `
          <label for="exampleInputFullName">Full Name</label>
          <div class="control">
              <input type="text" class="input" id="fullName-input">
          </div>
        </div>
        <div class="field">
          <label for="exampleInputCourse">What course did you gaduate from?</label>
          <div class="control">
            <input type="text" class="input" id="course-input">
          </div>
        </div>
        <div class="field">
          <label for="exampleInputTechnologies">What technology feilds are you experienced in?</label>
          <div class="control">
            <input type="text" class="input" id="technology-input">
          </div>
        </div>
        <div class="field">
        <div class="control">
          <label class="radio" for="exampleInputEmployment">Were you looking for employment?
            <input type="radio" name="answer">Yes
          </label>
          <label class="radio">
            <input type="radio" name="answer">No
          </label>
        </div>
      </div>
      `;
      questions.append(studentQuestionText);
    }
    if (isCompany) {

      let companyQuestionText = `
          <label for="exampleInputCompanyName">Company Name</label>
          <div class="control">
            <input type="text" class="input" id="companyName-input">
          </div>
        </div>
        <div class="field">
        <label for="exampleInputIndustry">What industry is your company in?</label>
        <div class="control">
          <input type="text" class="input" id="industry-input">
        </div>
      </div>
      <div class="field">
        <label for="exampleInputMaxEmployees">How many employees do you have?</label>
        <div class="control">
          <input type="text" class="input" id="maxEmployees-input">
        </div>
      </div>
      `;
      questions.append(companyQuestionText);
    } 

  }
  
  // function questionsError() {
  //   questions.empty();

  //   let userChoiceError = `
  //   <p class="has-text-danger">Please choose a Student or Company on the prevous tabs before continuing<p>
  //   `

  //   questions.append(userChoiceError)
  // }

  //getting data from user input
  

});


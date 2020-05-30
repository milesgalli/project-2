
$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var studentInput = $("#studentInput");
  var companyInput = $("#companyInput");

  // emailInput.on('change', function(event){
  //   let input = event.
  // })


  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
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

    if(states.counter === 2 ){
      // we are currently in social page
      renderUserTypeOnSignup()
    }

    if (states.counter === 3 ) {
      //hide next btn on last step, create submit
      $("#next").attr('style', 'display:none;');
      $("#submitAppend").append(`<a type="submit" class="button is-light">Sign Up</a>`)
    } 

  })

  $("#previous").click(function add() {

    if (states.counter >= 1) {
      states.counter--;
      console.log(states.counter)
    }

    //next is displayed when going back
    $("#next").removeAttr('style');
    $("#submitAppend").css("display", "none")

  })

  function renderUserTypeOnSignup() {

    questions.empty()

    let isStudent = $("#studentInput").prop("checked")
    let isCompany = $("#companyInput").prop("checked")

    if (isStudent) {

      let studentQuestionText = `
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
          <label class="radio" for="exampleInputEmployment">Are you looking for employment?
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
        <label for="exampleInputIndustry">What industry is your company in?</label>
        <div class="control">
          <input type="text" class="input" id="industry-input">
        </div>
      </div>
      <div class="field">
        <label for="exampleInputMaxEmployees">How many employees do you have?</label>
        <div class="control">
          <input type="text" class="input" id="MaxEmployees-input">
        </div>
      </div>
      `;
      questions.append(companyQuestionText);
    } 

  }

  //getting data from user input

});


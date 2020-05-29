
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


  //student or company questions appeneded
  function questions() {

    const questions = $(".questionsAppend");

    if ($("#studentInput").prop("checked")) {

      let test = $("<p>").text("student");
  
      questions.append(test); 

    } if (companyInput.prop("checked")) {

      let test = $("<p>").text("company");

      questions.append(test);
    }

  }

questions();

let states = {
  step: 1,
  inputData: {
    email: "1",
    password: "null",
    user_type: "null"
  },  // studetn / company
  step: 2,
  inputData: {
    email: "2",
    password: "null",
    user_type: "null"
  },
  step: 3,
  inputData: {
    email: "3",
    password: "null",
    user_type: "null"
  },
  step: 4,
  inputData: {
    email: "4",
    password: "null",
    user_type: "null"
  }
}

  console.log(states);  

  //step listener func

  //when next is clicked add 1 to state
  //when previous is clicked -1 to state
  let counter = 0

  $("#next").click(function add() {

    if (counter <= 5) {
      counter++;
      console.log(counter)
      //console.log(states.inputData[counter])
      console.log(states.steps.val(counter))
    }
  })

  $("#previous").click(function add() {

    if (counter >= 0) {
      counter--;
      console.log(counter)
      //console.log(states.inputData[counter])
      console.log(states.steps.val(counter))
    }
  })

  console.log(states[counter])

});


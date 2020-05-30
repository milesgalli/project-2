
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
//   function questions() {

//     const questions = $(".questionsAppend");

//     if ($("#studentInput").prop("checked")) {

//       let test = $("<p>").text("student");
  
//       questions.append(test); 

//     } if (companyInput.prop("checked")) {

//       let test = $("<p>").text("company");

//       questions.append(test);
//     }

//   }

// questions();

const questions = $(".questionsAppend");

let states = {
  counter: 0,
  inputData: {
    email: "1",
    password: "null",
    user_type: "null"
  },  // student / company
}
 
  //step listener func

  //when next is clicked add 1 to state
  //when previous is clicked -1 to state

  $("#next").click(function add() {

    if (states.counter <= 5) {
      states.counter++;
      console.log(states.counter)
    }

    if(states.counter ===2 ){
      // we are currently in social page
      renderUserTypeOnSignup()
    }

  })

  $("#previous").click(function add() {

    if (states.counter >= 1) {
      states.counter--;
      console.log(states.counter)
    }
  })

  //if states.counter === this number, or/and student is checked append this

function renderUserTypeOnSignup() {

  let isCompany = $("#companyInput").prop("checked")
  let isStudent = $("#studentInput").prop("checked")

  let userType;

  if (isCompany) {
    userType = 'company'


  } 
  if (isStudent) {
    userType = "student"
  }

  let test = $("<p>").text(userType);
  
  questions.append(test); 

}

});


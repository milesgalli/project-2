let titleInput = $("#inputHackathonTitle");
let descriptionInput = $("#inputHackathonDiscription");
let maxStudentInput = $("#inputNoHackathonStudents");
let startDateInput = $("#inputHackathonStartDate");
let endDateInput = $("#inputHackathonEndDate");

$("#hackathonSubmit").click(function() {
  if (this.id == "hackathonSubmit") {
    location.reload();
  }
});

$("#hackathonSubmit").click(function() {
  let hackathonData = {
    title: titleInput.val() ? titleInput.val().trim() : null,
    description: descriptionInput ? descriptionInput.val().trim() : null,
    maxStudent: maxStudentInput.val() ? maxStudentInput.val().trim() : null,
    startDate: startDateInput.val() ? startDateInput.val().trim() : null,
    endDate: endDateInput.val() ? endDateInput.val().trim() : null,
  };
  // console.log(hackathonData);
  // console.log(JSON.stringify(hackathonData));
  createHackathon(hackathonData);
});

function createHackathon(hackathonData) {
  $.ajax({
    url: "/api/hackathons",
    method: "post",
    data: hackathonData,
  })
    .then(function() {
      location.reload();
    })
    .catch(err);
    console.log(err);
    location.reload();
}

$(".hackathonDelete").on("click", function(event) {
  var id = $(this).data("id");
  Swal.fire({
    title: "Are you sure?",
    text: "This Hackathon will be gone forever!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      // Swal.fire("Deleted!", "This Hackathon has been deleted.", "success");
      $.ajax("/api/hackathons/" + id, {
        type: "DELETE",
      }).then(function() {
        console.log("deleted hackathon ", id);
        // Reload the page to get the updated list
        location.reload();
      });
    }
  });
});

$(".hackathonJoin").on("click", function(event) {
  var id = $(this).data("id");
  // Send the POST request.
  $.ajax("/api/users/join-hackathon/" + id, {
    type: "POST",
  })
    .then(function() {
      console.log("joined hackathon ", id);
      // Reload the page to get the updated list
      location.reload();
    })
    .catch(function(err) {
      Swal.fire(
        "Unable to Join",
        "You are already attending that hackathon",
        "warning"
      );
    });
});

$(".hackathonUnjoin").on("click", function(event) {
  var id = $(this).data("id");
  // Send the DELETE request.
  $.ajax("/api/hackathons/unjoin/" + id, {
    type: "DELETE",
  })
    .then(function() {
      console.log("unjoined hackathon ", id);
      // Reload the page to get the updated list
      location.reload();
    })
    .catch(function(err) {
      alert(err);
    });
});

// function so that only certain values can be input
function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}
// makes sure only numbers are input
setInputFilter(document.getElementById("#inputNoHackathonStudents"), function(
  value
) {
  return /^[0-9]/.test(value); // Allow digits, using a RegExp
});

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
  console.log(hackathonData);
  console.log(JSON.stringify(hackathonData));
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
    .catch(handleHackathonErr);
}

function handleHackathonErr(err) {
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}

$(".hackathonDelete").on("click", function(event) {
  var id = $(this).data("id");
  if (confirm("Are you sure you want to delete this Hackathon?")) {
    // Send the DELETE request.
    $.ajax("/api/hackathons/" + id, {
      type: "DELETE",
    }).then(function() {
      console.log("deleted hackathon ", id);
      // Reload the page to get the updated list
      location.reload();
    });
  }
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
      alert("You have already joined that hackathon");
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

let titleInput = $("#inputHackathonTitle");
let descriptionInput = $("#inputHackathonDiscription");
let maxStudent = $("#inputNoHackathonStudents");
let startDate = $("#inputHackathonStartDate");
let endDate = $("#inputHackathonEndDate");

$("#hackathonSubmit").on('click', function(){

    let hackathonData = {
        title: titleInput.val() ? titleInput.val().trim() : null,
        description: descriptionInput ? descriptionInput.val().trim() : null,
        maxStudent: maxStudentInput.val() ? maxStudentInput.val().trim() : null,
        startDate: startDateNameInput.val() ? startDateNameInput.val().trim() : null,
        endDate: endDateInput.val() ? endDateInput.val().trim() : null,
    }

    createHackathon(hackathonData)
})

function createHackathon(hackathonData) {
    
    $.ajax({url: '/api/hackathon', method: "post"})
}

function handleHackathonErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
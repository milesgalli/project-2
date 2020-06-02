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

    $.ajax({url: '/api/hackathon', method: "post"})
})
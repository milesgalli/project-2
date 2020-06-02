let titleInput = $("#inputHackathonTitle");
let descriptionInput = $("#inputHackathonDiscription");
let maxStudentInput = $("#inputNoHackathonStudents");
let startDateInput = $("#inputHackathonStartDate");
let endDateInput = $("#inputHackathonEndDate");

$("#hackathonSubmit").click(function () {
    if (this.id =="hackathonSubmit") {
        location.reload();
    }
})

$("#hackathonSubmit").click(function (){

    let hackathonData = {
        title: titleInput.val() ? titleInput.val().trim() : null,
        description: descriptionInput ? descriptionInput.val().trim() : null,
        maxStudent: maxStudentInput.val() ? maxStudentInput.val().trim() : null,
        startDate: startDateInput.val() ? startDateInput.val().trim() : null,
        endDate: endDateInput.val() ? endDateInput.val().trim() : null,
    }
    console.log(hackathonData);
    console.log(JSON.stringify(hackathonData));
    createHackathon(hackathonData);
})

function createHackathon(hackathonData) {
    
    $.ajax({
        url: '/api/hackathons', 
        method: "post", 
        data: hackathonData
    }).then(function(hackathonData) {
        
    }).catch(handleHackathonErr);
}


function handleHackathonErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
}
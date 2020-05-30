$("#submit").on('click', function(){


    $.ajax({url: '/api/hackathon', method: "post"})
})
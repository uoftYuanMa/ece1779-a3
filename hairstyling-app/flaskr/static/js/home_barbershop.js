$(document).ready(function() {
    $('#nav-home').removeClass('active');
    loadResvTable()
    loadReviewTable()
});

function loadResvTable() {
    var bbname = $('#bbname').html()
    $('#resv_table').DataTable({
        "ajax": {
            "url": "https://ynybvknfjg.execute-api.us-east-1.amazonaws.com/dev/get_barbershop_resv",
            "data": {"bbname": bbname},
            "type": "POST",
            // "headers": {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            "crossDomain": true,
        },
        "columns": [
            {"data": 'Customer'},
            {"data": 'Time'},
            {"data": 'Barber'},
            {"data": 'Price'},
        ],
        "pageLength": 5
    });

}

function showAlert(msg, type, flag) {
    if (type == 'alert-warning') {
        title = "Warning: "
    } else if (type == 'alert-success') {
        title = "Success: "
    } else if (type == 'alert-danger') {
        title = "Failure: "
    } else { return ''}

    msg = "<strong>" + title + "</strong>" + msg
    alert = "<div class='alert " + type + " alert-dismissible fade show' role='alert'>" + msg
    alert += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span>"
    alert += "</button></div>"
    if(flag == 1){
        $('#review_msg').html(alert)
    } else {
        $('#msg').html(alert)
    }
}

function loadReviewTable() {
    var bbname = $('#bbname').html()
    console.log(bbname)
    $('#review_table').html('')
    $.ajax({
        type: 'POST',
        url: 'https://ynybvknfjg.execute-api.us-east-1.amazonaws.com/dev/get_barbershop_review',
        //url: '/get_barbershop_review',
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        data: bbname,
        contentType: false,
        cache: false,
        processData: false,
        async: false,
        crossDomain: true,
        success: function(data) {
            var reviewDiv1 = "<div class='media'>" +
                            "<img class='d-flex rounded-circle avatar z-depth-1-half mr-3'" +
                            "src='static/img/default.jpg' style:'weight:50%; height:50%'>" +
                            "<div class='media-body'><h5 class='mt-0 font-weight-bold blue-text'>"
            var reviewDiv2 = "</h5>"
            var reviewDiv3 = "</div></div><br>"
            var empthStar = ""

            var reviews = JSON.parse(data)['data']
            console.log(reviews)
            var reviewsDiv = ''
            for (var i=0; i < reviews.length; i++) {
                stars = ""
                for (var j=0;j<parseInt(reviews[i]['Rating']);j++) {
                    stars = stars + "<i class='fas fa-star'></i>"
                }
                for (var j=0;j<5-parseInt(reviews[i]['Rating']);j++) {
                    stars = stars + "<i class='far fa-star'></i>"
                }
                stars = "<p>" + stars + "</p>"
                reviewsDiv += reviewDiv1 + reviews[i]['Customer'] + reviewDiv2 + stars + reviews[i]['Text'] + reviewDiv3
            }
            $('#review_table').html(reviewsDiv);
        }
    });
}




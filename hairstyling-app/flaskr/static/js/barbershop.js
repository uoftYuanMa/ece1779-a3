$(document).ready(function() {
    $('#nav-home').removeClass('active');
    loadResvTable()
    $('#resv_btn').on("click", function(){
        // console.log($("input[name=resvinput]:checked").val())
        addReserve($("input[name=resvinput]:checked").val())
        $('#resv_table').DataTable().ajax.reload();
    })
    loadReviewTable()
    $('#review_btn').on("click", function(){
        addReview($('#bbname').html(), $('#reviewText').val(), $('#star-p').html())
        loadReviewTable()
    })

    $('#star1').on("click", function(){
        $('#star-p').html('1');
        $('#star1').attr('class', 'fas fa-star');
        $('#star2').attr('class', 'far fa-star');
        $('#star3').attr('class', 'far fa-star');
        $('#star4').attr('class', 'far fa-star');
        $('#star5').attr('class', 'far fa-star');
    })

    $('#star2').on("click", function(){
        $('#star-p').html('2');
        $('#star1').attr('class', 'fas fa-star');
        $('#star2').attr('class', 'fas fa-star');
        $('#star3').attr('class', 'far fa-star');
        $('#star4').attr('class', 'far fa-star');
        $('#star5').attr('class', 'far fa-star');
    })

    $('#star3').on("click", function(){
        $('#star-p').html('3');
        $('#star1').attr('class', 'fas fa-star');
        $('#star2').attr('class', 'fas fa-star');
        $('#star3').attr('class', 'fas fa-star');
        $('#star4').attr('class', 'far fa-star');
        $('#star5').attr('class', 'far fa-star');
    })

    $('#star4').on("click", function(){
        $('#star-p').html('4');
        $('#star1').attr('class', 'fas fa-star');
        $('#star2').attr('class', 'fas fa-star');
        $('#star3').attr('class', 'fas fa-star');
        $('#star4').attr('class', 'fas fa-star');
        $('#star5').attr('class', 'far fa-star');
    })

    $('#star5').on("click", function(){
        $('#star-p').html('5');
        $('#star1').attr('class', 'fas fa-star');
        $('#star2').attr('class', 'fas fa-star');
        $('#star3').attr('class', 'fas fa-star');
        $('#star4').attr('class', 'fas fa-star');
        $('#star5').attr('class', 'fas fa-star');
    })


});

function loadResvTable() {
    var bbname = $('#bbname').html()
    $('#resv_table').DataTable({
        "ajax": {
            "url": "https://ynybvknfjg.execute-api.us-east-1.amazonaws.com/dev/get_resv",
            "data": {"bbname": bbname},
            "type": "POST",
            // "headers": {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            "crossDomain": true,
        },
        "columns": [
            {
                sortable: false,
                "render": function (data, type, full, meta) {
                    return '<input type="radio" name="resvinput" value="' + full.Resvid + '"/>'
                }
            },
            {"data": 'Time'},
            {"data": 'Barber'},
            {"data": 'Price'},
        ],
        "pageLength": 5
    });

}

function addReserve(resvid) {
    console.log(resvid)
    $.ajax({
        type: 'POST',
        url: 'https://ynybvknfjg.execute-api.us-east-1.amazonaws.com/dev/put_resv',
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        // url: '/put_resv',
        data: resvid,
        contentType: false,
        cache: false,
        processData: false,
        async: false,
        crossDomain: true,
        success: function(data) {
            if(data == "1") {
                showAlert('you have made a reservation', 'alert-success')
            } else {
                showAlert('something goes wrong', 'alert-danger')
            }
        }
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
        url: 'https://ynybvknfjg.execute-api.us-east-1.amazonaws.com/dev/get_review',
        //url: '/get_review',
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

function addReview(barbershop, text, rating) {
    // console.log()
    $.ajax({
        type: 'POST',
        url: 'https://ynybvknfjg.execute-api.us-east-1.amazonaws.com/dev/put_review',
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        crossDomain: true,
        // url: '/put_review',
        data: JSON.stringify({'barbershop': barbershop, 'text': text, 'rating': rating}),
        contentType: false,
        cache: false,
        processData: false,
        async: false,
        success: function(data) {
            if(data == "1") {
                showAlert('you have submitted a review', 'alert-success', 1)
            } else {
                showAlert('something goes wrong', 'alert-danger', 1)
            }
        }
    });
}



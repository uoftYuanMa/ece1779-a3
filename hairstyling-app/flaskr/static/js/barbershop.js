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
        addReview($('#bbname').html(), $('#reviewText').val(), $('#ratingOption').val())
        $('#review_table').DataTable().ajax.reload();
    })
});

function loadResvTable() {
    var bbname = $('#bbname').html()
    $('#resv_table').DataTable({
        "processing": true,
        "serverSide": true,
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
    $('#review_table').DataTable({
        "ajax": {
            "url": "https://ynybvknfjg.execute-api.us-east-1.amazonaws.com/dev/get_review",
            "data": {"bbname": bbname},
            "type": "POST",
            // "headers": {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            "crossDomain": true,
        },
        "columns": [
            {
                "render": function (data, type, full, meta) {
                    return '<p><i class="far fa-user"></i>'+full.Customer+'</p>'
                }
            },
            {
                "render": function (data, type, full, meta) {
                    stars = ''
                    for (var i=0;i<parseInt(full.Rating);i++) {
                        stars = stars + '<i class="fas fa-star"></i>'
                    }
                    for (var i=0;i<5-parseInt(full.Rating);i++) {
                        stars = stars + '<i class="far fa-star"></i>'
                    }
                    return '<p>' + stars + '<br><br><br>'+full.Text+'</p>'
                }
            },
//            {"data": 'Customer'},
//            {"data": 'Rating'},
//            {"data": 'Text'},
        ],
        "pageLength": 8,
        "bLengthChange": false,
        "searching": false
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



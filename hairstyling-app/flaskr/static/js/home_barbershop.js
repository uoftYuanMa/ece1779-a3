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
    $('#review_table').DataTable({
        "ajax": {
            "url": "https://ynybvknfjg.execute-api.us-east-1.amazonaws.com/dev/get_barbershop_review",
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
                    return '<p>' + stars + '</p>'
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
                    return '<p>' + full.Text + '</p>'
                }
            },
        ],
        "pageLength": 8,
        "bLengthChange": false,
        "searching": false
    });
}



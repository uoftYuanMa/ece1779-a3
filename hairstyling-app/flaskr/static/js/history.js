$(document).ready(function() {
    $('#nav-home').removeClass('active');
    loadHistoryTable()
});

function loadHistoryTable() {
    $('#history_table').DataTable({
        "ajax": {
            "url": "https://ynybvknfjg.execute-api.us-east-1.amazonaws.com/dev/get_history",
            "data": "",
            "type": "POST",
            //"headers": {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            "crossDomain": true,
        },
        "columns": [
            {"data": 'Barbershop'},
            {"data": 'Time'},
            {"data": 'Barber'},
            {"data": 'Price'},
        ],
        "pageLength": 5
    });

}
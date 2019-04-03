$(document).ready(function() {
    $('#nav-explore').siblings().removeClass('active');
    $('#nav-explore').addClass('active');
});

var map;
function initMap() {
    console.log('wocao')
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
    console.log(map)
}
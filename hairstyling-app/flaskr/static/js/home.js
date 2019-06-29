$(document).ready(function() {
    $('#nav-home').siblings().removeClass('active');
    $('#nav-home').addClass('active');
});

var map, toronto, markers
function initMap() {
    toronto = new google.maps.LatLng(43.653908, -79.384293)
    map = new google.maps.Map(document.getElementById('map'), {
      center: toronto,
      zoom: 8
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
//      markers.forEach(function(marker) {
//        marker.setMap(null);
//      });
//      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
//        markers.push(new google.maps.Marker({
//          map: map,
//          icon: icon,
//          title: place.name,
//          position: place.geometry.location
//        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

    // load markers
    markers = loadMarkers()
    var infowindow = new google.maps.InfoWindow()
    var markersNum = markers.length;
    for (var i = 0; i < markersNum; i++) {
        //console.log(markers[i]);
        console.log(markers[i].title)
        var contentString = '<div><p class="text-monospace font-weight-bold">' + markers[i].title + '</p>'
                            +'<a class="btn btn-primary btn-sm" href="https://ynybvknfjg.execute-api.us-east-1.amazonaws.com/dev/barbershop?name=' + markers[i].name
                            + '" role="button">Reserve</a></div>'
        var hairMarker = new google.maps.Marker({
            position: {lat: parseInt(markers[i].lat) / 10000.0, lng: parseInt(markers[i].long) / 10000.0},
            map: map,
            //icon: 'static/img/cut-solid.svg'
        });
        bindInfoWindow(hairMarker, map, infowindow, contentString);
    }
}

function loadMarkers() {
    ret = null
    $.ajax({
        type: 'POST',
        url: 'https://ynybvknfjg.execute-api.us-east-1.amazonaws.com/dev/load_markers',
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        crossDomain: true,
        // url: 'load_markers',
        data: '',
        contentType: false,
        cache: false,
        processData: false,
        async: false,
        success: function(data) {
            ret = JSON.parse(data)
        }
    });
    return ret
}

function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function() {
        infowindow.setContent(html, this.getPosition());
        infowindow.open(map, this);
    });
}

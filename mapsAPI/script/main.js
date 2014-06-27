//screen é a tela toda
//var w = screen.width;
//var h = screen.height;
//screen 

var w = window.screen.width;
var h = window.screen.height;
var poly;
var geodesic;
var map;
var clickcount = 0;
var drawing = false;

window.onload = function() {
    var mapOptions = {
      center: new google.maps.LatLng(-23.9549937, -46.3446748),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"),
    mapOptions);

  var polyOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 3
    }
    poly = new google.maps.Polyline(polyOptions);
    poly.setMap(map);
    var geodesicOptions = {
        strokeColor: '#CC0099',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        geodesic: true
    }
    geodesic = new google.maps.Polyline(geodesicOptions);
    geodesic.setMap(map);

  // Add a listener for the click event
  google.maps.event.addListener(map, 'click', addLocation);

};

function addLocation(event) {

  clickcount++;
  if (clickcount == 1) {
    addOrigin(event);
  }
  if (clickcount > 2) {
    addDestination(event);
  }
}

function addOrigin(event) {
   // alert("add");
   drawing = true;
  clearPaths();
  var path = poly.getPath();
  path.push(event.latLng);
  var gPath = geodesic.getPath();
  gPath.push(event.latLng);
}

function addDestination(event) {
  var path = poly.getPath();
  path.push(event.latLng);
  var gPath = geodesic.getPath();
  gPath.push(event.latLng);
  adjustHeading();
  clickcount = 0;
}
  
function clearPaths() {
  var path = poly.getPath();
  while (path.getLength()) {
    path.pop();
  }
  var gPath = geodesic.getPath();
  while (gPath.getLength()) {
    gPath.pop();
  }
}

function adjustHeading() {
  var path = poly.getPath();
  var pathSize = path.getLength();
  var heading = google.maps.geometry.spherical.computeHeading(path.getAt(0), path.getAt(pathSize - 1));
  document.getElementById('heading').value = heading;
  document.getElementById('origin').value = path.getAt(0).lat()
      + "," + path.getAt(0).lng();
  document.getElementById('destination').value = path.getAt(pathSize - 1).lat()
      + "," + path.getAt(pathSize - 1).lng();
}

function zoomOUT(){
    console.log(stage.getScale().x);
    var scale = stage.getScale().x - 0.1;
    stage.setScale(scale);
    stage.draw();
}
function zoomIN(){
   console.log(stage.getScale().x);
   var scale = stage.getScale().x + 0.1;
   stage.setScale(scale);
   stage.draw();
}
/*
(function() {

var win = $(window);

win.resize(function() {
    
    var win_w = win.width(),
        win_h = win.height(),
        $bg    = $("#bg");

    // Load narrowest background image based on 
    // viewport width, but never load anything narrower 
    // that what's already loaded if anything.
    var available = [
      1024, 1280, 1366,
      1400, 1680, 1920,
      2560, 3840, 4860
    ];

    var current = $bg.attr('src').match(/([0-9]+)/) ? RegExp.$1 : null;
    
    if (!current || ((current < win_w) && (current < available[available.length - 1]))) {
      
      var chosen = available[available.length - 1];
      
      for (var i=0; i<available.length; i++) {
        if (available[i] >= win_w) {
          chosen = available[i];
          break;
        }
      }
      
      // Set the new image
      $bg.attr('src', '/img/bg/' + chosen + '.jpg');
      
      // for testing...
      // console.log('Chosen background: ' + chosen);
      
    }

    // Determine whether width or height should be 100%
    if ((win_w / win_h) < ($bg.width() / $bg.height())) {
      $bg.css({height: '100%', width: 'auto'});
    } else {
      $bg.css({width: '100%', height: 'auto'});
    }
    
  }).resize();
  
})(jQuery);
*/

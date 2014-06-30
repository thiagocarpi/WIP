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
    strokeColor: '#00ff00',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    clickable: false
    }
    poly = new google.maps.Polyline(polyOptions);
    poly.setMap(map);
    var geodesicOptions = {
        strokeColor: '#ff0000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        geodesic: true
    }
    geodesic = new google.maps.Polyline(geodesicOptions);
    geodesic.setMap(map);

  // Add a listener for the click event
  google.maps.event.addListener(map, 'mousedown', addLocation);
  google.maps.event.addListener(map, 'mousemove', moveLocation);
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
function moveLocation(event){
  var path = poly.getPath();
  var pathSize = path.getLength();
  var heading = google.maps.geometry.spherical.computeHeading(path.getAt(0), path.getAt(pathSize - 1));
  document.getElementById('heading').value = heading;
  document.getElementById('origin').value = path.getAt(0).lat()+ "," + path.getAt(0).lng();
  document.getElementById('destination').value = event.latLng.lat() + ', ' + event.latLng.lng();
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
  document.getElementById('origin').value = path.getAt(0).lat()+ "," + path.getAt(0).lng();
  document.getElementById('destination').value = path.getAt(pathSize - 1).lat()+ "," + path.getAt(pathSize - 1).lng();
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
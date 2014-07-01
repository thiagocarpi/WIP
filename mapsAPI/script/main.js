//screen é a tela toda
//var w = screen.width;
//var h = screen.height;
//screen 

var w = window.screen.width;
var h = window.screen.height;
var poly;
var line;
var geodesic;
var map;
var clickcount = 0;
var drawing = false;
var points = [];
var pos = [];
var data = [];



var area;




window.onload = function() {
  var mapOptions = {
    center: new google.maps.LatLng(-23.9549937, -46.3446748),
    zoom: 14,
    disableDefaultUI: true,
    maxZoom: 17,
    minZoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"),
    mapOptions);

 area = new Area( map );
  console.log(area.getInfo());
  /*drawAreas();

  var geodesicOptions = {
    strokeColor: '#ff0000',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    geodesic: true
  }
  geodesic = new google.maps.Polyline(geodesicOptions);
  geodesic.setMap(map);
*/
  // Add a listener for the click event
  google.maps.event.addListener(map, 'mousedown', addLocation);
  google.maps.event.addListener(map, 'mousemove', moveLocation);
};

function addLocation(event) {
  var x = event.latLng.lat();
  var y = event.latLng.lng();  

  
  area.addPoint(x,y);
  /*if(points.length > 0 && drawing){
    console.log("new point");
    addPoint(x, y, false);
  }else{
    console.log("first point");
    drawing = true;
    addPoint(x, y, true);
  }*/
}

function moveLocation(event){
  if(drawing){
    //var x = event.latLng.lat();
    //var y = event.latLng.lng(); 
    //var path = poly.getPath();
   // var pathSize = path.getLength();
    //newLatLng = new google.maps.LatLng(x,y);
    //path.setAt(pathSize - 1, newLatLng);
    //line.setMap(map);
    //console.log(path.getAt(pathSize - 1).lat());
  }
}

function hitStart(startX, startY, pX, pY, r){
  console.log ( Math.sqrt((pX-startX)*(pX-startX) + (pY-startY)*(pY-startY)) +  " | "+ r/100000 )
  return Math.sqrt((pX-startX)*(pX-startX) + (pY-startY)*(pY-startY)) > r/100 ;
}
function zoomOUT(){

}
function zoomIN(){

}

function drawAreas(){
  console.log("inicio");
  var json = $.getJSON("data.json", function(json){
    var tempArray = [];
    var length = 0;
    for(var k in json) if(json.hasOwnProperty(k)) length++;

    for (var i = 0; i < length; i++) {
      for (var j = 0; j < json[i].length; j++) {
        tempArray.push(new google.maps.LatLng(json[i][j].k, json[i][j].A));
      };
      var flightPath=new google.maps.Polygon({
        path:tempArray,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#0000FF",
        fillOpacity:0.4
      });
      flightPath.setMap(map);
      tempArray = [];
    };
  });
}
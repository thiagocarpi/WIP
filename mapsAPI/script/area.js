var id= "";
var color = "";
var strokeColor = "";
var points = [];

var editable = false;

var count = 0; 
var mapLocal;
var lineLocal;
var circles=[];


var listenerHandle


function Area (mapB) {
    id = "0";
    color = "red";
    strokeColor = "#ff0000";
    mapLocal = mapB;
}
Area.prototype.getInfo = function() {
    return color + ' ' + id + ' area';
};
Area.prototype.draw = function(){
	points.push(points[0]);
	console.log(circles);
	lineLocal = new google.maps.Polygon({
		path: points,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.35
	});
	var obj = {
		'id':0,
		'area':points
	};
	lineLocal.objInfo = obj;
	lineLocal.setMap(mapLocal);
	for (var i = 0; i < circles.length; i++) {
		circles[i].setOptions({fillOpacity: 0, clickable:false, strokeOpacity:0});
	}
	google.maps.event.removeListener(listenerHandle);
	google.maps.event.addListener(lineLocal, 'mousedown', function () {
		editable = true;
		edit();
	});
}
Area.prototype.addPoint = function(x, y){
	console.log(x+ " | "+ y);
    var populationOptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: mapLocal,
      center: new google.maps.LatLng(x,y),
      radius: 5,
      clickable: (count == 0) ? true : false
    };
    points.push(new google.maps.LatLng(x,y));
    cityCircle = new google.maps.Circle(populationOptions);
    circles.push(cityCircle);
    if(count==0){
      listenerHandle = google.maps.event.addListener(cityCircle, 'mousedown', this.draw);
    }
    count++;
}
function edit() {
	console.log("iniciando edição"+editable);
	if(editable){
		for (var i = 0; i < circles.length; i++) {
			circles[i].setOptions({fillOpacity: 0.5, clickable:true, strokeOpacity:0.5});
		}
	}
};
Area.prototype.id= "";
Area.prototype.color = "";
Area.prototype.strokeColor = "";
//var points;

Area.prototype.editable = false;
Area.prototype.creating = false;

Area.prototype.count = 0; 
Area.prototype.mapLocal;
Area.prototype.lineLocal;
Area.prototype.circles=[];


Area.prototype.listenerHandle


function Area (mapB, idB) {
    this.id = idB;
     this.points = new Array();
     this.circles=[];
    //this.lineLocal = google.maps.Polygon();
     this.color = "red";
     this.strokeColor = "#ff0000";
     this.mapLocal = mapB;
}
Area.prototype.getInfo = function() {
    return  this.color + ' ' +  this.id + ' area';
};
Area.prototype.Draw = draw;
function draw(){
	 this.creating = false;
	var points = new Array();
	for (var i = 0; i <  this.circles.length; i++) {
		var circ =  this.circles[i];
		points.push(circ.getCenter());
	};
	if(points[0].equals(points[points.length-1])){
		//console.log("igual");
		points.push(points[0]);
	}
	
	//console.log("points"+ circles);
	//console.log(circles);
	this.lineLocal = new google.maps.Polygon({
		path: points,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.35
	});
	var obj = {
		'id': this.id,
		'area':points
	};
	this.lineLocal.objInfo = obj;
	this.lineLocal.setMap( this.mapLocal);
	for (var i = 0; i <  this.circles.length; i++) {
		 this.circles[i].setOptions({fillOpacity: 0, clickable:false, strokeOpacity:0});
	}
	google.maps.event.removeListener( this.listenerHandle);
	google.maps.event.addListener(this.lineLocal, 'mousedown', function () {
		console.log( this.id);
		 this.editable = true;
		edit();
	});
}
Area.prototype.addPoint = function(x, y){
	//console.log("add Point" + x+ " | "+ y);
    var populationOptions = {
      strokeColor: ( this.count == 0) ? '#00FF00' : '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: ( this.count == 0) ? '#00FF00' : '#FF0000',
      fillOpacity: 0.35,
      map:  this.mapLocal,
      center: new google.maps.LatLng(x,y),
      radius: 5,
      clickable: ( this.count == 0) ? true : false,
      draggable: false
    };
    //points.push(new google.maps.LatLng(x,y));
    cityCircle = new google.maps.Circle(populationOptions);
     this.circles.push(cityCircle);
    if( this.count==0){
       this.listenerHandle = google.maps.event.addListener(cityCircle, 'mousedown',  this.draw);
    }
     this.creating = true;
     this.count++;
}
function edit() {
	//console.log("iniciando edição"+editable);
	if(editable){
		this.lineLocal.setMap(null);
		for (var i = 0; i < circles.length; i++) {
			//console.log(circles[i]);
			if(i==0){
				 this.circles[i].setOptions({clickable: true, fillColor: '#00FF00',fillOpacity: 1, clickable:true, strokeOpacity:0.5, draggable: true});
				var circ =  this.circles[i];
		       this.listenerHandle = google.maps.event.addListener(circ, 'mouseup',  this.draw);
		    }else{
				 this.circles[i].setOptions({fillOpacity: 0.5, clickable:true, strokeOpacity:0.5, draggable: true});
			}
		}
	}
};
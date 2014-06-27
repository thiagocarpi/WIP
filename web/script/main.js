//screen é a tela toda
//var w = screen.width;
//var h = screen.height;
//screen 

var w = window.screen.width;
var h = window.screen.height;
var points = [];
var drawing = false;
var ballRadius = 5;
var stage,mapLayer,line,rect;
window.onload = function() {
    alert(navigator.userAgent.toLowerCase());
    

    // init eventos/botoes
    initEvents();
    //init eventos/botoes
    stage = new Kinetic.Stage({
        container: "canvas-wrapper",
        width: w,
        height: h
    });
    mapLayer = new Kinetic.Layer({
        width: w,
        height: h
    });
    line;
    rect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: w,
        height: h,
        fill: '#00ff00',
        stroke: 'black',
        strokeWidth: 5,
        opacity: 0.1
    });
    var imageObj = new Image();
      imageObj.onload = function() {
        var bg = new Kinetic.Image({
          x: 0,
          y: 0,
          image: imageObj,
          width: w,
          height: h
        });
        mapLayer.add(bg);
         mapLayer.drawScene();
    };
    imageObj.src = 'http://192.168.1.10/WIP/DENGUE/web/images/map.png';
     //imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/yoda.jpg';

    mapLayer.on("mousedown", function (e) {
        drawing = true;
        
        var mousePos = stage.getPointerPosition();
        var x = mousePos.x;
        var y = mousePos.y;

        if(points.length >0 && hitStart(points[0][0], points[0][1], x, y)){
            console.log('start');
            line.getPoints()[1].x = points[0][0];
            line.getPoints()[1].y = points[0][1];
            drawing =false;
        }else{        
            points.push([x,y]);
            var circle = new Kinetic.Circle({
                x: x,
                y: y,
                radius: ballRadius,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4
            });

            line = new Kinetic.Line({
                id: 'line',
                points: [
                    points[points.length-1],
                    points[points.length-1]
                ],
                stroke: 'white',
                strokeWidth: 2,
                lineCap: 'round',
                lineJoin: 'round'
            });
            
            mapLayer.add(line);
            mapLayer.add(circle);
        }
        mapLayer.drawScene();
    });
    mapLayer.on("mousemove", function (e) {
        if(!drawing){
            return;
        }
        var mousePos = stage.getPointerPosition();
        var x = mousePos.x;
        var y = mousePos.y;
        line.getPoints()[1].x = mousePos.x;
        line.getPoints()[1].y = mousePos.y;
        
        mapLayer.drawScene();

    });

    function hitStart(startX, startY, pX, pY){
           return Math.sqrt((pX-startX)*(pX-startX) + (pY-startY)*(pY-startY)) < ballRadius;
    }

    mapLayer.add(rect);
    stage.add(mapLayer);
};

function initEvents(){
    
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

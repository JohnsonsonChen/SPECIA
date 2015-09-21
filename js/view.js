/***
 * Scaffolded by Jingjie (Vincent) Zheng on June 24, 2015.
 */

'use strict';

/**
 * A function that creates and returns the spaceship model.
 */

 var area = '';
 var hoverIn = '';
 var scaled = false;
 var trRotate = '';
 var trDegree = 0;
 var forward = false;
 var rl = false;
 var rr = false;
 var sRotate = 0;
 var newRotate = 0;
 var inHover = false;
 var handling = false;
 var bodying = false;
 var inHover = false;
 var powerUp = false;
 var clicked = false;
 var myInt;
 var lInt;
 var rInt;
 var intervalSet = false;
 var canPowerUp = false; 
 var leftInterval = false;
 var rightInterval = false;

function createViewModule() {
  var SpaceshipView = function(model, canvas) {
    /**
     * Obtain the SpaceshipView itself.
     */
    var self = this;

    /**
     * Maintain the model.
     */
    this.model = model;

    /**
     * Maintain the canvas and its context.
     */
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    /**
     * Update the canvas. 
     * You should be able to do this trivially by first clearing the canvas, then call the rootNode's 
     * renderAll() with the context.
     */
    this.update = function() {
      //TODO
      console.log("updating");
      this.model.rootNode.renderAll(this.context);
    };

    /**
     * You should add the view as a listener to each node in the scene graph, so that the view can get 
     * updated when the model is changed.
     */
    this.model.rootNode.addListener(this);
    this.model.headNode.addListener(this);
    //console.log(this.model.bodyNode);
    this.model.bodyNode.addListener(this);
    this.model.tailNode.addListener(this);
    this.model.handleNode.addListener(this);
    this.model.fireNode.addListener(this);
    
    //TODO
    

    /**
     * Handle mousedown events.
     * You should perform a hit detection here by calling the model's performHitDetection().
     */ 
    var originX = 0;
    var originY = 0;
    canvas.addEventListener('mousedown', function(e) {
      //TODO
      clicked = true;
      var point = {};
      point.x = e.offsetX;
      point.y = e.offsetY;

      console.log("point.x here: " + point.x + " point.y: " + point.y);
      
      originX = point.x;
      originY = point.y;

      inArea = model.performHitDetection(point); 
    });

    /**
     * Handle mousemove events.
     */ 
    var c = this.context;
    var inArea = false;
    canvas.addEventListener('mousemove', function(e) {
      //TODO
      var point = {};
      point.x = e.offsetX;
      point.y = e.offsetY;

      var x = e.offsetX;
      var y = e.offsetY;
      x = x - originX;
      y = y - originY;
      originX = e.offsetX;
      originY = e.offsetY;
      
      if (!inArea) {
        inHover = model.performHitDetection(point);
      }
      var can = document.getElementById("canvas");

      if(inArea && !powerUp && !forward) {
        if (area == 'body' && !handling) {
          console.log("bodyyyyyyyyyyyyyyyyyyyyy");  
          bodying = true;
          model.spaceshipNode.translate(x,y);
        }
        else if (area == 'handle' && !bodying){
          console.log("handleeeeeeeeeeeeeeeeeeeeee");
          handling = true;        
          scaled = true;
          model.spaceshipNode.scale(e.offsetX,e.offsetY);           
        }
        model.rootNode.renderAll(c);
      }

      if(inHover && !powerUp && !forward) {
        if (hoverIn == 'body') {
            can.className = "body";
        }
        else if (hoverIn == 'handle'){
            can.className = "handle";         
        }
      }
      else if (!inHover) {
          can.className = "normal";
      }

    });


    /**
     * Handle mouseup events.
     */ 
    canvas.addEventListener('mouseup', function(e) {
      //TODO
      inArea = false;
      bodying = false;
      handling = false;
      clicked = false;
      area = '';
    });

    /**
     * Handle keydown events.
     */ 
    document.addEventListener('keydown', function(e) {
      //TODO
      console.log("trDegree:                            " + trDegree);
      if (rl && rr) {
         console.log("left and right arrow");
         return;
      }
      if (-45 <= trDegree <= 45) {
        if(e.keyCode === 37) {//left
          trDegree += 5;
          rl = true;
        }
        else if (e.keyCode === 39) {//right
          trDegree -= 5;
          rr = true;
        }
        model.tailNode.rotate(trDegree,0,0);
      }
      if (e.keyCode === 38) {//up
        console.log("up!");
        forward = true;
        if (trDegree < -45) {
          trDegree = -45;
        }
        else if (trDegree > 45) {
          trDegree = 45;
        }
        if(trDegree !== 0) {
          newRotate = -trDegree * 0.1;
        }
        else if (trDegree === 0) {
          newRotate = 0;
        }
        sRotate += newRotate;
        console.log("sRotateeeeeeeee:     " + sRotate);
        var xmove = 5*Math.sin(sRotate * Math.PI/180);
        var ymove = -5*Math.cos(sRotate * Math.PI/180);
        if(canPowerUp && powerUp) {
           console.log("Double Speedddddddddddddddddd!");
           xmove *= 2;
           ymove *= 2;
        }
        console.log("xmove: " + xmove + " ymove: " + ymove);
        model.spaceshipNode.translate(xmove,ymove);
        model.spaceshipNode.rotate(sRotate,0,0);
        var nowX = model.spaceshipNode.localTransformation.getTranslateX();
        var nowY = model.spaceshipNode.localTransformation.getTranslateY();
        if (nowY <= -5) {
          model.spaceshipNode.translate(0,600);
        }
        else if(nowY >= 600) {
          model.spaceshipNode.translate(0,-600);
        }
        if (nowX <= -3) {
          model.spaceshipNode.translate(800,0);
        }
        else if (nowX >= 800) {
          model.spaceshipNode.translate(-800,0);
        }
      }


      //all interval
      if(forward && e.keyCode !== 38 && !intervalSet) {
        myInt = setInterval(function(){
          intervalSet = true;
          if (trDegree < -45) {
            trDegree = -45;
          }
          else if (trDegree > 45) {
            trDegree = 45;
          }
          if(trDegree !== 0) {
            newRotate = -trDegree * 0.1;
          }
          else if (trDegree === 0) {
            newRotate = 0;
          }
          sRotate += newRotate;
          console.log("sRotateeeeeeeee:     " + sRotate);
          var xmove = 5*Math.sin(sRotate * Math.PI/180);
          var ymove = -5*Math.cos(sRotate * Math.PI/180);
          if(canPowerUp && powerUp) {
            console.log("Double Speedddddddddddddddddd!");
            xmove *= 2;
            ymove *= 2;
          }
          console.log("xmove: " + xmove + " ymove: " + ymove);
          model.spaceshipNode.translate(xmove,ymove);
          model.spaceshipNode.rotate(sRotate,0,0);
          var nowX = model.spaceshipNode.localTransformation.getTranslateX();
          var nowY = model.spaceshipNode.localTransformation.getTranslateY();
          if (nowY <= -5) {
            model.spaceshipNode.translate(0,600);
          }
          else if(nowY >= 600) {
            model.spaceshipNode.translate(0,-600);
          }
          if (nowX <= -3) {
            model.spaceshipNode.translate(800,0);
          } 
          else if (nowX >= 800) {
            model.spaceshipNode.translate(-800,0);
          }
          model.rootNode.renderAll(c); 
        }, 70);
      }

      if(rl && e.keyCode !== 37 && !leftInterval) {
        lInt = setInterval(function() {
          leftInterval = true;
          if(rr) {return;}
          if (-45 <= trDegree <= 45) {
            trDegree += 5;
            rl = true;
          }
          model.tailNode.rotate(trDegree,0,0);
          model.rootNode.renderAll(c);
        }, 110)
      }

      if(rr && e.keyCode !== 39 && !rightInterval) {
        rInt = setInterval(function() {
          rightInterval = true;
          if(rl) {return;}
          if (-45 <= trDegree <= 45) {
            trDegree -= 5;
            rr = true;
          }
          model.tailNode.rotate(trDegree,0,0);
          model.rootNode.renderAll(c);
        }, 110)
      }      

      if (e.keyCode === 32 & !powerUp) {//space
          canPowerUp = false;
          powerUp = true;
      }
      model.rootNode.renderAll(c);
    });

    /**
     * Handle keyup events.
     */ 
    document.addEventListener('keyup', function(e) {
      //TODO
      console.log("keyup!!!!!!!!!!!!!!!!!!!!!!!");
      if (e.keyCode === 38) {
        forward = false;
        clearInterval(myInt);
        intervalSet = false;
      }
      if (e.keyCode === 37) {
        clearInterval(lInt);
        leftInterval = false;
        rl = false;
      }
      if (e.keyCode === 39) {
        clearInterval(rInt);
        rightInterval= false;
        rr = false;
      }
      if (trDegree < -45) {
        trDegree = -45;
      }
      else if (trDegree > 45) {
        trDegree = 45;
      }

      if(powerUp && e.keyCode === 32) {
        console.log("powerUppppppppppppppppppppppppppppppppppppp");
        model.spaceshipNode.scale(2,2);
        canPowerUp = true;
        setTimeout(function(){
            powerUp = false;
            canPowerUp = false;
            model.spaceshipNode.scale(1,1);
            model.rootNode.renderAll(c);
            console.log("hahahahahahahahahahahahahahahahahha");
            }, 
            5000);
      }

      model.rootNode.renderAll(c);
    });

    /**
     * Update the view when first created.
     */
    this.update();
  };

  return {
    SpaceshipView: SpaceshipView
  };
}
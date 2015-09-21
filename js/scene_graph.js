/***
 * Scaffolded by Jingjie (Vincent) Zheng on June 24, 2015.
 */

'use strict';

/**
 * A function that creates and returns the scene graph classes.
 * This module has an astract GraphNode which generalises the behaviour of a node in a scene graph.
 * Other classes inherit the GraphNode, forming a tree structure when instantiated.
 * - RootNode represents the background and the scene.
 * - SpaceshipNode represents the spaceship.
 * - BodyNode, HeadNode, and TailNode represent the three parts that belong to the spaceship.
 * - HandleNode refers to the black handle on the top of the body.
 * - FireNode belongs to the tail, representing the fire at the end of the spaceship.
 * These classes should be instantiated in model.js.
 */
 var tY = 0;
 var iY = 1;
 var sc = 1;
function createSceneGraphModule() {

    /**
     * An abstract graph node in a scene graph.
     * @param id: Node identifier.
     * @param parent: Parent of the node in the scene graph.
     */
    var GraphNode = function(id, parent) {
        // Maintain the identifier.
        this.id = id;

        // Maintain a local transformation that is relative to its parent.
        this.localTransformation = new AffineTransform();

        // Maintain a global transformation that is relative to the canvas coordinate.
        // This matrix is useful when performing a hit detection.
        this.globalTransformation = new AffineTransform();

        // If a valid parent is passed in, save the parent to this node, then add this node to the parent.
        this.parent = typeof parent !== 'undefined' ? parent : null;
        if (parent) {
            parent.addChild(this);
        }

        // Maintain a list of child nodes.
        this.children = [];

        // Local bounding box of this node. This should be overridden by concreate graph nodes.
        // The coordinate of the bounding box is from the perspective of the node itself, not 
        // from the canvas.
        this.localBoundingBox = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };

        // Indicate whether this node is interactable with a mouse. If it is not interactable with 
        // mouse at all, we do not need to perform a hit detection on it.
        this.isInteractableWithMouse = false;

        // Maintain a list of listners.
        this.listeners = [];
    };

    _.extend(GraphNode.prototype, {
        
        /**
         * Notify all listeners the change in this node.
         */
        notify: function() {
            //TODO
            _.each(this.listeners,
                function(listener) {
                  listener.update();
                }
                );
        },

        /**
         * Add a listener, if it is not registered with this node.
         * @param listener: Object that listens for the change of the node.
         */
        addListener: function(listener) {
            //TODO
            this.listeners.push(listener);
        },

        /**
         * Remove a listener, if it is registered with this node.
         * @param listener: Listener that is registered with this node. 
         */
        removeListener: function(listener) {
            //TODO
            var index = this.listeners.indexOf(listener_fn);
            if (index !== -1) {
             this.listeners.splice(index, 1);
            }
        },

        /**
         * Add a child node to this node if it is not appended to this node.
         * 
         * You should point the child's parent to this node and add the child to the children list.
         * You should also recursively update the global transformations of its descendants, as they are
         * appended to a new parent.
         * @param node: Child node to be added.
         */
        addChild: function(node) {
            //TODO
            var nodeID = node.id;
            this.children[nodeID] = node;
            node.parent= this;
        },

        /**
         * Remove a child node of this node, if it is appended to this node.
         * @param node: Child node to be removed.
         */
        removeChild: function(node) {
            //TODO
            var index = this.listeners.indexOf(node);
            if (index !== -1) {
             this.children.splice(index, 1);
            }
        },

        /**
         * Apply a Google Closure AffineTransform object to the HTML5 Canvas context.
         * @param context: HTML5 Canvas context.
         * @param transformation: Google Closure AffineTransform object.
         */
        applyTransformationToContext: function(context, transformation) {
            context.transform(transformation.m00_, 
                transformation.m10_,
                transformation.m01_,
                transformation.m11_,
                transformation.m02_,
                transformation.m12_);
        },

        /**
         * Update the global transformation of _ONLY_ this node.
         * Specifically, if it is the root of the scene graph, update itself with its local 
         * transformation, otherwise clone the global transformation of its parent, then concatenate it 
         * with this node's local transformation.
         */
        updateGlobalTransformation: function() {
            //TODO
        },

        /**
         * Update the global transformations of this node and its descendants recursively.
         */
        updateAllGlobalTransformation: function() {
            //TODO
        },

        /**
         * Render _ONLY_ this node with the assumption that the node is painted at around the origin. 
         * @param context: Context obtained from HTML5 Canvas.
         */
        renderLocal: function(context) {
            //TODO     
        },

        /**
         * Recursively render itself and its descendants.
         * 
         * Specifically, 
         * 1. Save Canvas context before performing any operation.
         * 2. Apply local transformation to the context.
         * 3. Render the node and its children, 
         * 4. Restore Canvas context.
         *
         * @param context: Context obtained from HTML Canvas.
         */
        renderAll: function(context) {
        },

        /**
         * Rotate this node and its descendants.
         * 
         * Specifically, 
         * 1. Concatenate a rotation matrix after the current local transformation. This would apply 
         *    the rotation prior to other transformation that has been applied to this node. It is 
         *    equivalent to using the inverse of the current local transformation to return this node 
         *    back to the origin, applying the rotation, and transforming this node back with the local
         *    transformation.
         * 2. Update the global transfomration. Applying change to this node would in fact change the 
         *    positions and orientations of all its descendants. Thus, you should update the global 
         *    transformation matrix of itself and all its descendants. This allows us to perform a O(1)
         *    hit detection without the need to concatenate local matrices along the hierarchy each
         *    time we perform the hit detection.
         * 3. Finally, notify the view to update. This would make the canvas to repaint the scene graph
         *    by traversing down the tree.
         *
         * You do not need to traverse down the tree to update every descendant's local transformation,
         * since the scene graph will render this node's children based on the transformation applied to
         * the node.
         *  
         * @param theta: Angle to rotate clockwise.
         * @param x, y: Centre of Rotation.
         */
        rotate: function(theta, x, y) {
            //TODO
        },

        /**
         * Translate this node and its descendants.
         * 
         * Specifically, 
         * 1. Concatenate a translation matrix after the current local transformation. 
         * 2. Update the global transfomration recursively to the node and its descendants.
         * 3. Finally, notify the view to update.
         * 
         * @param dx: Distance to translate in the x direction from the node's coordinate system.
         * @param dy: Distance to translate in the y direction from the node's coordinate system.
         */
        translate: function(dx, dy) {
            //TODO
        },

        /**
         * Scale this node and its descendants.
         * 
         * Specifically, 
         * 1. Concatenate a scaling matrix after the current local transformation. 
         * 2. Update the global transfomration recursively to the node and its descendants.
         * 3. Finally, notify the view to update.
         *
         * Note that doing this would propogate the scaling to its descendants when rendering.
         * You may also need another function to scale the shape by updating its rendering dimensions
         * as well as its bounding box.
         *
         * @param sx: Scaling factor in the x direction from the node's coordinate system.
         * @param sy: Scaling factor in the y direction from the node's coordinate system.
         */
        scale: function(sx, sy) {
            //TODO
        },



        /** 
          * Check whether a point is within the local bounding box.
          * Specifically, 
          * if this node is interactable with a mouse,
          * 1. Create the inverse matrix of the current global transformation.
          * 2. Transform the point with the matrix, so that the point becomes the coordinate relative
          *    to this node.
          * 3. Check with the transformed point whether it's in the local bounding box.
          * 
          * If it does not interact with a mouse, there is no need to perform a hit detection, 
          * you should return false.
          *
          * @param point: Point to be checked. It is a coordinate represented with list [x y].
          *               It is always the coordinate from the perspective of the canvas, i.e., 
          *               in the world view.
          * 
          * @return false if the node is not interactable with a mouse. When it is, return true if the 
          *         point is in the local bounding box, otherwise false.
          */
        performHitDetection: function(point) {
            //TODO
        }
    });


    /**
     * RootNode is the root of the scene graph, i.e., it represents the canvas.
     */
    var RootNode = function() {
        // Inherit the constructor of GraphNode.
        GraphNode.apply(this, arguments);

        // Override the local bounding box of this node.
        this.localBoundingBox = {
            x: 0,
            y: 0,
            w: 800,
            h: 600
        };
    }

    // Inherit all other methods of GraphNode.
    _.extend(RootNode.prototype, GraphNode.prototype, {
        // TODO
        renderAll: function(context) {
            console.log("rending all in rootnode");
            context.clearRect(0,0,800,600);
            context.save();
            //this.applyTransformationToContext(context,this.globalTransformation);
            this.renderLocal(context);
            //console.log(this.children);
            _.each(
                _.values(this.children),
                function(kids) {
                    kids.renderAll(context);
                }
            );
            context.restore(); 
        }
    });

    /**
     * SpaceshipNode, representing the whole spaceship.
     */
    var SpaceshipNode = function() {
        // Inherit the constructor of GraphNode.
        GraphNode.apply(this, arguments);

        // TODO
        this.translateAF = new AffineTransform();
        this.scaleAF = new AffineTransform();
        this.rotateAF = new AffineTransform();
        this.translateAF.translate(400,450);
        this.rotateAF.rotate(0,0,0);

        // Override the local bounding box of this node. You might want to modify this.
        this.localBoundingBox = {
            x: -50,
            y: -50,
            w: 100,
            h: 100
        };
    }

    // Inherit all other methods of GraphNode.
    _.extend(SpaceshipNode.prototype, GraphNode.prototype, {
        // Override the renderLocal function to draw itself in its own coordinate system.
        renderLocal: function(context) {

            // TODO
            //console.log("rendering SpaceshipNode locally");

            this.localTransformation = new AffineTransform();
            this.localTransformation.concatenate(this.translateAF);
            this.localTransformation.concatenate(this.rotateAF);
            this.localTransformation.concatenate(this.scaleAF);
            console.log("spaceshipNode localTransformation: " + this.localTransformation);
            this.applyTransformationToContext(context,this.localTransformation);
            
            //You might want to modify this.
            /*context.fillStyle = "rgb(200, 0, 0)";
            context.fillRect(-50, -50, 100, 100);*/
        },

        renderAll: function(context) {
            console.log("rending all in spaceshipnode");
            //context.clearRect(0,0,800,600);
            context.save();
            //this.applyTransformationToContext(context,this.globalTransformation);
            this.renderLocal(context);
            /*var sx = this.scaleAF.getScaleX();
            var sy = this.scaleAF.getScaleY();
            context.transform(sx,0,0,sy,0,0);*/
            //console.log(this.children);
            _.each(
                _.values(this.children),
                function(kids) {
                    kids.renderAll(context);
                }
            );
            context.restore(); 
        },

        translate: function(dx, dy) {
            console.log("translating spaceshipNode");
            var nowX = this.localTransformation.getTranslateX();
            var nowY = this.localTransformation.getTranslateY();
            nowX += dx;
            nowY += dy;
            //console.log("translateAF here: " + this.translateAF); 
            console.log("nowX: " + nowX + " nowY: " + nowY);
            this.translateAF.setToTranslation(nowX, nowY);
            this.notify();
            //console.log("translateAF is: " + this.translateAF);
        },

        scale: function(sx, sy) {
           console.log("scaling spaceshipNode");
           if(area == 'handle' && clicked) {
             var point = {x:sx, y:sy};
             //console.log("sx here is: " + sx + " sy here is: " + sy);
             var imatrix = this.globalTransformation.clone();
             //console.log("now imatrix is: " + imatrix);
             this.localTransformation = new AffineTransform();
             this.localTransformation.concatenate(this.translateAF);
             this.localTransformation.concatenate(this.rotateAF);
             console.log("now localTransformation is: " + this.localTransformation);
             imatrix.concatenate(this.localTransformation);
             imatrix = imatrix.createInverse();
             var x = point.x;
             var y = point.y;
             var array = [x,y];
             imatrix.transform(array,0, array, 0, 1);
             x = array[0];
             y = array[1];
             var scX = 1;
             var scY = Math.max(Math.min(-y/150, 2), 0.5);
             //console.log("X here is: " + x + " y here is: " + y);
             //this.scaleAF.setToScale(scX,scY);
             console.log("scY here is: " + scY);
             var newLength = -scY*150;
             this.children['head'].localTransformation.setToTranslation(0,newLength);
             this.children['body'].scaleAF.setToScale(1,scY);
             var test = this.children['head'].globalTransformation.get
             iY = scY;
             sc = newLength;
             tY = 10;
           }
           if(powerUp) {
              console.log("powerUpppppppingggggggggggggggg!");
              this.scaleAF.setToScale(2,2);
           }
           else if (!powerUp) {
              this.scaleAF.setToScale(1,1);
           }
        },

        rotate: function(theta, x, y) {
            this.rotateAF.setToRotation(theta * Math.PI / 180,x,y);
        },

        performHitDetection: function(point) {
            console.log("performing hit detection in spaceshipNode");
            var imatrix = this.globalTransformation.clone();
            //console.log("now imatrix is: " + imatrix);
            this.localTransformation = new AffineTransform();
            this.localTransformation.concatenate(this.translateAF);
            this.localTransformation.concatenate(this.rotateAF);
            //console.log("now localTransformation is: " + this.localTransformation);
            imatrix.concatenate(this.localTransformation);
            imatrix = imatrix.createInverse();
            var x = point.x;
            var y = point.y;
            var array = [x,y];
            imatrix.transform(array,0, array, 0, 1);
            x = array[0];
            y = array[1];
            console.log("x is: " + x + " and y is: " + y);
            var hTop = 0;
            var bTop = 0;
            if(!scaled) {
                bTop = -150;
                hTop = -160;
            }
            else {
                hTop = sc;
                bTop = hTop + 10;
            }
            console.log("bTop is: " + bTop + " and hTop is: " + hTop);
            if (x > -26 && x < 26) {
              if (y >= bTop  && y < 1) {
                area = 'body';
                hoverIn = 'body';
                return true;
              }
              else if (y >= hTop && y <= bTop) {
                area = 'handle';
                hoverIn = 'handle';
                return true;
              }
            }
            return false;
        }
    });



    /**
     * HeadNode is the child of the spaceship node, representing the head of the spaceship.
     */
    var HeadNode = function() {
        // Inherit the constructor of GraphNode.
        GraphNode.apply(this, arguments);

        // TODO
        this.translateAF = new AffineTransform();
        this.scaleAF = new AffineTransform();
        this.rotateAF = new AffineTransform();
        this.localTransformation.translate(0,-160);
        //this.translateAF.translate(0,-160);
        this.rotateAF.rotate(0,0,0);


        // Override the local bounding box of this node, you might want to modify this.
        this.localBoundingBox = {
            x: -30,
            y: -30,
            w: 60,
            h: 60
        };

    }

    // Inherit all other methods of GraphNode.
    _.extend(HeadNode.prototype, GraphNode.prototype, {
        // Override the renderLocal function to draw itself in its own coordinate system.
        renderLocal: function(context) {

            // TODO 
            //console.log("rendering HeadNode locally");          
            //this.localTransformation = new AffineTransform();
            this.localTransformation.concatenate(this.translateAF);
            this.localTransformation.concatenate(this.rotateAF);
            this.applyTransformationToContext(context,this.localTransformation);
            //this.localTransformation.translate(0,-160);
            console.log("HeadNode localTransformation: " + this.localTransformation);
            //this.localTransformation.concatenate(this.translateAF);
            //this.applyTransformationToContext(context,this.localTransformation);

            context.fillStyle = "#FF6666";
            context.beginPath();
            context.moveTo(0,-50);
            context.lineTo(-25,0);
            context.lineTo(25,0);
            context.closePath();
            context.fill();
        },

        renderAll: function(context) {
            console.log("rending all in headNode");
            context.save();
            this.applyTransformationToContext(context,this.globalTransformation);
            this.renderLocal(context);
            console.log(this.children);
            _.each(
                _.values(this.children),
                function(kids) {
                    kids.renderAll(context);
                }
            );
            context.restore(); 
        },

        performHitDetection: function() {
            return false;
        }
    });




    /**
     * TailNode is a child of the spaceship node, representing the tail of the spaceship.
     */
    var TailNode = function() {
        GraphNode.apply(this, arguments);
        this.translateAF = new AffineTransform();
        this.scaleAF = new AffineTransform();
        this.rotateAF = new AffineTransform();
        //this.localTransformation.translate(400,450);
        //this.translateAF.translate(400,450);
        this.rotateAF.rotate(0,0,0);
    }
    _.extend(TailNode.prototype, GraphNode.prototype, {
        renderLocal: function(context) {

            // TODO 
            //console.log("rendering TailNode locally");

            this.localTransformation.concatenate(this.translateAF);
            this.localTransformation.concatenate(this.rotateAF);
            this.applyTransformationToContext(context,this.localTransformation);
            //console.log("tailNode localTransformation: " + this.localTransformation);          

            context.fillStyle = "#FCEC83";
            context.beginPath();
            context.moveTo(0,0);
            context.lineTo(-35,50);
            context.lineTo(35,50);
            context.closePath();
            context.fill();
        },

        renderAll: function(context) {
            console.log("rending all in tailNode");
            context.save();
            this.applyTransformationToContext(context,this.globalTransformation);
            this.renderLocal(context);
            //console.log(this.children);
            _.each(
                _.values(this.children),
                function(kids) {
                    kids.renderAll(context);
                }
            );
            context.restore(); 
        },

        performHitDetection: function(point) {
            return false;
        },

        rotate: function(theta, x, y) {
            this.localTransformation.setToRotation(Math.min(Math.max(theta * Math.PI / 180, 
                                                                     - Math.PI / 4), Math.PI / 4),x,y);
        }
    });



    /**
     * FireNode is a child of the tail node, representing the fire at the end of the spaceship.
     */
    var FireNode = function() {
        GraphNode.apply(this, arguments);
        this.translateAF = new AffineTransform();
        this.localTransformation.translate(0,60);
    }
    _.extend(FireNode.prototype, GraphNode.prototype, {
        renderLocal: function(context) {
            //TODO
            this.applyTransformationToContext(context,this.localTransformation);
            console.log("fireNode localTransformation: " + this.localTransformation);

            if(forward) {
              context.fillStyle = "brown";
              context.fillRect(-35,0,16,60);
              context.fillRect(-8,0,16,60);
              context.fillRect(19,0,16,60); 
            }    
        },

        renderAll: function(context) {
            console.log("rending all in fireNode");
            context.save();
            this.applyTransformationToContext(context,this.globalTransformation);
            this.renderLocal(context);
            context.restore();
        },

        performHitDetection: function() {
          return false;   
        }
    });



    /**
     * BodyNode is a child of the spaceship node, representing the body of the spaceship.
     */ 
    var BodyNode = function() {
        GraphNode.apply(this, arguments);
        this.translateAF = new AffineTransform();
        this.scaleAF = new AffineTransform();
        this.rotateAF = new AffineTransform();
        this.localTransformation.translate(0,0);
    }
    _.extend(BodyNode.prototype, GraphNode.prototype, {
        renderLocal: function(context) {

            // TODO 
            console.log("rendering BodyNode locally");          
            //this.localTransformation = new AffineTransform();
            this.localTransformation.concatenate(this.translateAF);
            this.localTransformation.concatenate(this.rotateAF);
            this.applyTransformationToContext(context,this.localTransformation);
            
            var sx = this.scaleAF.getScaleX();
            var sy = this.scaleAF.getScaleY();
            context.transform(sx,0,0,sy,0,0);

            console.log("bodyNode localTransformation: " + this.localTransformation);

            context.fillStyle = "#E6E6E6";
            context.fillRect(-25,-150,50,150);

        },

        renderAll: function(context) {
            console.log("rending all in bodyNode");
            context.save();
            this.applyTransformationToContext(context,this.globalTransformation);
            this.renderLocal(context);
            /*var sx = this.scaleAF.getScaleX();
            var sy = this.scaleAF.getScaleY();
            context.transform(sx,0,0,sy,0,0);*/
            //console.log(this.children);
            _.each(
                _.values(this.children),
                function(kids) {
                    kids.renderAll(context);
                }
            );
            context.restore(); 
        },

        /*scale: function(sx, sy) {
           console.log("scaling bodyNode");
           if(area == 'handle') {
             var point = {x:sx, y:sy};
             console.log("sx here is: " + sx + " sy here is: " + sy);
             var imatrix = this.globalTransformation.clone();
             console.log("now imatrix is: " + imatrix);
             this.localTransformation = new AffineTransform();
             this.localTransformation.concatenate(this.translateAF);
             this.localTransformation.concatenate(this.rotateAF);
             console.log("now localTransformation is: " + this.localTransformation);
             imatrix.concatenate(this.localTransformation);
             imatrix = imatrix.createInverse();
             var x = point.x;
             var y = point.y;
             var array = [x,y];
             imatrix.transform(array,0, array, 0, 1);
             x = array[0];
             y = array[1];
             var scX = this.scaleAF.getScaleX();
             var scY = Math.max(Math.min(-y/50, 2), 0.5);
             console.log("X here is: " + x + " y here is: " + y);
             this.scaleAF.setToScale(scX,scY);
           }
        },*/

        performHitDetection: function(point) {
            /*console.log("performing hit detection in body");
            var imatrix = this.globalTransformation.clone();
            console.log("now imatrix is: " + imatrix);
            this.localTransformation = new AffineTransform();
            this.localTransformation.concatenate(this.translateAF);
            this.localTransformation.concatenate(this.rotateAF);
            console.log("now localTransformation is: " + this.localTransformation);
            imatrix.concatenate(this.localTransformation);
            imatrix = imatrix.createInverse();
            var x = point.x;
            var y = point.y;
            var array = [x,y];
            imatrix.transform(array,0, array, 0, 1);
            x = array[0];
            y = array[1];
            console.log("x is: " + x + " and y is: " + y);*/
            /*if (x > -26 && x < 26 && y > -151 && y < 1) {
              //this.translate(x,y);
              return true;
            }
            return false;*/
        }
    });



    /**
     * HandleNode is a child of the body node, representing the resizing handle of the spaceship.
     */ 
    var HandleNode = function() {
        GraphNode.apply(this, arguments);
        this.translateAF = new AffineTransform();
        this.scaleAF = new AffineTransform();
        this.rotateAF = new AffineTransform();
        this.localTransformation.translate(0,-160);
        //this.translateAF.translate(0,-170);
        this.scaleAF.scale(1,1);
        this.rotateAF.rotate(0,0,0);
    }
    _.extend(HandleNode.prototype, GraphNode.prototype, {
        renderLocal: function(context) {

            // TODO 
            //console.log("rendering HandleNode locally");          
            //this.localTransformation = new AffineTransform();
            //this.localTransformation.concatenate(this.translateAF);
            this.localTransformation.concatenate(this.scaleAF);
            //console.log(this.localTransformation);
            //this.localTransformation.translate(0,-170);
            this.applyTransformationToContext(context,this.localTransformation);
            console.log("handleNode localTransformation: " + this.localTransformation);

            context.transform(1,0,0,1/iY,0,tY);

            context.fillStyle = "#8C8080";
            context.fillRect(-25,0,50,10);
        },

        renderAll: function(context) {
            console.log("rending all in HandleNode");
            context.save();
            this.applyTransformationToContext(context,this.globalTransformation);
            //console.log("handle gt: " + this.globalTransformation);
            this.renderLocal(context);
            //console.log(this.children);
            context.restore(); 
        }
    });


    // Return an object containing all of our classes and constants
    return {
        RootNode: RootNode,
        SpaceshipNode: SpaceshipNode,
        HeadNode: HeadNode,
        TailNode: TailNode,
        FireNode: FireNode,
        BodyNode: BodyNode,
        HandleNode: HandleNode,
    };
}
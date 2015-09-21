/***
 * Scaffolded by Jingjie (Vincent) Zheng on June 24, 2015.
 */

'use strict';

/**
 * A function that creates and returns the spaceship model.
 */

function createModelModule() {
  var SpaceshipModel = function() {

    var sceneGraphModule = createSceneGraphModule();

    /*
     * Maintain a list of nodes for iteration when performing hit detection.
     */
    this.nodes = [];

    /**
     * Instantiate the scene graph here.
     */
    this.rootNode = new sceneGraphModule.RootNode('scene');

    this.spaceshipNode = new sceneGraphModule.SpaceshipNode('spaceship', this.rootNode);
    //this.spaceshipNode.translate(400, 300);

    this.headNode = new sceneGraphModule.HeadNode('head', this.spaceshipNode);
    //this.headNode.translate(0, -80);

    //TODO
    this.bodyNode = new sceneGraphModule.BodyNode('body', this.spaceshipNode);
    this.tailNode = new sceneGraphModule.TailNode('tail', this.spaceshipNode);
    this.handleNode = new sceneGraphModule.HandleNode('handle', this.bodyNode);
    this.fireNode = new sceneGraphModule.FireNode('fire', this.tailNode);



    /**
     * Push every node into the the nodes list.
     */
    this.nodes.push(this.headNode);
    this.nodes.push(this.spaceshipNode);
    this.nodes.push(this.rootNode);
    
    //TODO
    this.nodes.push(this.bodyNode);
    this.nodes.push(this.tailNode);
    this.nodes.push(this.handleNode);
    this.nodes.push(this.fireNode);
  };

  _.extend(SpaceshipModel.prototype, {
    /**
      * Perform hit detection and return the hit node.
      * @param point: Point in the world view, i.e., from the perspective of the canvas.
      * @return 
      *   null if no node is hit, otherwise return the hit node.
      */
    performHitDetection: function(point) {
      //console.log(this.nodes);
      var result = _.find(this.nodes, function(node) {
        if (node.performHitDetection(point)) {
          return node;
        }
      });
      //console.log(result);
      if (result) {
        return result;
      } 
      return null;
    }
  });

  return {
    SpaceshipModel: SpaceshipModel
  };
}
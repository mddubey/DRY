var game = {};

// var shapes = require('./shapes.json');

// console.log(shapes);

game.Point = function(x,y){
	this.x = x;
	this.y = y;
};

game.Node = function(x,y){
	this.point = new game.Point(x,y);
	this.edges = [];
};

game.Line = function (startNode, endNode) {
	this.startNode = startNode;
	this.endNode = endNode;
	this.color = rgb(0,0,0);
};

game.drawShape = function(container,lines){

};

// exports.game = game;
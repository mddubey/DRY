var Game = function(){

};

Game.prototype.Node = function(x, y, id) {
	this.x = x;
	this.y = y;
	this.id = 'node' + id;
	this.edges = [];
	this.isEqualTo = function(node){
		return this.x === node.x && this.y === node.y;
	}
	this.addEdge = function(edge){
		this.edges.push(edge);
	}
};

Game.prototype.Edge = function(startNode, endNode, id) {
	this.startNode = startNode;
	this.endNode = endNode;
	this.id = 'edge' + id;
	this.visited = false;
	this.isEqualTo = function(edge){
		return this.startNode.isEqualTo(edge.startNode) && this.endNode.isEqualTo(edge.endNode);
	}
};

Game.prototype.createShape = function(shapeData){
	var shape = {};
	shape.height = shapeData.height;
	shape.width = shapeData.width;
	var game = this;
	shape.nodes = shapeData.nodesData.map(function(nodeData,index){
		return new game.Node(nodeData[0],nodeData[1],index);
	});
	shape.edges = shapeData.edgesData.map(function(edgeData,index) {
		var start = shape.nodes.filter(function(node){
			return node.isEqualTo({x:edgeData[0],y:edgeData[1]});
		})[0];
		var end = shape.nodes.filter(function(node){
			return node.isEqualTo({x:edgeData[2],y:edgeData[3]});
		})[0];
		var edge = new game.Edge(start, end, index);
		start.addEdge(edge);
		end.addEdge(edge);
		return edge;
	});
	return shape;
}

Game.prototype.startGame = function(controller) {
	var shapeData = {
		"height": 400,
		"width": 400,
		"nodesData": [
			[20, 20],
			[320, 20],
			[20, 320],
			[320, 320]
		],
		"edgesData": [
			[20, 20, 320, 20],
			[20, 320, 320, 320],
			[20, 20, 20, 320],
			[320, 20, 320, 320]
		]
	};
	this.controller = controller;
	this.shape = this.createShape(shapeData);
	this.controller.onShapeReady(this.shape);
};

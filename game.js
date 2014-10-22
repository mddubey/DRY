var game = {
	controller: '',
	shape:''
};

game.Node = function(x, y, id) {
	this.x = x;
	this.y = y;
	this.id = 'node' + id;
	this.edges = [];
	this.isEqualTo = function(node){
		return this.x === node.x && this.y === node.y;
	}
};

game.Edge = function(startNode, endNode, id) {
	this.startNode = startNode;
	this.endNode = endNode;
	this.id = 'edge' + id;
	this.visited = false;
	this.isEqualTo = function(edge){
		return this.startNode.isEqualTo(edge.startNode.isEqualTo) && this.endNode.isEqualTo(edge.endNode.isEqualTo);
	}
};

game.createShape = function(shapeData){
	var shape = {};
	shape.height = shapeData.height;
	shape.width = shapeData.width;
	shape.nodes = shapeData.nodesData.map(function(nodeData,index){
		return new game.Node(nodeData[0],nodeData[1],index);
	});
	shape.edges = shapeData.edgesData.map(function(edgeData,index) {
		var start = new game.Node(edgeData[0], edgeData[1]);
		var end = new game.Node(edgeData[2], edgeData[3]);
		return new game.Edge(start, end, index);
	});
	return shape;
}

game.startGame = function(controller) {
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
	game.controller = controller;
	game.shape = game.createShape(shapeData);
	game.controller.onGameStart(game.shape);
};

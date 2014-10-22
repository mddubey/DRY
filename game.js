var game = {
	controller: '',
	shape:''
};

game.Node = function(x, y) {
	this.x = x;
	this.y = y;
	this.edges = [];
};

game.Edge = function(startNode, endNode) {
	this.startNode = startNode;
	this.endNode = endNode;
	this.visited = false;
};

game.createShape = function(shapeData){
	var shape = {};
	shape.height = shapeData.height;
	shape.width = shapeData.width;
	shape.nodes = shapeData.nodesData.map(function(nodeData){
		return new game.Node(nodeData[0],nodeData[1]);
	});
	shape.edges = shapeData.edgesData.map(function(edgeData) {
		var start = new game.Node(edgeData[0], edgeData[1]);
		var end = new game.Node(edgeData[2], edgeData[3]);
		return new game.Edge(start, end);
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

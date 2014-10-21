var game = {
	observer: ''
};

game.Point = function(x, y) {
	this.x = x;
	this.y = y;
};

game.Node = function(x, y) {
	this.point = new game.Point(x, y);
	this.edges = [];
};

game.Line = function(startNode, endNode) {
	this.startNode = startNode;
	this.endNode = endNode;
	this.visited = false;
};

game.drawShape = function(container, lines) {

};

game.startGame = function(observer) {
	var shapeData = {
		"height": 400,
		"width": 400,
		"nodesData": [
			[20, 20],
			[320, 20],
			[20, 320],
			[320, 320]
		],
		"linesData": [
			[20, 20, 320, 20],
			[20, 320, 320, 320],
			[20, 20, 20, 320],
			[320, 20, 320, 320]
		]
	};
	game.observer = observer;
	var shape = {};
	shape.height = shapeData.height;
	shape.width = shapeData.width;
	shape.nodes = shapeData.nodesData.map(function(nodeData){
		return new game.Node(nodeData[0],nodeData[1]);
	});
	shape.lines = shapeData.linesData.map(function(lineData) {
		var start = new game.Node(lineData[0], lineData[1]);
		var end = new game.Node(lineData[2], lineData[3]);
		return new game.Line(start, end);
	});
	game.observer.onGameStart(shape);
};

// exports.game = game;
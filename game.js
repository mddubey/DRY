var Game = function() {

};

Game.prototype.Node = function(x, y, id) {
	this.x = x;
	this.y = y;
	this.id = 'node' + id;
	this.edges = [];
	this.isEqualTo = function(node) {
		return this.x === node.x && this.y === node.y;
	};
	this.addEdge = function(edge) {
		this.edges.push(edge);
	};
	this.isEdgeAdjacent = function(edge){
		return this.edges.some(function(edge1){
			return edge.id === edge1.id;
		});
	}
};

Game.prototype.Edge = function(startNode, endNode, id) {
	this.startNode = startNode;
	this.endNode = endNode;
	this.id = 'edge' + id;
	this.visited = false;
	this.isEqualTo = function(edge) {
		return this.startNode.isEqualTo(edge.startNode) && this.endNode.isEqualTo(edge.endNode);
	};
	this.getOtherNode = function(node) {
		if (node.isEqualTo(this.startNode))
			return this.endNode;
		return this.startNode;
	}
};

Game.prototype.Shape = function(shapeData) {
	this.height = shapeData.height;
	this.width = shapeData.width;
	var game = Game.prototype;
	this.nodes = shapeData.nodesData.map(function(nodeData, index) {
		return new game.Node(nodeData[0], nodeData[1], index);
	});
	var shape = this;
	this.edges = shapeData.edgesData.map(function(edgeData, index) {
		var start = shape.nodes.filter(function(node) {
			return node.isEqualTo({
				x: edgeData[0],
				y: edgeData[1]
			});
		})[0];
		var end = shape.nodes.filter(function(node) {
			return node.isEqualTo({
				x: edgeData[2],
				y: edgeData[3]
			});
		})[0];
		var edge = new game.Edge(start, end, index);
		start.addEdge(edge);
		end.addEdge(edge);
		return edge;
	});
	this.getEdgeById = function(edgeID) {
		return this.edges.filter(function(edge) {
			return edge.id === edgeID;
		})[0];
	};

	this.isLevelComplete = function() {
		return this.edges.every(function (edge) {
			return edge.visited;
		});
	};

	this.getNodeById = function(nodeIdToFind) {
		return shape.nodes.filter(function(node) {
			return node.id == nodeIdToFind;
		})[0];
	}
};

Game.prototype.selectNode = function(nodeId) {
	if (!this.currentNode) {
		this.currentNode = this.shape.getNodeById(nodeId);
		this.controller.onNodeSelected(nodeId);
		return;
	}
	this.controller.onStartNodeAlreadySelected(nodeId);
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
	this.level = 1;
	this.noOfLevels = 1;
	this.controller = controller;
	this.shapesData = [shapeData];
	this.shape = new Game.prototype.Shape(this.shapesData[0]);
	this.controller.onShapeReady(this.shape);
};


Game.prototype.visitEdge = function(edgeID) {
	var edge = this.shape.getEdgeById(edgeID);
	if(!this.currentNode){
		this.controller.onStartNodeNotSelected();
		return;
	}
	if(edge.visited){
		this.controller.onEdgeRevisit();
		return;
	}
	if(!this.currentNode.isEdgeAdjacent(edge)){
		this.controller.onNonAdjacentVisit();
		return;
	}
	edge.visited = true;
	this.controller.onEdgeVisited(edgeID);
	this.currentNode = edge.getOtherNode(this.currentNode);
	this.controller.onNodeSelected(this.currentNode.id);
	if(this.shape.isLevelComplete()){
		this.controller.onLevelComplete();
	}
};
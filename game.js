var Node = function(x, y, id) {
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
	this.isEdgeAdjacent = function(edge) {
		return this.edges.some(function(edge1) {
			return edge.id === edge1.id;
		});
	}
};

var Edge = function(startNode, endNode, id) {
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

var createShape = function(shapeData) {
	var shape = {};
	shape.height = shapeData.height;
	shape.width = shapeData.width;
	shape.noOfEdgeVisited = 0;
	shape.nodes = shapeData.nodesData.map(function(nodeData, index) {
		return new Node(nodeData[0], nodeData[1], index);
	});
	shape.edges = shapeData.edgesData.map(function(edgeData, index) {
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
		var edge = new Edge(start, end, index);
		start.addEdge(edge);
		end.addEdge(edge);
		return edge;
	});
	return shape;
};

var Game = function(controller, shapesData, noOfLevels) {
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
	this.noOfLevels = noOfLevels || 1;
	this.controller = controller;
	this.shapesData = shapesData || [shapeData];
	this.shape = createShape(this.shapesData[0]);
};

Game.prototype.getEdgeById = function(edgeID) {
	return this.shape.edges.filter(function(edge) {
		return edge.id === edgeID;
	})[0];
};

Game.prototype.isLevelComplete = function() {
	return this.shape.noOfEdgeVisited === this.shape.edges.length;
};

Game.prototype.getNodeById = function(nodeIdToFind) {
	return this.shape.nodes.filter(function(node) {
		return node.id === nodeIdToFind;
	})[0];
}

Game.prototype.visit = function(visitor) {
	this.shape.edges.forEach(visitor.renderEdge);
	this.shape.nodes.forEach(visitor.renderNode);
};



Game.prototype.selectNode = function(nodeId) {
	if (!this.currentNode) {
		this.currentNode = this.getNodeById(nodeId);
		this.controller.onNodeSelected(nodeId);
		return;
	}
	this.controller.onStartNodeAlreadySelected(nodeId);
};

Game.prototype.visitEdge = function(edgeID) {
	var edge = this.getEdgeById(edgeID);
	if (!this.currentNode) {
		this.controller.onStartNodeNotSelected();
		return;
	}
	if (edge.visited) {
		this.controller.onEdgeRevisit();
		return;
	}
	if (!this.currentNode.isEdgeAdjacent(edge)) {
		this.controller.onNonAdjacentVisit();
		return;
	}
	edge.visited = true;
	this.shape.noOfEdgeVisited++;
	this.controller.onEdgeVisited(edgeID);
	this.currentNode = edge.getOtherNode(this.currentNode);
	this.controller.onNodeSelected(this.currentNode.id);

	if (this.isLevelComplete()) {
		if (this.level === this.noOfLevels) {
			this.controller.onGameFinished();
			return;
		}
		this.controller.onLevelComplete();
	}
};

Game.prototype.restartLevel = function() {
	this.shape = createShape(this.shapesData[this.level - 1]);
	this.currentNode = '';
	this.controller.onLevelRestart(this.shape);
};
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
	this.areAllEdgesVisited = function(){
		return this.edges.every(function(edge){
			return edge.visited;
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

var createShape = function(game) {
	var shapeData = game.shapesData[game.level - 1];
	game.noOfEdgeVisited = 0;
	game.nodes = shapeData.nodesData.map(function(nodeData, index) {
		return new Node(nodeData[0], nodeData[1], index);
	});
	game.edges = shapeData.edgesData.map(function(edgeData, index) {
		var start = game.nodes.filter(function(node) {
			return node.isEqualTo({
				x: edgeData[0],
				y: edgeData[1]
			});
		})[0];
		var end = game.nodes.filter(function(node) {
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
};

var Game = function(shapesData) {
	// var shapesData = [];
	this.level = 1;
	this.shapesData = shapesData || x; // || [shapeData1, shapeData2, shapeData3];
	this.noOfLevels = this.shapesData.length;
	createShape(this);
};

Game.prototype.getEdgeById = function(edgeID) {
	return this.edges.filter(function(edge) {
		return edge.id === edgeID;
	})[0];
};

Game.prototype.isLevelComplete = function() {
	return this.noOfEdgeVisited === this.edges.length;
};

Game.prototype.getNodeById = function(nodeIdToFind) {
	return this.nodes.filter(function(node) {
		return node.id === nodeIdToFind;
	})[0];
}

Game.prototype.visit = function(visitor) {
	this.edges.forEach(visitor.renderEdge);
	this.nodes.forEach(visitor.renderNode);
};

Game.prototype.selectNode = function(nodeId) {
	if (!this.currentNode) {
		this.currentNode = this.getNodeById(nodeId);
		return {
			statusCode: 301
		};
	}
	return {
		statusCode: 401
	};
};

Game.prototype.visitEdge = function(edgeID) {
	var edge = this.getEdgeById(edgeID);
	if (!this.currentNode) {
		return {
			statusCode: 402 
		}; //current node is not selected;
	}
	if (edge.visited) {
		return {
			statusCode: 403
		}; // edge is being revisited
	}
	if (!this.currentNode.isEdgeAdjacent(edge)) {
		return {
			statusCode: 404
		}; // non-adjacent node visit
	}
	edge.visited = true;
	this.noOfEdgeVisited++;
	this.currentNode = edge.getOtherNode(this.currentNode);

	if (this.isLevelComplete()) {
		if (this.level === this.noOfLevels) {
			return {
				statusCode: 304
			}; //game finished
		}
		return {
			statusCode: 303,
			nodeId: this.currentNode.id
		}; //level finished
	}

	if(this.currentNode.areAllEdgesVisited()){
		return {
			statusCode : 405,
			nodeId:this.currentNode.id
		}; //no possible moves
	}

	return {
		statusCode: 302,
		nodeId: this.currentNode.id
	};
};

Game.prototype.restartLevel = function() {
	createShape(this);
	this.currentNode = undefined;
};

Game.prototype.swicthToNextLevel = function() {
	this.level++;
	this.currentNode = undefined;
	createShape(this);
};
var assert = chai.assert;

describe('Node', function() {
	var game = new Game();
	describe('isEqualTo', function() {
		it('should tell other node is equal to itself.', function() {
			var node = new game.Node(2, 3);
			var otherNode = new game.Node(2, 3);
			assert.isTrue(node.isEqualTo(otherNode));
		});
		it('should tell other node is not equal if x_axis or y_axis is different.', function() {
			var firstNode = new game.Node(2, 3);
			var secondNode = new game.Node(2, 2);
			var thirdNode = new game.Node(3, 3);
			assert.isFalse(firstNode.isEqualTo(secondNode));
			assert.isFalse(firstNode.isEqualTo(thirdNode));
		});
	});
	describe('addEdge', function() {
		it('should add given edge in it\'s edges.', function() {
			var node = new game.Node(2, 3);
			var otherNode = new game.Node(3, 3);
			var edge = new game.Edge(node, otherNode);
			assert.equal(node.edges.length, 0);
			node.addEdge(edge);
			assert.equal(node.edges.length, 1);
		});
	});
	describe('isEdgeAdjacent', function() {
		it('should tell if given edge is adjacent to it.', function() {
			var node = new game.Node(2, 3);
			var otherNode = new game.Node(3, 3);
			var thirdNode = new game.Node(5, 5);
			var edge = new game.Edge(node, otherNode);
			node.addEdge(edge);
			otherNode.addEdge(edge);
			assert.isTrue(node.isEdgeAdjacent(edge));
			assert.isTrue(otherNode.isEdgeAdjacent(edge));
			assert.isFalse(thirdNode.isEdgeAdjacent(edge));
		});
	});
});

describe('Edge', function() {
	var game = new Game();
	var firstNode = new game.Node(2, 3);
	var secondNode = new game.Node(2, 2);
	var thirdNode = new game.Node(3, 3);
	describe('isEqualTo', function() {
		it('should tell other edge is equal to itself.', function() {
			var edge = new game.Edge(firstNode, secondNode);
			var otherEdge = new game.Edge(firstNode, secondNode);
			assert.isTrue(edge.isEqualTo(otherEdge));
		});
		it('should tell other edge is not equal if start-node or end-node is different.', function() {
			var firstEdge = new game.Edge(firstNode, secondNode);
			var secondEdge = new game.Edge(secondNode, firstNode);
			var thirdEdge = new game.Edge(firstNode, thirdNode);
			assert.isFalse(firstEdge.isEqualTo(secondEdge));
			assert.isFalse(firstEdge.isEqualTo(thirdEdge));
		});
	});
	describe('getOtherNode', function() {
		it('should give other node when one node is given', function() {
			var edge = new game.Edge(firstNode, secondNode, 0);
			assert.isTrue(edge.getOtherNode(firstNode).isEqualTo(secondNode));
			assert.isTrue(edge.getOtherNode(secondNode).isEqualTo(firstNode));
		});
	});
});


describe('Shape', function() {
	var game = new Game();
	var shapeData = {
		"height": 400,
		"width": 400,
		"nodesData": [
			[20, 20],
			[320, 20]
		],
		"edgesData": [
			[20, 20, 320, 20]
		]
	};
	shape = new game.Shape(shapeData);

	describe('isLevelComplete', function() {
		it('Should tell if level is complete.', function() {
			assert.isFalse(shape.isLevelComplete());
			shape.edges[0].visited = true;
			assert.isTrue(shape.isLevelComplete());
		});
	});

	it('should create a shape from raw data.', function() {
		assert.equal(shape.height, 400);
		assert.equal(shape.width, 400);
		assert.equal(shape.nodes.length, 2);
		assert.equal(shape.edges.length, 1);
	});

	it('should give each node a unique id.', function() {
		assert.equal(shape.nodes[0].id, 'node0');
		assert.equal(shape.nodes[1].id, 'node1');
	});
	it('should give each edge a unique id.', function() {
		assert.equal(shape.edges[0].id, 'edge0');
	});
	it('should assign each node their adjacent edges.', function() {
		assert.equal(shape.nodes[0].edges.length, 1);
		assert.equal(shape.nodes[1].edges.length, 1);
		shape.nodes.forEach(function(node) {
			assert.equal(node.edges[0].isEqualTo(shape.edges[0]), true)
		});
	});
	it('should get the node by id.', function() {
		assert.equal(shape.getNodeById('node0'), shape.nodes[0]);
	});

	describe('getEdgeById', function() {
		it('should give the edge matching to given edgeID', function() {
			var edge = shape.getEdgeById('edge0');
			var node1 = new game.Node(20, 20, 0);
			var node2 = new game.Node(320, 20, 1)
			var edge1 = new game.Edge(node1, node2, 0);
			assert.isTrue(edge.isEqualTo(edge1));
		});
	});
});

describe('Game', function() {
	var controller;
	beforeEach(function() {
		controller = {
			onShapeReadyCalled: false,
			onEdgeVisitedCalled: 0,
			onNodeSelectedCalled: 0,
			onStartNodeNotSelectedCalled: false,
			onStartNodeAlreadySelectedCalled: false,
			onNonAdjacentVisitCalled: false,
			onEdgeRevisitCalled: false,
			onLevelCompleteCalled: false
		};
		controller.onShapeReady = function(shape) {
			controller.onShapeReadyCalled = true;
		};
		controller.onEdgeVisited = function(edgeID) {
			controller.onEdgeVisitedCalled++;
		};
		controller.onNodeSelected = function(nodeID) {
			controller.onNodeSelectedCalled++;
		};

		controller.onNonAdjacentVisit = function(nodeID) {
			controller.onNonAdjacentVisitCalled = true;
		};
		controller.onStartNodeNotSelected = function() {
			controller.onStartNodeNotSelectedCalled = true;
		}
		controller.onEdgeRevisit = function() {
			controller.onEdgeRevisitCalled = true;
		}
		controller.onStartNodeAlreadySelected = function() {
			controller.onStartNodeAlreadySelectedCalled = true;
		};
		controller.onLevelComplete = function() {
			controller.onLevelCompleteCalled = true;
		};
	});

	describe('startGame', function() {
		it('should create a shape and get a controller for the game.', function() {
			var game = new Game();
			assert.typeOf(game.shape, 'undefined');
			assert.typeOf(game.controller, 'undefined');
			game.startGame(controller);
			assert.typeOf(game.shape, 'object');
			assert.typeOf(game.controller, 'object');
		});
		it('should inform controller when shape is ready.', function() {
			var game = new Game();
			assert.isFalse(controller.onShapeReadyCalled);
			game.startGame(controller);
			assert.isTrue(controller.onShapeReadyCalled);
		});

	});

	describe('visitEdge', function() {
		it('should set given edge as visited', function() {
			var game = new Game();
			game.startGame(controller);
			var edgeID = 'edge1';
			var edge = game.shape.getEdgeById(edgeID);
			assert.isFalse(edge.visited);
			game.selectNode(edge.startNode.id);
			game.visitEdge(edgeID);
			assert.isTrue(edge.visited);
		});
		it('should inform controller when edge is visited', function() {
			var game = new Game();
			game.startGame(controller);
			var edgeID = 'edge1';
			var edge = game.shape.getEdgeById(edgeID);
			assert.equal(controller.onEdgeVisitedCalled, 0);
			game.selectNode(edge.startNode.id);
			game.visitEdge(edgeID);
			assert.equal(controller.onEdgeVisitedCalled, 1);
		});
		it('should change the current node to other node of edge', function() {
			var game = new Game();
			game.startGame(controller);
			var edgeID = 'edge1';
			var edge = game.shape.getEdgeById(edgeID);
			game.selectNode(edge.startNode.id);
			assert.isTrue(game.currentNode.isEqualTo(edge.startNode));
			game.visitEdge(edge.id);
			assert.isTrue(game.currentNode.isEqualTo(edge.endNode));
		});
		it('should inform controller when current node is changed.', function() {
			var game = new Game();
			game.startGame(controller);
			assert.equal(controller.onNodeSelectedCalled, 0);
			game.selectNode('node0');
			assert.equal(controller.onNodeSelectedCalled, 1);
			game.visitEdge('edge0');
			assert.equal(controller.onNodeSelectedCalled, 2);
		});
		it('should not visit edge before selecting start node.', function() {
			var game = new Game();
			var edgeID = 'edge0';
			game.startGame(controller);
			game.visitEdge(edgeID);
			var edge = game.shape.getEdgeById(edgeID);
			assert.isFalse(edge.visited);
			assert.equal(controller.onEdgeVisitedCalled, 0);
			game.visitEdge(edgeID);
			assert.isFalse(edge.visited);
			assert.equal(controller.onEdgeVisitedCalled, 0);
		});
		it('should inform controller when edge is being visited before selecting start node.', function() {
			var game = new Game();
			var edgeID = 'edge0';
			game.startGame(controller);
			var edge = game.shape.getEdgeById(edgeID);
			assert.isFalse(controller.onStartNodeNotSelectedCalled);
			game.visitEdge(edgeID);
			assert.isTrue(controller.onStartNodeNotSelectedCalled);
		});

		it('should not visit an edge which is non-adjacent to currentNode', function() {
			var game = new Game();
			game.startGame(controller);
			game.selectNode('node1');
			var edgeID = 'edge1';
			var edge = game.shape.getEdgeById(edgeID);
			assert.isFalse(edge.visited);
			assert.equal(controller.onEdgeVisitedCalled, 0);
			game.visitEdge(edgeID);
			assert.isFalse(edge.visited);
			assert.equal(controller.onEdgeVisitedCalled, 0);
		});

		it('should inform controller when an edge is being visited which is non-adjacent to currentNode', function() {
			var game = new Game();
			game.startGame(controller);
			game.selectNode('node1');
			var edgeID = 'edge1';
			assert.isFalse(controller.onNonAdjacentVisitCalled);
			game.visitEdge(edgeID);
			assert.isTrue(controller.onNonAdjacentVisitCalled);
		});

		it('should not visit an edge which is already visited', function() {
			var game = new Game();
			game.startGame(controller);
			var edgeID = 'edge1';
			var edge = game.shape.getEdgeById(edgeID);
			assert.isFalse(edge.visited);
			assert.equal(controller.onEdgeVisitedCalled, 0);
			game.selectNode(edge.startNode.id);
			game.visitEdge(edgeID);
			assert.isTrue(edge.visited);
			assert.equal(controller.onEdgeVisitedCalled, 1);
			game.visitEdge(edgeID);
			assert.equal(controller.onEdgeVisitedCalled, 1);
		});

		it('should inform controller when an edge is being visited which is already visited', function() {
			var game = new Game();
			game.startGame(controller);
			var edgeID = 'edge1';
			var edge = game.shape.getEdgeById(edgeID);
			assert.isFalse(controller.onEdgeRevisitCalled);
			game.selectNode(edge.startNode.id);
			game.visitEdge(edgeID);
			game.visitEdge(edgeID);
			assert.isTrue(controller.onEdgeRevisitCalled);
		});
		it('should notify controller when level is completed.', function() {
			var game = new Game();
			game.startGame(controller);
			game.selectNode('node0');
			['edge0', 'edge3', 'edge1'].forEach(function(edge) {
				game.visitEdge(edge);
				assert.isFalse(controller.onLevelCompleteCalled);
			});
			game.visitEdge('edge2');
			assert.isTrue(controller.onLevelCompleteCalled);
		});

	});

	describe('selectNode', function() {
		it('should select start node on clicking first node.', function() {
			var game = new Game();
			game.startGame(controller);
			game.selectNode('node1');
			assert.equal(game.currentNode.id, 'node1');
		});
		it('should inform controller when node is selected.', function() {
			var game = new Game();
			game.startGame(controller);
			assert.equal(controller.onNodeSelectedCalled, 0);
			game.selectNode('node0');
			assert.equal(controller.onNodeSelectedCalled, 1);
		});

		it('should not change start node once selected.', function() {
			var game = new Game();
			game.startGame(controller);
			game.selectNode('node1');
			assert.equal(game.currentNode.id, 'node1');
			game.selectNode('node2');
			assert.equal(game.currentNode.id, 'node1');
		});

		it('should inform controller when start node is changed.', function() {
			var game = new Game();
			game.startGame(controller);
			game.selectNode('node1');
			assert.isFalse(controller.onStartNodeAlreadySelectedCalled);
			game.selectNode('node2');
			assert.isTrue(controller.onStartNodeAlreadySelectedCalled);
		});
	});

});
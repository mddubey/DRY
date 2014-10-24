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
			var otherNode = new game.Node(2, 3);
			var edge = new game.Edge(node, otherNode);
			assert.equal(node.edges.length, 0);
			node.addEdge(edge);
			assert.equal(node.edges.length, 1);
		});
	});

});

describe('Edge', function() {
	describe('isEqualTo', function() {
		var game = new Game();
		var firstNode = new game.Node(2, 3);
		var secondNode = new game.Node(2, 2);
		var thirdNode = new game.Node(3, 3);
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
			onEdgeVisitedCalled: false,
			onNodeSelectedCalled: false
		};
		controller.onShapeReady = function(shape) {
			controller.onShapeReadyCalled = true;
		};
		controller.onEdgeVisited = function(shape) {
			controller.onEdgeVisitedCalled = true;
		};
		controller.onNodeSelected = function(shape) {
			controller.onNodeSelectedCalled = true;
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
		it('should set given edge as viseted', function() {
			var game = new Game();
			game.startGame(controller);
			var edgeID = 'edge1';
			assert.isFalse(game.shape.getEdgeById(edgeID).visited);
			game.visitEdge(edgeID);
			assert.isTrue(game.shape.getEdgeById(edgeID).visited);
		});
		it('should inform controller when edge is visited', function() {
			var game = new Game();
			game.startGame(controller);
			assert.isFalse(controller.onEdgeVisitedCalled);
			game.visitEdge('edge1');
			assert.isTrue(controller.onEdgeVisitedCalled);
		});
		it('should change the current node to other node of edge', function() {
			var game = new Game();
			game.startGame(controller);
			var edgeID = 'edge1';
			var edge = game.shape.getEdgeById(edgeID);
			// game.onNodeSelected
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
			assert.isFalse(controller.onNodeSelectedCalled);
			game.selectNode(controller);
			assert.isTrue(controller.onNodeSelectedCalled);
		});
	});

});
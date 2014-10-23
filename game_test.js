var assert = chai.assert;

describe('Node', function() {
	describe('isEqualTo', function() {
		var game = new Game();
		it('should tell other node is equal to itself.', function() {
			var node = new game.Node(2, 3);
			var otherNode = new game.Node(2, 3);
			assert.equal(node.isEqualTo(otherNode), true);
		});
		it('should tell other node is not equal if x_axis or y_axis is different.', function() {
			var firstNode = new game.Node(2, 3);
			var secondNode = new game.Node(2, 2);
			var thirdNode = new game.Node(3, 3);
			assert.equal(firstNode.isEqualTo(secondNode), false);
			assert.equal(firstNode.isEqualTo(thirdNode), false);
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
			assert.equal(edge.isEqualTo(otherEdge), true);
		});
		it('should tell other edge is not equal if start-node or end-node is different.', function() {
			var firstEdge = new game.Edge(firstNode, secondNode);
			var secondEdge = new game.Edge(secondNode, firstNode);
			var thirdEdge = new game.Edge(firstNode, thirdNode);
			assert.equal(firstEdge.isEqualTo(secondEdge), false);
			assert.equal(firstEdge.isEqualTo(thirdEdge), false);
		});
	});
});


describe('Game', function() {
	var game = new Game();
	describe('createShape', function() {
		var shapeData;
		var shape;
		before(function() {
			shapeData = {
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
			shape = game.createShape(shapeData);
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
	});

	describe('startGame', function() {
		var controller;
		beforeEach(function() {
			controller = {
				called: false
			};
			controller.onShapeReady = function(shape) {
				controller.called = true;
			};
		})
		it('should create a shape and get a controller for the game.', function() {
			var game = new Game();
			assert.equal(typeof(game.shape), 'undefined');
			assert.equal(typeof(game.controller), 'undefined');
			game.startGame(controller);
			assert.equal(typeof(game.shape), 'object');
			assert.equal(typeof(game.controller), 'object');
		});
		it('should inform controller when shape is ready.', function() {
			var game = new Game();
			assert.equal(controller.called,false);
			game.startGame(controller);
			assert.equal(controller.called,true);
		});
	});
});
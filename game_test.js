var assert = chai.assert;

describe('Node', function() {
	var game = new Game({});
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
	var game = new Game({});
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
			onLevelCompleteCalled: false,
			onGameFinishedCalled: false,
			onLevelRestartCalled: 0
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
		controller.onGameFinished = function() {
			controller.onGameFinishedCalled = true;
		};
		controller.onLevelRestart = function(shape) {
			controller.onLevelRestartCalled++;
		};
	});




	describe('visit', function() {
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
		it('should give a visit of each node and each edge to visitor', function() {
			var visitor = {renderEdgeCalled:0,renderNodeCalled:0};
			visitor.renderEdge = function(edge){
				visitor.renderEdgeCalled++;		
			};
			visitor.renderNode = function(node){
				visitor.renderNodeCalled++;		
			};
			var game = new Game({},[shapeData]);
			game.visit(visitor);
			assert.equal(visitor.renderNodeCalled, 2);
			assert.equal(visitor.renderEdgeCalled, 1);
		});
	});












});
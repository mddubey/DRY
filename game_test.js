var assert = chai.assert;

describe('Node', function() {
	describe('isEqualTo', function() {
		it('should tell other node is equal to itself.', function() {
			var node = new Node(2, 3);
			var otherNode = new Node(2, 3);
			assert.isTrue(node.isEqualTo(otherNode));
		});
		it('should tell other node is not equal if x_axis or y_axis is different.', function() {
			var firstNode = new Node(2, 3);
			var secondNode = new Node(2, 2);
			var thirdNode = new Node(3, 3);
			assert.isFalse(firstNode.isEqualTo(secondNode));
			assert.isFalse(firstNode.isEqualTo(thirdNode));
		});
	});
	describe('addEdge', function() {
		it('should add given edge in it\'s edges.', function() {
			var node = new Node(2, 3);
			var otherNode = new Node(3, 3);
			var edge = new Edge(node, otherNode);
			assert.equal(node.edges.length, 0);
			node.addEdge(edge);
			assert.equal(node.edges.length, 1);
		});
	});
	describe('isEdgeAdjacent', function() {
		it('should tell if given edge is adjacent to it.', function() {
			var node = new Node(2, 3);
			var otherNode = new Node(3, 3);
			var thirdNode = new Node(5, 5);
			var edge = new Edge(node, otherNode);
			node.addEdge(edge);
			otherNode.addEdge(edge);
			assert.isTrue(node.isEdgeAdjacent(edge));
			assert.isTrue(otherNode.isEdgeAdjacent(edge));
			assert.isFalse(thirdNode.isEdgeAdjacent(edge));
		});
	});
});

describe('Edge', function() {
	var firstNode = new Node(2, 3);
	var secondNode = new Node(2, 2);
	var thirdNode = new Node(3, 3);
	describe('isEqualTo', function() {
		it('should tell other edge is equal to itself.', function() {
			var edge = new Edge(firstNode, secondNode);
			var otherEdge = new Edge(firstNode, secondNode);
			assert.isTrue(edge.isEqualTo(otherEdge));
		});
		it('should tell other edge is not equal if start-node or end-node is different.', function() {
			var firstEdge = new Edge(firstNode, secondNode);
			var secondEdge = new Edge(secondNode, firstNode);
			var thirdEdge = new Edge(firstNode, thirdNode);
			assert.isFalse(firstEdge.isEqualTo(secondEdge));
			assert.isFalse(firstEdge.isEqualTo(thirdEdge));
		});
	});
	describe('getOtherNode', function() {
		it('should give other node when one node is given', function() {
			var edge = new Edge(firstNode, secondNode, 0);
			assert.isTrue(edge.getOtherNode(firstNode).isEqualTo(secondNode));
			assert.isTrue(edge.getOtherNode(secondNode).isEqualTo(firstNode));
		});
	});
});

describe('Game', function() {
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
			var visitor = {
				renderEdgeCalled: 0,
				renderNodeCalled: 0
			};
			visitor.renderEdge = function(edge) {
				visitor.renderEdgeCalled++;
			};
			visitor.renderNode = function(node) {
				visitor.renderNodeCalled++;
			};
			var game = new Game({}, [shapeData]);
			game.visit(visitor);
			assert.equal(visitor.renderNodeCalled, 2);
			assert.equal(visitor.renderEdgeCalled, 1);
		});
	});

});
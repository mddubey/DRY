var assert = chai.assert;

describe('Node', function() {
	describe('isEqualTo', function() {
		it('should tell other node is equal to itself', function() {
			var node = new game.Node(2, 3);
			var otherNode = new game.Node(2, 3);
			assert.equal(node.isEqualTo(otherNode), true);
		});
		it('should tell other node is not equal if x_axis or y_axis is different', function() {
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
		var firstNode = new game.Node(2, 3);
		var secondNode = new game.Node(2, 2);
		var thirdNode = new game.Node(3, 3);
		it('should tell other edge is equal to itself', function() {
			var edge = new game.Edge(firstNode, secondNode);
			var otherEdge = new game.Edge(firstNode, secondNode);
			assert.equal(edge.isEqualTo(otherEdge), true);
		});
		it('should tell other node is not equal if x_axis or y_axis is different', function() {
			var firstEdge = new game.Edge(firstNode, secondNode);
			var secondEdge = new game.Edge(secondNode, firstNode);
			var thirdEdge = new game.Edge(firstNode, thirdNode);
			assert.equal(firstEdge.isEqualTo(secondEdge), false);
			assert.equal(firstEdge.isEqualTo(thirdEdge), false);
		});
	});
});


describe('Game', function() {
	describe('createShape', function() {
		var shapeData;
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
		});
		it('should create a shape from raw data', function() {
			var shape = game.createShape(shapeData);
			assert.equal(shape.height, 400);
			assert.equal(shape.width, 400);
			assert.equal(shape.nodes.length,2);
			assert.equal(shape.edges.length,1);
		});

		it('each node should have an id',function  () {
			var shape = game.createShape(shapeData);
			shape.nodes.forEach(function  (node) {
				assert.equal((['node0','node1'].indexOf(node.id) > -1),true);
			});
		});

		it('each Edge should have an id',function  () {
			var shape = game.createShape(shapeData);
			shape.edges.forEach(function  (edge) {
				assert.equal((['edge0'].indexOf(edge.id) > -1),true);
			});
		});
	});
});
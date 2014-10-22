var assert = chai.assert;

describe('Node', function() {
	describe('isEqualTo', function() {
		it('should tell other node is equal to itself', function() {
			var node = new game.Node(2,3);
			var otherNode = new game.Node(2,3);
			assert.equal(node.isEqualTo(otherNode),true);
		});
		it('should tell other node is not equal if x_axis or y_axis is different', function() {
			var firstNode = new game.Node(2,3);
			var secondNode = new game.Node(2,2);
			var thirdNode = new game.Node(3,3);
			assert.equal(firstNode.isEqualTo(secondNode),false);
			assert.equal(firstNode.isEqualTo(thirdNode),false);
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
			assert.equal(shape.height,400);
			assert.equal(shape.width,400);
		});
	});
});
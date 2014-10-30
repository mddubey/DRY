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
	var game;
	beforeEach(function() {
			game = new Game([shapeData]);
	});
	describe('visit', function() {
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
			var game = new Game([shapeData]);
			game.visit(visitor);
			assert.equal(visitor.renderNodeCalled, 4);
			assert.equal(visitor.renderEdgeCalled, 4);
		});
	});

	describe('getEdgeById', function() {
		it('should give the edge matching to given Id', function() {
			var game = new Game([shapeData]);
			var edge = game.getEdgeById('edge0');
			var node1 = new Node(20, 20, 0);
			var node2 = new Node(320, 20, 1)
			var expectedEdge = new Edge(node1, node2, 0);
			assert.isTrue(edge.isEqualTo(expectedEdge));
		});
	});

	describe('getNodeById', function() {
		it('should give the node matching to given Id', function() {
			var game = new Game([shapeData]);
			var node = game.getNodeById('node0');
			var expectedNode = new Node(20, 20, 0);
			assert.isTrue(node.isEqualTo(expectedNode));
		});
	});

	describe('isLevelComplete', function() {
		it('Should tell if level is complete.', function() {
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
			var game = new Game([shapeData]);
			assert.isFalse(game.isLevelComplete());
			game.selectNode('node0');
			game.visitEdge('edge0');
			assert.isTrue(game.isLevelComplete());
		});
	});

	describe('selectNode', function() {
		it('should select start node on selecting first node.', function() {
			game.selectNode('node1');
			var expectedNode = game.getNodeById('node1');
			assert.equal(game.currentNode, expectedNode);
		});
		it('should give success status code on selecting firstNode.', function() {
			var selectNodeSuccessCode = 301;
			var result = game.selectNode('node0');
			var expected = {
				statusCode: selectNodeSuccessCode
			};
			assert.deepEqual(expected, result);
		});
		it('should not change start node once selected.', function() {
			game.selectNode('node1');
			var expectedNode = game.getNodeById('node1');
			assert.equal(game.currentNode, expectedNode);
			game.selectNode('node2');
			assert.equal(game.currentNode, expectedNode);
		});
		it('should give failure status code on selecting node twice.', function() {
			var selectNodeAlreadySelectedCode = 401;
			var expected = {
				statusCode: selectNodeAlreadySelectedCode
			};
			game.selectNode('node1');
			var result = game.selectNode('node2');
			assert.deepEqual(expected, result);
		});
	});

	describe('visitEdge', function() {
		it('should set given edge as visited', function() {
			var edgeID = 'edge0';
			var edge = game.getEdgeById(edgeID);
			assert.isFalse(edge.visited);
			game.selectNode(edge.startNode.id);
			game.visitEdge(edgeID);
			assert.isTrue(edge.visited);
		});
		it('should change the current node to other node of edge', function() {
			var edgeID = 'edge0';
			var edge = game.getEdgeById(edgeID);
			game.selectNode(edge.startNode.id);
			assert.isTrue(game.currentNode.isEqualTo(edge.startNode));
			game.visitEdge(edge.id);
			assert.isTrue(game.currentNode.isEqualTo(edge.endNode));
		});

		it('should give success status code,and current node id after edge is visited', function() {
			var edgeVisitedCode = 302;
			var edgeID = 'edge0';
			var edge = game.getEdgeById(edgeID);
			game.selectNode(edge.startNode.id);
			var expected = {
				statusCode: edgeVisitedCode,
				nodeId: edge.endNode.id
			};
			var result = game.visitEdge(edgeID);
			assert.deepEqual(result, expected);
		});

		it('should not visit edge before selecting start node.', function() {
			var edgeID = 'edge0';
			var edge = game.getEdgeById(edgeID);
			assert.isFalse(edge.visited);
			game.visitEdge(edgeID);
			assert.isFalse(edge.visited);
		});

		it('should give failure statusCode when edge is being visited before selecting start node.', function() {
			var edgeID = 'edge0';
			var edge = game.getEdgeById(edgeID);
			var startNodeNotSelectedCode = 402;
			var expected = {
				statusCode: startNodeNotSelectedCode
			};
			var result = game.visitEdge(edgeID);
			assert.deepEqual(result, expected);
		});

		it('should not visit an edge which is non-adjacent to currentNode', function() {
			game.selectNode('node0');
			var edgeID = 'edge1';
			var edge = game.getEdgeById(edgeID);
			assert.isFalse(edge.visited);
			game.visitEdge(edgeID);
			assert.isFalse(edge.visited);
		});

		it('should give failure statusCode when an edge is being visited which is non-adjacent to currentNode', function() {
			var nonAdjacentVisitCode = 404;
			var edgeID = 'edge1';
			var expected = {
				statusCode: nonAdjacentVisitCode
			};
			game.selectNode('node0');
			var result = game.visitEdge(edgeID);
			assert.deepEqual(result, expected);
		});

		it('should not visit an edge which is already visited', function() {
			var edgeVisitedCode = 302;
			var edgeID = 'edge0';
			var edge = game.getEdgeById(edgeID);
			assert.isFalse(edge.visited);
			game.selectNode(edge.startNode.id);
			var result = game.visitEdge(edgeID);
			assert.equal(result.statusCode, edgeVisitedCode);
			assert.isTrue(edge.visited);
			var result = game.visitEdge(edgeID);
			assert.notEqual(result.statusCode, edgeVisitedCode);
		});

		it('should give failure statusCode when an edge is being visited which is already visited', function() {
			var edgeRevisitCode = 403;
			var edgeID = 'edge1';
			var edge = game.getEdgeById(edgeID);
			game.selectNode(edge.startNode.id);
			game.visitEdge(edgeID);
			var expected = {
				statusCode: edgeRevisitCode
			};
			var result = game.visitEdge(edgeID);
			assert.deepEqual(result, expected);
		});

		// it('should notify controller when level is completed.', function() {
		// 	game.selectNode('node0');
		// 	['edge0', 'edge3', 'edge1'].forEach(function(edge) {
		// 		game.visitEdge(edge);
		// 		assert.isFalse(controller.onLevelCompleteCalled);
		// 	});
		// 	game.visitEdge('edge2');
		// 	assert.isTrue(controller.onLevelCompleteCalled);
		// });

		it('should give success statusCode as game finished when all levels are completed.', function() {
			var gameFinishedCode = 304;
			game.selectNode('node0');
			['edge0', 'edge3', 'edge1'].forEach(function(edge) {
				game.visitEdge(edge);
			});
			var result = game.visitEdge('edge2');
			var expected = {statusCode:gameFinishedCode};
			assert.deepEqual(result,expected);
		});
	});

	describe('restartLevel', function() {
		it('should reset the shape on restart of a level.', function() {
			game.selectNode('node1');
			var edgeID = 'edge0';
			var edge = game.getEdgeById(edgeID);
			game.visitEdge(edgeID);
			assert.equal(game.noOfEdgeVisited, 1);
			assert.isDefined(game.currentNode);
			game.restartLevel();
			assert.isUndefined(game.currentNode);
			assert.equal(game.noOfEdgeVisited, 0);
		});
	});

});
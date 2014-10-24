var controller = {};

controller.onShapeReady = function(shape) {
	var container = $('#container');
	var svgHTML = '<svg width="' + shape.width + '" height="' + shape.height + '">';
	shape.edges.forEach(function(edge) {
		var lineHTML = '<line id="ID" x1="X1" y1="Y1" x2="X2" y2="Y2" style="stroke:rgb(0,0,0);stroke-width:10" />';
		lineHTML = lineHTML.replace('ID', edge.id).replace('X1', edge.startNode.x).replace('Y1', edge.startNode.y).replace('X2', edge.endNode.x).replace('Y2', edge.endNode.y);
		svgHTML += lineHTML;
	});
	shape.nodes.forEach(function(node) {
		var circleHTML = '<circle id="ID" cx="CX" cy="CY" r="10" stroke="black" stroke-width="3" fill="skyblue"/>';
		circleHTML = circleHTML.replace('ID', node.id).replace('CX', node.x).replace('CY', node.y);
		svgHTML += circleHTML;
	});
	svgHTML += '</svg>';
	container.html(svgHTML);
};

controller.onEdgeVisited = function(edgeID) {
	$('#' + edgeID).css({
		stroke: 'rgb(0,200,0)'
	});
};


controller.onNodeSelected = function(nodeID) {
	var circles = $('circle');
	circles.attr('fill', 'skyblue');
	$('#' + nodeID).attr('fill', 'pink');
}

controller.onStartNodeAlreadySelected = function(nodeID) {
	var notification = $('#notification');
	notification.html('You have already selected the starting node.');
}

controller.onStartNodeNotSelected = function() {
	var notification = $('#notification');
	notification.html('Please select a node to start the game before clicking an edge.');
}

var init = function() {
	var game = new Game();
	game.startGame(controller);
	$('#container').on('click', '[id^="edge"]', function() {
		var edgeID = $(this).attr('id');
		game.visitEdge(edgeID);
	});
	var circles = $('circle');
	circles.click(function() {
		game.selectNode(this.id)
	});
};

$(document).ready(init);
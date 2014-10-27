var controller = {};

controller.onShapeReady = function(shape) {
	var container = $('#container');
	var svgHTML = '<svg width="' + shape.width + '" height="' + shape.height + '">';
	shape.edges.forEach(function(edge) {
		var lineHTML = '<line id="ID" x1="X1" y1="Y1" x2="X2" y2="Y2" style="stroke:rgb(0,0,0);stroke-width:15" />';
		lineHTML = lineHTML.replace('ID', edge.id).replace('X1', edge.startNode.x).replace('Y1', edge.startNode.y).replace('X2', edge.endNode.x).replace('Y2', edge.endNode.y);
		svgHTML += lineHTML;
	});
	shape.nodes.forEach(function(node) {
		var circleHTML = '<circle id="ID" cx="CX" cy="CY" r="15" stroke="black" stroke-width="3" fill="skyblue"/>';
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
};

controller.onLevelComplete = function(){
	showErrorMessage('You have completed this level.');
}

var showErrorMessage = function(message){
	var notification = $('#error');
	notification.fadeIn(1000);
	notification.text(message);
	setTimeout(function(){
		notification.fadeOut(1000);
	},5000);
};


controller.onStartNodeAlreadySelected = function(nodeID) {
	showErrorMessage('You have already selected the starting node.');
};

controller.onNonAdjacentVisit = function(){
	showErrorMessage('You can visit just adjacent edges to current node.');
};

controller.onStartNodeNotSelected = function() {
	showErrorMessage('Please select a node as starting point to start the game.');
};

controller.onEdgeRevisit = function(){
	showErrorMessage('You can not visit an edge twice.');
};

controller.onGameFinished = function () {
	showErrorMessage('Congrats!@! You have won. :)')
};

controller.onLevelRestart = function(shape){
	controller.onShapeReady(shape);
};

var init = function() {
	var game = new Game();
	game.startGame(controller);
	$('#container').on('click', 'line', function() {
		var edgeID = $(this).attr('id');
		game.visitEdge(edgeID);
	});
	$('#container').on('click', 'circle', function() {
		game.selectNode(this.id);
	});
	$('#resetLevel').click(function(){
		game.restartLevel();
	})
};

$(document).ready(init);
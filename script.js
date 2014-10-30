var presenter = {};
var performAction = function(info,id){
	var dictionary = {
		"action301" : presenter.onNodeSelected,
		"action302" : presenter.onEdgeVisited,
		"action304" : presenter.onGameFinished,

		"error401" : presenter.onStartNodeAlreadySelected,
		"error402" : presenter.onStartNodeNotSelected,
		"error403" : presenter.onEdgeRevisit,
		"error404" : presenter.onNonAdjacentVisit
	};
	if(info.statusCode < 400)
		dictionary["action" + info.statusCode](id,info);
	else dictionary["error" + info.statusCode](id);
};


var onShapeReady = function(shape) {
	var container = $('#container');
	var svgHTML = '<svg width="400" height="400">';
	var visitor = {};
	visitor.renderEdge = function(edge){
		var lineHTML = '<line id="ID" x1="X1" y1="Y1" x2="X2" y2="Y2"/>';
		lineHTML = lineHTML.replace('ID', edge.id).replace('X1', edge.startNode.x).replace('Y1', edge.startNode.y).replace('X2', edge.endNode.x).replace('Y2', edge.endNode.y);
		svgHTML += lineHTML;
	};
	visitor.renderNode = function(node) {
		var circleHTML = '<circle id="ID" cx="CX" cy="CY" r="15" stroke="black" stroke-width="3" fill="skyblue"/>';
		circleHTML = circleHTML.replace('ID', node.id).replace('CX', node.x).replace('CY', node.y);
		svgHTML += circleHTML;
	};
	presenter.game.visit(visitor);
	svgHTML += '</svg>';
	container.html(svgHTML);
};

presenter.onEdgeVisited = function(edgeID,info) {
	$('#' + edgeID).attr('class','visited');
	presenter.onNodeSelected(info.nodeId);
};

presenter.onNodeSelected = function(nodeID) {
	var circles = $('circle');
	circles.attr('fill', 'skyblue');
	$('#' + nodeID).attr('fill', 'pink');
};

presenter.onLevelComplete = function(){
	// showErrorMessage('You have completed this level.');
}

var showErrorMessage = function(message){
	var error = $('#error');
	error.fadeIn(1000);
	error.find('h2').text(message);
	setTimeout(function(){
		error.fadeOut(1000);
	},3000);
};


presenter.onStartNodeAlreadySelected = function(nodeID) {
	showErrorMessage('You have already selected the starting node.');
};
	
presenter.onNonAdjacentVisit = function(){
	showErrorMessage('You can visit just adjacent edges to current node.');
};

presenter.onStartNodeNotSelected = function() {
	showErrorMessage('Please select a node as starting point to start the game.');
};

presenter.onEdgeRevisit = function(){
	showErrorMessage('You can not visit an edge twice.');
};

presenter.onGameFinished = function () {
	$('#main').hide();
	$('#error').hide();
	$('#finish').show();
};

var init = function() {
	presenter.game = new Game();
	onShapeReady();
	$('#container').on('click', 'line', function() {
		var edgeID = $(this).attr('id');
		var info = presenter.game.visitEdge(edgeID);
		performAction(info,edgeID);
	});
	$('#container').on('click', 'circle', function() {
		var nodeID = $(this).attr('id');
		var info = presenter.game.selectNode(nodeID);
		performAction(info,nodeID);
	});
	$('#resetLevel').click(function(){
		presenter.game.restartLevel();
		onShapeReady();
	})
};

$(document).ready(init);
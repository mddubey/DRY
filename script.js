var controller = {};

controller.onGameStart = function(shape){
	var container = $('div');
	var svgHTML = '<svg width="'+shape.width+'" height="'+shape.height+'">';
	shape.edges.forEach(function(edge){
		var lineHTML = '<line class="edge" x1="X1" y1="Y1" x2="X2" y2="Y2" style="stroke:rgb(0,0,0);stroke-width:5" />\n';
		lineHTML = lineHTML.replace('X1',edge.startNode.x).replace('Y1',edge.startNode.y).replace('X2',edge.endNode.x).replace('Y2',edge.endNode.y);
		svgHTML += lineHTML;
	});
	shape.nodes.forEach(function(node){
		var circleHTML = '<circle class="node" cx="CX" cy="CY" r="10" stroke="black" stroke-width="3" fill="skyblue"/>\n';
		circleHTML = circleHTML.replace('CX',node.x).replace('CY',node.y);
		svgHTML += circleHTML;
	});
	svgHTML += '</svg>';
	container.html(svgHTML);
}

var init = function() {
	game.startGame(controller);
};

$(document).ready(init);

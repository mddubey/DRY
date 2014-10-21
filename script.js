// var game = require('./game').game;

var observer = {};

observer.onGameStart = function(shape){
	var container = $('div');
	var svgHTML = '<svg width="'+shape.width+'" height="'+shape.height+'">';
	shape.lines.forEach(function(line){
		var lineHTML = '<line class="edge" x1="X1" y1="Y1" x2="X2" y2="Y2" style="stroke:rgb(0,0,0);stroke-width:5" />\n';
		lineHTML = lineHTML.replace('X1',line.startNode.point.x).replace('Y1',line.startNode.point.y).replace('X2',line.endNode.point.x).replace('Y2',line.endNode.point.y);
		svgHTML += lineHTML;
	});
	shape.nodes.forEach(function(node){
		var circleHTML = '<circle class="node" cx="CX" cy="CY" r="10" stroke="black" stroke-width="3" fill="skyblue"/>\n';
		circleHTML = circleHTML.replace('CX',node.point.x).replace('CY',node.point.y);
		svgHTML += circleHTML;
	});
	svgHTML += '</svg>';
	container.html(svgHTML);
}

var init = function() {
	game.startGame(observer);
};

$(document).ready(init);

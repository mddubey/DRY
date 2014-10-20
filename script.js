// var game = require('./game').game;

var init = function() {
	var shape = {
		"height":400,"width":400,
		"nodes":[[20,20],[320,20],[20,320],[320,320]],
		"lines":[[20,20,320,20],[20,320,320,320],[20,20,20,320],[320,20,320,320]]
	};
	var container = $('div');
	var svgHTML = '<svg width="'+shape.width+'" height="'+shape.height+'">';
	shape.lines.forEach(function(line){
		var lineHTML = '<line class="edge" x1="X1" y1="Y1" x2="X2" y2="Y2" style="stroke:rgb(0,0,0);stroke-width:5" />\n';
		lineHTML = lineHTML.replace('X1',line[0]).replace('Y1',line[1]).replace('X2',line[2]).replace('Y2',line[3]);
		svgHTML += lineHTML;
	});
	shape.nodes.forEach(function(node){
		var circleHTML = '<circle class="node" cx="CX" cy="CY" r="10" stroke="black" stroke-width="3" fill="skyblue"/>\n';
		circleHTML = circleHTML.replace('CX',node[0]).replace('CY',node[1]);
		svgHTML += circleHTML;
	});
	svgHTML += '</svg>';
	container.html(svgHTML);
};

$(document).ready(init);

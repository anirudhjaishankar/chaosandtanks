
//Function which draws the Mountain
function drawMountain() {
	cx.beginPath();
	cx.strokeStyle = "#070F3F";
	cx.fillStyle = "#070F3F";
	cx.moveTo(30, baseY);
//	cx.bezierCurveTo(80, 470, 160, 520, x1, y1);
	cx.lineTo(x2+50, y2+50);
	cx.lineTo(x3, y3);
	cx.bezierCurveTo(1150, 490, 1200, 480, width - 30, baseY);
	cx.closePath();
	cx.stroke();
	cx.fill();
	cx.fillStyle = "#FFFFFF";
}

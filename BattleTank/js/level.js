
//Function which draws the Mountain
function drawMountain() {
	cx.beginPath();
	cx.strokeStyle = "#070F3F";
	cx.fillStyle = "#070F3F";
	cx.moveTo(30, baseY);
	cx.bezierCurveTo(100, 470, 160, 520, x1, y1);
	cx.lineTo(x2, y2);
	cx.lineTo(x3, y3);
	cx.bezierCurveTo(1150, 490, 1200, 480, width - 30, baseY);
	cx.closePath();
	cx.stroke();
	cx.fill();
	cx.fillStyle = "#FFFFFF";
}

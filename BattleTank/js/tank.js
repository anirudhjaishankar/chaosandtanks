//Function which draws the tank's turret which is placed on the left side
function drawTurret1() {
	cx.save();
	cx.translate(tankOneX + 39, tankOneY + 6);
	cx.rotate(-1 * tankOneAngle * Math.PI / 180);
	cx.drawImage(turret, 0, 0, tubeWidth, tubeHeight);
	cx.restore();
	bulletOneAngle = tankOneAngle;
}



//Function which draws the tank's turret which is placed on the left side
function drawTurret2() {
	cx.save();
	cx.translate(tankTwoX + 38, tankTwoY + 13);
	cx.rotate(Math.PI + tankTwoAngle * Math.PI / 180);
	cx.drawImage(turret, 0, 0, tubeWidth, tubeHeight);
	cx.restore();
	bulletTwoAngle = tankTwoAngle;
}
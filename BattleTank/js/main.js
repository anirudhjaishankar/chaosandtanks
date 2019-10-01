var canvas = document.getElementById("canvas");
if(canvas!=null)
{
var cx = canvas.getContext("2d");
var width = canvas.getAttribute("width");
var height = canvas.getAttribute("height");
}
//basic coordinates
var tankWidth = 90;
var tankHeight = 60;
var tubeWidth = 60;
var tubeHeight = 6;
var bulletWidth = 20;
var bulletHeight = 8;
var playerActive = 1;
var tankOneAngle = 25;
var tankTwoAngle = 25;
var tankOnePower = 1.3;
var tankTwoPower = 1.3;

//Player Names
var playerOneName="Player-1";
var playerTwoName="Player-2";

//For Scores
var playerOneScore = 0;
var playerTwoScore = 0;

//To produce the hill
var x1 = 350 + Math.random() * 50;
var y1 = 450 - Math.random() * 50;
var x2 = 650 + Math.random() * 70;
var y2 = 320 - Math.random() * 100;
var x3 = 1050 + Math.random() * 30;
var y3 = 480 - Math.random() * 20;

//conditions for operations
var gameOver = false;
var tankOneFire = false;
var tankTwofire = false;
var move = true;
var angle = true;
var power = true;
var bulletOneAngle = tankOneAngle;
var bulletTwoAngle = tankTwoAngle;

//count of bullets
var tankOneBullets = 10;
var tankTwoBullets = 10;

//position of tanks
var baseY = 550;
var tankOneX = 0;
var tankOneY = 450;
var tankTwoX = 1260;
var tankTwoY = 450;
var shotWidth = 20;
var shotHeight = 15;
var hitY1;
var hitY2;

//variables used in making projectile 
var bounce1 = 1;
var bounce2 = 1;
var gravity = 7;
var time = 0;
var inc = 0.5;
var velocity = 15;
var Angle = (bulletOneAngle * (Math.PI) / 180);
var velocityx = velocity * Math.cos(Angle);
var velocityy = velocity * Math.sin(Angle) * -1;
var powerOne = tankOnePower;
var powerTwo = tankTwoPower;

//Image variables
var background = new Image();
var tankOneImg = new Image();
var tankTwoImg = new Image();
var turret = new Image();
var shotOneImg = new Image();
var shotTwoImg = new Image();
var scorecard  = new Image();

//Image variables assignment
background.src = "assets/images/background.png";
tankOneImg.src = "assets/images/tank1.png";
tankTwoImg.src = "assets/images/tank2.png";
turret.src = "assets/images/tanks_turret3.png";
shotOneImg.src = "assets/images/shot.png";
shotTwoImg.src = "assets/images/shot.png";
scorecard.src="assets/images/gameover.jpg";


//Music variables

var shotMusic=new Audio();
var destroy=new Audio();
var gameOverMusic=new Audio();

shotMusic.src="assets/sound/Gun_Shot-Marvin-1140816320.mp3";
destroy.src="assets/sound/Flashbang-Kibblesbob-899170896.mp3"
gameOverMusic.src="assets/sound/gameOver.mp3";

//Option Function

function Option()
{
	document.getElementById("success").style.display="none";
	document.getElementById("change").style.display="block";
	document.getElementById("buttons").style.display="none";
	document.getElementById("tank").style.display="none";
	document.getElementById("option").style.display="block";
	
	if(localStorage.getItem("playerOneName")===null)
	localStorage.setItem("playerOneName","Player-1");
	if( localStorage.getItem("playerTwoName")===null)
	localStorage.setItem("playerTwoName","Player-2");
	document.getElementById("playerOne").placeholder=localStorage.getItem("playerOneName");
	document.getElementById("playerTwo").placeholder=localStorage.getItem("playerTwoName");
}

//Change Name
function change()
{
	playerOneName=document.getElementById("playerOne").value;
	playerTwoName=document.getElementById("playerTwo").value;
	if(playerOneName.length==0 && playerTwoName.length==0)
	window.alert("Please Enter the name");
	else
	{
	if(playerOneName.length!=0) localStorage.setItem("playerOneName",playerOneName);
	if(playerTwoName.length!=0) localStorage.setItem("playerTwoName",playerTwoName);
	document.getElementById("success").style.display="block";
	document.getElementById("change").style.display="none";
	}

}

//Back To Main
function back()
{
	document.getElementById("buttons").style.display="flex";
	document.getElementById("buttons").style.justifyContent="space-around";
	document.getElementById("option").style.display="none";
	document.getElementById("tank").style.display="block";
}

document.addEventListener('keydown', function (event) {

	//space to fire
	if (event.keyCode == 32) {
		if (playerActive == 1) {
			if (tankOneBullets > 0 && tankOneFire == false) {
				shotMusic.play();
				var velocity;
				powerOne = tankOnePower;
				velocity = 13;
				time = 0;
				velocity = 15;
				shotOneX = tankOneX + 37 + tubeWidth * Math.cos(tankOneAngle * Math.PI / 180);
				shotOneY = tankOneY - tubeWidth * Math.sin(tankOneAngle * Math.PI / 180);
				missileOneX = tankOneX + 37 + tubeWidth * Math.cos(tankOneAngle * Math.PI / 180);
				missileTwoY = tankOneY - tubeWidth * Math.sin(tankOneAngle * Math.PI / 180);
				Angle = (tankOneAngle * (Math.PI) / 180);
				velocityx = velocity * Math.cos(Angle);
				velocityy = velocity * Math.sin(Angle) * -1;
				tankOneFire = true;
				tankOneBullets--;
				move = false;
				angle = false;
				power = false;
				showWind = false;
			}
		}
		else {
			if (tankTwoBullets > 0 && tankTwofire == false) {
				shotMusic.play();
				var velocity;
				powerTwo = tankTwoPower;
				time = 0;
				velocity = 15;
				Angle = (tankTwoAngle * (Math.PI) / 180);
				velocityx = velocity * Math.cos(Angle);
				velocityy = velocity * Math.sin(Angle) * -1;
				shotTwoX = tankTwoX - 0.5 * tubeWidth * Math.cos(Angle);
				shotTwoY = tankTwoY - tubeWidth * Math.sin(Angle);
				missileTwoX = tankTwoX - 0.5 * tubeWidth * Math.cos(Angle);
				missileTwoY = tankTwoY - tubeWidth * Math.sin(Angle);
				tankTwofire = true;
				tankTwoBullets--;
				move = false;
				angle = false;
				power = false;
				showWind = false;
			}
		}
	}

	//Left Movement
	if (event.keyCode == 37 && move == true) {
		if (playerActive == 1) {
			if (tankOneX >= 20)
				tankOneX -= 20;
		}
		else {
			if (tankTwoX >= 1180)
				tankTwoX -= 20;
		}
	}

	//Right Movement
	if (event.keyCode == 39 && move == true) {
		if (playerActive == 1) {
			if (tankOneX < 80)
				tankOneX += 20;
		}
		else {
			if (tankTwoX < 1260)
				tankTwoX += 20;
		}
	}

	//down movement
	if (event.keyCode == 40 && angle == true) {
		if (playerActive == 1) {
			if (tankOneAngle > 0) {
				tankOneAngle--;
			}
		}
		else {
			if (tankTwoAngle > 0) {
				tankTwoAngle--;
			}
		}
	}

	//up movement
	if (event.keyCode == 38 && angle == true) {
		if (playerActive == 1) {
			if (tankOneAngle < 50) {
				tankOneAngle++;
			}
		}
		else {
			if (tankTwoAngle < 50) {
				tankTwoAngle++;
			}
		}
	}

	//power increase
	if(event.keyCode == 87 && power == true){
		if(playerActive == 1){
			if(tankOnePower < 3){
				tankOnePower += 0.1;
			}
		}else{
			if(tankTwoPower < 3){
				tankTwoPower += 0.1;
			}
		}
	}

	//power decrease
	if(event.keyCode == 83 && power == true){
		if(playerActive == 1){
			if(tankOnePower > 0){
				tankOnePower -= 0.1;
			}
		}else{
			if(tankTwoPower > 0){
				tankTwoPower -= 0.1;
			}
		}
	}

	if(event.keyCode == 82 && gameOver==true)
	{
		window.location.reload();
	}

	if(event.keyCode == 69 && gameOver==true)
	{
		window.location.href = 'index.html';
	}
});


function missileCheckOne() {
	if (((mountainHitTankOneX + 10 >= tankTwoX) && (mountainHitTankOneX <= tankTwoX + tankWidth)) && ((mountainHitTankOneY >= tankTwoY - 8) && (mountainHitTankOneY <= tankTwoY + tankHeight))) {
		playerOneScore += 5;
		destroy.play();
		shotOneX = tankOneX + 37 + tubeWidth * Math.cos(tankOneAngle * Math.PI / 180);
		shotOneY = tankOneY - tubeWidth * Math.sin(tankOneAngle * Math.PI / 180);
		tankOneFire = false;
		move = true;
		angle = true;
		power = true;
		playerActive = 2;

		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			gameOver = true;
		}
	}

	hitY1 = y2 + ((y3 - y2) * (mountainHitTankOneX - x2) / (x3 - x2));
	hitY2 = (3 * mountainHitTankOneX - 81150) / 175;
	if (((mountainHitTankOneX >= 650 && mountainHitTankOneX <= 950) && ((hitY1 - mountainHitTankOneY) < 20)) || ((mountainHitTankOneX >= 950 && mountainHitTankOneX <= 1115) && ((hitY2 + mountainHitTankOneY) > 5))) { 
		shotOneX = tankOneX + 37 + tubeWidth * Math.cos(tankOneAngle * Math.PI / 180);
		shotOneY = tankOneY - tubeWidth * Math.sin(tankOneAngle * Math.PI / 180);
		tankOneFire = false;
		move = true;
		angle = true;
		power = true;
		playerActive = 2;
		
		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			gameOver = true;
		}
	}

	hitY1 = y1 + ((y2 - y1) * (mountainHitTankOneX - x1) / (x2 - x1));
	hitY2 = (-33 * mountainHitTankOneX + 124350) / 247;
	if (((mountainHitTankOneX >= 400 && mountainHitTankOneX <= 650) && ((hitY1 - mountainHitTankOneY) < 20)) || ((mountainHitTankOneX >= 153 && mountainHitTankOneX <= 400) && ((hitY2 - mountainHitTankOneY) < 20))) {

		shotOneX = tankOneX + 37 + tubeWidth * Math.cos(tankOneAngle * Math.PI / 180);
		shotOneY = tankOneY - tubeWidth * Math.sin(tankOneAngle * Math.PI / 180);
		tankOneFire = false;
		move = true;
		angle = true;
		power = true;
		playerActive = 2;

		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			
			gameOver = true;
		}
	}
	if(shotOneX > canvas.clientWidth || shotOneY > canvas.clientHeight){
		shotOneX = tankOneX + 37 + tubeWidth * Math.cos(tankOneAngle * Math.PI / 180);
		shotOneY = tankOneY - tubeWidth * Math.sin(tankOneAngle * Math.PI / 180);
		tankOneFire = false;
		move = true;
		angle = true;
		power = true;
		playerActive = 2;

		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			
			gameOver = true;
		}
	}

}

function missileCheckTwo() {
	if (((mountainHitTankTwoX >= tankOneX) && (mountainHitTankTwoX <= tankOneX + tankWidth + 10)) && ((mountainHitTankTwoY >= tankOneY - 8) && (mountainHitTankTwoY <= tankOneY + tankHeight))) {//condition if the missile/shot hits the tank
		destroy.play();
		playerTwoScore += 5;
		shotTwoX = tankTwoX - 0.5 * tubeWidth * Math.cos(Angle);
		shotTwoY = tankTwoY - tubeWidth * Math.sin(Angle);
		tankTwofire = false;
		move = true;
		angle = true;
		power = true;
		playerActive = 1;

		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			gameOver = true;
		}
	}

	hitY1 = y1 + ((y2 - y1) * (mountainHitTankTwoX - x1) / (x2 - x1));
	hitY2 = (-33 * mountainHitTankTwoX + 124350) / 247;
	if (((mountainHitTankTwoX >= 400 && mountainHitTankTwoX <= 650) && ((hitY1 - mountainHitTankTwoY) < 5)) || ((mountainHitTankTwoX >= 153 && mountainHitTankTwoX <= 400) && ((hitY2 - mountainHitTankTwoY) < 2))) {//condition if the missile/shot hits the left hill 

		shotTwoX = tankTwoX - 0.5 * tubeWidth * Math.cos(Angle);
		shotTwoY = tankTwoY - tubeWidth * Math.sin(Angle);

		tankTwofire = false;
		move = true;
		angle = true;
		power = true;
		playerActive = 1;
		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			gameOver = true;
		}
	}

	hitY1 = y2 + ((y3 - y2) * (mountainHitTankTwoX - x2) / (x3 - x2));
	hitY2 = (3 * mountainHitTankTwoX - 81150) / 175;
	if (((mountainHitTankTwoX >= 650 && mountainHitTankTwoX <= 950) && ((hitY1 - mountainHitTankTwoY) < 5)) || ((mountainHitTankTwoX >= 950 && mountainHitTankTwoX <= 1115) && ((hitY2 + mountainHitTankTwoY) > 5))) {//condition if the missile/shot hits the right hill
		shotTwoX = tankTwoX - 0.5 * tubeWidth * Math.cos(Angle);
		shotTwoY = tankTwoY - tubeWidth * Math.sin(Angle);
		tankTwofire = false;
		move = true;
		angle = true;
		power = true;
		playerActive = 1;

		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			gameOver = true;
		}
	}
	if(shotTwoX < 0 || shotTwoY > canvas.clientHeight){
		shotTwoX = tankTwoX - 0.5 * tubeWidth * Math.cos(Angle);
		shotTwoY = tankTwoY - tubeWidth * Math.sin(Angle);
		tankTwofire = false;
		move = true;
		angle = true;
		power = true;
		playerActive = 1;

		if (tankOneBullets == 0 && tankTwoBullets == 0) {
			gameOver = true;
		}
	}
}
 
function checkStorageData()
{
	if (typeof(Storage) !== "undefined") 
	{ 
		bestScore=localStorage.getItem("score");
		if(bestScore===undefined)
        localStorage.setItem("score",0);
		console.log("LOCAL Storage score is :"+bestScore);
	}
	else
	window.alert("Sorry, your browser does not support Web Storage...");
}

function findBestScore()
{
	if(playerOneScore>=playerTwoScore && playerOneScore>=bestScore)
		{
			bestScore=playerOneScore;
		}
		else if(playerTwoScore>=bestScore)
		{
			 bestScore=playerTwoScore;
		}
}

 function updateBestScore()
 {
	if(bestScore!=0)
	{
		if (typeof(Storage) !== "undefined") {
			// Store the data
			localStorage.setItem("score",bestScore);
			// Retrieve the data
			bestScore= localStorage.getItem("score");
			console.log("Updated best score is:"+bestScore);
		  } else {
			window.alert("Sorry, your browser does not support Web Storage...");
		  }  
	}
	else 
	{
		if(playerOneScore>=playerTwoScore)
		bestScore=playerOneScore;
		else
		bestScore=playerTwoScore;
		console.log("Updated best score with zero:"+bestScore);
	}
 }
 
 function findWinner()
 {
	 if(playerOneScore==playerTwoScore)
	 cx.fillText("This is just the beginning!",440,230);
	 else if(playerOneScore>playerTwoScore)
	 cx.fillText(playerOneName+" Wins!",500,240);
	 else
	 cx.fillText(playerTwoName+" Wins!",500,240);
	  
 }

 function scoreCard()
{
	cx.beginPath();
	cx.lineWidth = "6";
	cx.strokeStyle = "red";
	cx.fillStyle="#000000";
	cx.fillRect(400,100, 400,350);
	cx.fillStyle = "#fff";
	cx.font="bold 70px warFont";
	cx.fillText("Game Over!",435,170);
	let firstplayer= localStorage.getItem("playerOneName");
	let secondplayer=localStorage.getItem("playerTwoName");
	if(firstplayer==null && secondplayer==null)
	{
		localStorage.setItem("playerOneName","Player-1");
		localStorage.setItem("playerTwoName","Player-2");
	}
	if( localStorage.getItem("playerOneName")===null)
	localStorage.setItem("playerOneName","Player-1");
	if(localStorage.getItem("playerTwoName")===null)
	localStorage.setItem("playerTwoName","Player-2");
	cx.font="bold 32px Roboto";
	checkStorageData();
	findBestScore();
	updateBestScore();
	findWinner();
	cx.fillText("Best Score: "+bestScore,500,280);
	cx.fillText(localStorage.getItem("playerOneName")+" : "+playerOneScore,500,320);
	cx.fillText(localStorage.getItem("playerTwoName")+" : "+playerTwoScore,500,370);
	cx.fillText("Press R to replay E to Exit",406,435);
	cx.stroke();
}
let showWind = false;

function animation() {
	cx.drawImage(background, 0, 0, width, height);
	drawMountain();
	drawTurret1();
	drawTurret2();
	cx.drawImage(tankOneImg, tankOneX, tankOneY, tankWidth, tankHeight);
	cx.drawImage(tankTwoImg, tankTwoX, tankTwoY, tankWidth, tankHeight);
	cx.font = "bold 32px Trebuchet MS";
	cx.fillStyle = "#fff";
	if( localStorage.getItem("playerOneName")===null)
	localStorage.setItem("playerOneName","Player-1");
	if(localStorage.getItem("playerTwoName")===null)
	localStorage.setItem("playerTwoName","Player-2");
	cx.fillText(localStorage.getItem("playerOneName")+" : "+playerOneScore, 30, 100);
	cx.fillText(localStorage.getItem("playerTwoName")+" : "+playerTwoScore, 1180, 100);
	if(playerActive == 1){
		if(showWind == false){
			wind = getWind();
			showWind = true;
			powerOne += wind;
		}
		let arrow = "<-"; 
		let windValue = Math.round(wind * 100);
		if(windValue > 0){
			arrow = "->";
		}
		cx.fillText("Wind: "+ Math.abs(windValue)+"Km/hr"+arrow, 600,100);
		if(tankOnePower <= 1.5 && tankOnePower > 0){
			cx.fillStyle = "#f8e604";
		}else if(tankOnePower <= 1.8  && tankOnePower > 1.5){
			cx.fillStyle = "#f87b05";
		}else if(tankOnePower <= 2.1 && tankOnePower > 1.8){
			cx.fillStyle = "#ff4f00";
		}else if(tankOnePower <= 2.3 && tankOnePower > 2.1){
			cx.fillStyle = "#ff3800";
		}else if(tankOnePower > 2.3){
			cx.fillStyle = "#f60404"
		} 
		cx.fillRect(tankOneX + 10, tankOneY - 50, 25, -tankOnePower * 50);
	}else if(playerActive == 2){
		if(showWind == false){
			wind = getWind();
			showWind = true;
			powerTwo += wind;
		}		
		let arrow = "<-"; 
		let windValue = Math.round(wind * 100);
		if(windValue > 0){
			arrow = "->";
		}
		cx.fillText("Wind: "+ Math.abs(windValue)+"Km/hr"+arrow, 600,100);
		if(tankTwoPower <= 1.5 && tankTwoPower > 0){
			cx.fillStyle = "#f8e604";
		}else if(tankTwoPower <= 1.8  && tankTwoPower > 1.5){
			cx.fillStyle = "#f87b05";
		}else if(tankTwoPower <= 2.1 && tankTwoPower > 1.8){
			cx.fillStyle = "#ff4f00";
		}else if(tankTwoPower <= 2.3 && tankTwoPower > 2.1){
			cx.fillStyle = "#ff3800";
		}else if(tankTwoPower > 2.3){
			cx.fillStyle = "#f60404"
		} 
		cx.fillRect(tankTwoX + 60, tankTwoY - 50, 25, -tankTwoPower * 50);
	}
	if (tankOneFire == true) {
		cx.drawImage(shotOneImg, shotOneX, shotOneY, shotWidth, shotHeight);
		time = time + inc;
		shotOneX = shotOneX + velocityx * inc * powerOne * 1.19;
		shotOneY = shotOneY + velocityy * inc * bounce1;
		if (shotOneX < 650 * Math.cos(tankOneAngle * Math.PI / 180)) {
			if (tankOneAngle <= 15) {
				velocityy = velocityy + gravity * inc * 0.2;
				bounce1 = 1;
			}
			else if (tankOneAngle > 15 && tankOneAngle <= 25) {
				velocityy = velocityy + gravity * inc * 0.11;
				bounce1 = 1.4;
			}
			else if (tankOneAngle > 25 && tankOneAngle <= 35) {
				velocityy = velocityy + gravity * inc * 0.03;
				bounce1 = 1.4;
			}
			else if (tankOneAngle > 35 && tankOneAngle <= 42) {
				velocityy = velocityy + gravity * inc * 0.01;
				bounce1 = 1.4;
			}
			else {
				velocityy = velocityy - gravity * inc * 0.00001;
				bounce1 = 1.4;
			}
		}
		else {
			velocityy = velocityy + gravity * inc * 0.1;
		}
		velocityx = velocityx;
		velocityy = velocityy + gravity * inc * 0.01;
		mountainHitTankOneX = shotOneX;
		mountainHitTankOneY = shotOneY;
		missileCheckOne(); 
	}
	if (tankTwofire == true) {
		cx.drawImage(shotTwoImg, shotTwoX, shotTwoY - 5, shotWidth, shotHeight);
		time = time + inc;
		shotTwoX = shotTwoX - velocityx * inc * powerTwo;
		shotTwoY = shotTwoY + velocityy * inc * bounce2;
		if(shotTwoX < canvas.clientWidth && shotTwoX > 0){
			if (shotTwoX > 650 * Math.cos(Angle)) {
				velocityy = velocityy + gravity * inc * 0.04;
				if (tankTwoAngle <= 15) {
					velocityy = velocityy + gravity * inc * 0.2;
					bounce2 = 1;
				}
				else if (tankTwoAngle > 15 && tankTwoAngle <= 25) {
					velocityy = velocityy + gravity * inc * 0.11;
					bounce2 = 1.2;
				}
				else if (tankTwoAngle > 25 && tankTwoAngle <= 35) {
					velocityy = velocityy + gravity * inc * 0.03;
					bounce2 = 1.25;
				}
				else if (tankTwoAngle > 35 && tankTwoAngle <= 42) {
					velocityy = velocityy + gravity * inc * 0.015;
					bounce2 = 1.25;
				}
				else {
					bounce2 = 1.3;
				}
			}
			else {
				velocityy = velocityy + gravity * inc * 0.1;
			}
		}
		velocityx = velocityx;
		velocityy = velocityy + gravity * inc * 0.01;
		mountainHitTankTwoX = shotTwoX;
		mountainHitTankTwoY = shotTwoY;
		missileCheckTwo();
	}
	if (gameOver == true) {
		gameOverMusic.play();		
		scoreCard();	
	}
	requestAnimationFrame(animation);
}



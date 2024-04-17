var mainObj = new Main();
let shooterBubble;
let score=0;
let timerInterval;
let timerDisplay = document.getElementById('timmerDisplay');
let gameStarted = false;

window.onload = function() {
    let canvasFrame = document.getElementById("myCanvas");
    let context = canvasFrame.getContext('2d');
   // mainObj.createBubble(context);
   // mainObj.createShooterBubble(context);
};

function Main(){
  this.startTimer=startTimer;
  this.updateTimerDisplay=updateTimerDisplay;
  this.createBubble=createBubble;
  this.createShooterBubble=createShooterBubble;
  this.generateRandomColor=generateRandomColor;
  this.closePopup=closePopup;
  this.initializeGame=initializeGame;
  //this.gameLoop=gameLoop;

function closePopup(){
  let popup=document.getElementById('popupDiv');
  popup.style.display='none';
  let losePopupDiv=document.getElementById('losePopupDiv');
   losePopupDiv.style.display='none';
  //initializeGame();
  timerDisplay.innerHTML='0:00';
  context.clearRect(0, 0, canvasFrame.width, canvasFrame.height);
  bubbles=[];
  score=0;
  displayScore(score);
  //canvasFrame.removeEventListener('mousemove');
  //canvasFrame.removeEventListener('mousemove');
  // canvasFrame.removeEventListener('click');
}

function displayWinAlert(score){
	console.log("winalertttt");
   let popup=document.getElementById('popupDiv');
   let winAlertScore=document.getElementById('winAlertScore');
   winAlertScore.innerHTML=score;
   popup.style.display='block';
   clearInterval(timerInterval);
   gameStarted=false;
  // canvasFrame.removeEventListener('mousemove');
   //canvasFrame.removeEventListener('click');
}

function displayLoseAlert(score){
    console.log(score,"score");
  let losePopupDiv=document.getElementById('losePopupDiv');
   let loseAlertScore=document.getElementById('loseAlertScore');
   loseAlertScore.innerHTML=score;
   losePopupDiv.style.display='block';
   clearInterval(timerInterval);
   gameStarted=false;
 //  canvasFrame.removeEventListener('mousemove');
 //  canvasFrame.removeEventListener('click');
}

const targetTimeInSeconds = 200;

function updateTimerDisplay(seconds) {
	
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.innerHTML = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


function startTimer() {
    let currentTime = targetTimeInSeconds;
    updateTimerDisplay(currentTime);

     timerInterval = setInterval(() => {
        currentTime--;
        updateTimerDisplay(currentTime);

        if (currentTime <= 0) {
            clearInterval(timerInterval);
            displayLoseAlert(score);
           // initializeGame();
            
        }
    }, 1000);
 }

 function displayScore(score){
   let scoreBoard = document.getElementById("scoreBoard");
      scoreBoard.innerHTML = score;
 }
 

let canvasFrame = document.getElementById("myCanvas");
let context = canvasFrame.getContext('2d');
let bubbles = []; 
let startBtn=document.getElementById("startBtn");


startBtn.addEventListener('click', function() {
	
    // Start the game
    initializeGame();

   
    
});


function initializeGame() {
    gameStarted=true;
    closePopup();
    context.clearRect(0, 0, canvasFrame.width, canvasFrame.height);

    
    score = 0;
    displayScore(score);

    bubbles = [];
    mainObj.createBubble(context);
 
    mainObj.createShooterBubble(context);
	mainObj.startTimer();
}


function createBubble(context) {
    const numRows = 4; 
    const numColumns = 14; 
    const bubbleRadius = 20; 
    const bubbleGap = 6;

    let colors = ['red', 'green', 'blue', 'yellow'];

   // shuffleArray(colors); /
    
     const startX = canvasFrame.width-625;
   
    for (let row = 0; row < numRows; row++) {
        const y = bubbleRadius + row * (2 * bubbleRadius + bubbleGap); 
        let startIndex = row % colors.length; 
		
       
        for (let col = 0; col < numColumns; col++) {
            const x = startX + col * (2 * bubbleRadius + bubbleGap); 

            
            context.beginPath();
            context.arc(x, y, bubbleRadius, 0, Math.PI * 2);
			 const color = generateRandomColor(); 
            context.fillStyle = color; 
            
            context.fill();
            context.closePath();

          
            bubbles.push({ x, y, radius: bubbleRadius, color});
        }
    }
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateRandomColor() {
    const colors = ['red', 'green', 'blue', 'yellow']; 
    return colors[Math.floor(Math.random() * colors.length)];
}




function createShooterBubble(context) {
    const bubbleRadius = 20;
    const shooterX = canvasFrame.width / 2; 
    const shooterY = canvasFrame.height - bubbleRadius; 

   
    context.beginPath();
    context.arc(shooterX, shooterY, bubbleRadius, 0, Math.PI * 2);
  
    const color = generateRandomColor(); 
    context.fillStyle = color; 
    context.fill();
    context.closePath();
	const borderWidth = 4; 
    context.lineWidth = borderWidth;
    context.strokeStyle = 'white'; 
    context.stroke(); 

   
    const arrowWidth = 10;
    const arrowHeight = 20;
    context.beginPath();
    context.moveTo(shooterX + arrowWidth / 2, shooterY - bubbleRadius - arrowHeight);
    context.lineTo(shooterX - arrowWidth / 2, shooterY - bubbleRadius - arrowHeight); 
    context.lineTo(shooterX, shooterY - bubbleRadius); 
    context.closePath();
    context.fillStyle = 'white';
    context.fill();

   
    shooterBubble = { x: shooterX, y: shooterY, radius: bubbleRadius, color:color ,speed: 5};
}


 


canvasFrame.addEventListener('mousemove', function(event) {
    if (!gameStarted) {
        return;
    }
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    
    context.clearRect(0, 0, canvasFrame.width, canvasFrame.height);

    
    bubbles.forEach(bubble => {
        context.beginPath();
        context.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        context.fillStyle = bubble.color;
        context.fill();
        context.closePath();
    });
      
   
    context.beginPath();
    context.moveTo(shooterBubble.x, shooterBubble.y);
    context.lineTo(mouseX, mouseY);
    context.strokeStyle = 'rgba(255, 99, 71, 0.4)';
    context.stroke();
    context.closePath();

	context.beginPath();
    context.arc(shooterBubble.x, shooterBubble.y, shooterBubble.radius, 0, Math.PI * 2);
    context.fillStyle = shooterBubble.color;
    context.fill();
    context.closePath();

	
});



canvasFrame.addEventListener('click', function(event) {
    if (!gameStarted) {
        return;
    }

	if(bubbles.length <= 1){
	 displayWinAlert(score);
	 redrawCanvas();
	 score=0;
	 }
     let clickedBubble = null;

   

    // Check if there are any bubbles directly below the clicked position
    const isBubbleBelowClickedPosition = bubbles.some(bubble =>
        bubble.y > event.offsetY &&
        Math.abs(bubble.x - event.offsetX) <= bubble.radius
    );

    // If there are bubbles directly below the clicked position, prevent selection in the upper row
    if (isBubbleBelowClickedPosition && event.offsetY < canvasFrame.height / 2) {
        event.preventDefault();
       alert("Cannot click on upper row bubbles if there are bubbles directly below");
        return;
    }
    

    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];
        const distance = Math.sqrt((bubble.x - event.offsetX) ** 2 + (bubble.y - event.offsetY) ** 2);
        if (distance <= bubble.radius) {
            clickedBubble = bubble;
            break;
        }
    }
    
    function areAdjacentAndSameColor(bubble1, bubble2) {

    const dx = bubble1.x - bubble2.x;
    const dy = bubble1.y - bubble2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= checkDistanceAround && bubble1.color === bubble2.color;

     }
	 
	const checkDistanceAround = 60;
     // console.log(bubbles);
     console.log("bubble",bubbles.length)

     

    if (clickedBubble) {
		

        console.log(clickedBubble.color, "Clicked on color bubble");
        console.log(shooterBubble.color, "Clicked on color shooterbubble");
		// moveShooterBubbleToward(clickedBubble);
        //-----------------------------------------------------------------Color matched--------------------------------------
        if (clickedBubble.color === shooterBubble.color) {
            console.log("Colors match");        
            // Check if there are at least three adjacent bubbles of the same color

            const sameColorAdjacentBubbles = bubbles.filter(bubble => {        
                return areAdjacentAndSameColor(clickedBubble, bubble);
            });
                
        
            if (sameColorAdjacentBubbles.length >= 2) {
                score += 200;
                displayScore(score);
                bubbles = bubbles.filter(bubble => {            
                    return !areAdjacentAndSameColor(clickedBubble, bubble);
                });
                redrawCanvas();
            } else {
                // If there are less than three adjacent bubbles of the same color, place the shooter bubble at the clicked position
                const newBubble = {
                    x: clickedBubble.x,
                    y: clickedBubble.y + clickedBubble.radius + 2 + shooterBubble.radius,
                    radius: shooterBubble.radius,
                    color: shooterBubble.color 
                };
                bubbles.push(newBubble);
                redrawCanvas();
            }
        } else {
            console.log("Colors don't match");
        
            let adjacentBubble = null;
            for (let i = 0; i < bubbles.length; i++) {
                const bubble = bubbles[i];
                if (bubble !== clickedBubble) {
                    const distance = Math.sqrt((bubble.x - clickedBubble.x) ** 2 + (bubble.y - clickedBubble.y) ** 2);
                    if (distance <= bubble.radius * 2) {
                        adjacentBubble = bubble;
                        break;
                    }
                }
            }
        
            if (adjacentBubble) {
                const adjacentX = adjacentBubble.x;
                const adjacentY = adjacentBubble.y + 2 * adjacentBubble.radius + shooterBubble.radius; // Adjust as needed
                const newBubble = {
                    x: adjacentX,
                    y: adjacentY,
                    radius: shooterBubble.radius,
                    color: shooterBubble.color
                };
                bubbles.push(newBubble);
                redrawCanvas();
            } else {
                // If there are no adjacent bubbles, place the shooter bubble at some default position
                // Here, I'm placing it below the clicked bubble with a small gap
                const newBubble = {
                    x: clickedBubble.x,
                    y: clickedBubble.y + clickedBubble.radius + 2 + shooterBubble.radius,
                    radius: shooterBubble.radius,
                    color: shooterBubble.color 
                };
                bubbles.push(newBubble);
                redrawCanvas();
            }
        }
        
        

    }

	else {
        console.log("Clicked outside of any bubble");

       
        let nearestBubble = 0;
        let minDistance = 0;
        for (let i = 0; i < bubbles.length; i++) {
            const bubble = bubbles[i];
            const distance = Math.sqrt((bubble.x - event.offsetX) ** 2 + (bubble.y - event.offsetY) ** 2);
            if (distance < minDistance) {
                nearestBubble = bubble;
                minDistance = distance;
            }
        }
    
        if (nearestBubble) {
            const adjacentX = nearestBubble.x;
            const adjacentY = nearestBubble.y + 2 * nearestBubble.radius + shooterBubble.radius; 
            const newBubble = {
                x: adjacentX,
                y: adjacentY,
                radius: shooterBubble.radius,
                color: shooterBubble.color
            };
				console.log("if near");
            bubbles.push(newBubble);
        } else {

            const newBubble = {
                x: event.offsetX+2,
                y: event.offsetY+4,
                radius: shooterBubble.radius,
                color: shooterBubble.color
            };
				console.log("else near");
            bubbles.push(newBubble);
        }
    
        // Redraw canvas after adding the new bubble
        redrawCanvas();
    }
	createShooterBubble(context);
});



function redrawCanvas() {
    
    context.clearRect(0, 0, canvasFrame.width, canvasFrame.height);
    
    
    bubbles.forEach(bubble => {
        context.beginPath();
        context.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        context.fillStyle = bubble.color;
        context.fill();
        context.closePath();
    });

    createShooterBubble(context);
    // context.beginPath();
    // context.arc(shooterBubble.x, shooterBubble.y, shooterBubble.radius, 0, Math.PI * 2);
    // context.fillStyle = shooterBubble.color;
    // context.fill();
    // context.closePath();
}



            

}
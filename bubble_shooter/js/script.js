var mainObj = new Main();
let shooterBubble;
let score=0;
let timerInterval;
let timerDisplay = document.getElementById('timmerDisplay');
let gameStarted = false;


/*window.onload = function() {
    let canvasFrame = document.getElementById("myCanvas");
    let context = canvasFrame.getContext('2d');
  
};*/

function Main(){
  this.startTimer=startTimer;
  this.updateTimerDisplay=updateTimerDisplay;
  this.createBubble=createBubble;
  this.createShooterBubble=createShooterBubble;
  this.generateRandomColor=generateRandomColor;
  this.closePopup=closePopup;
  this.initializeGame=initializeGame;
  this.mainPopup=mainPopup;
  this.displayWinAlert=displayWinAlert;
  this.exitBtn=exitBtn;
 // this.displayLoseAlert=displayLoseAlert;
  //this.displayScore=displayScore;
  //ths.gameLoop=gameLoop;

function mainPopup(){
let mainPopupDiv=document.getElementById('mainPopup');
mainPopupDiv.style.display='none';
}

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
  
}

function displayWinAlert(score){
	 bubbles=[];
   let popup=document.getElementById('popupDiv');
   let winAlertScore=document.getElementById('winAlertScore');
   winAlertScore.innerHTML=score;
   popup.style.display='block';
   clearInterval(timerInterval);
   gameStarted=false;
   let level = document.getElementById('selectDrop');
  level.value = "";
 
}

function displayLoseAlert(score){
    console.log(score,"score");
  let losePopupDiv=document.getElementById('losePopupDiv');
   let loseAlertScore=document.getElementById('loseAlertScore');
   loseAlertScore.innerHTML=score;
   losePopupDiv.style.display='block';
   clearInterval(timerInterval);
   gameStarted=false;
   let level = document.getElementById('selectDrop');
  level.value = "";
 
}

function exitBtn(){
let mainPopupDiv=document.getElementById('mainPopup');
 mainPopupDiv.style.display='block';
let losePopupDiv=document.getElementById('losePopupDiv');
   losePopupDiv.style.display='none';
   timerDisplay.innerHTML='0:00';
  context.clearRect(0, 0, canvasFrame.width, canvasFrame.height);
  bubbles=[];
  score=0;
  displayScore(score);
  let level = document.getElementById('selectDrop');
  level.value = "";
 
 
}

//let level=document.getElementById('selectDrop').value;
//console.log(level,"level");

//const targetTimeSeconds = 180;

function updateTimerDisplay(seconds) {
	
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.innerHTML = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


function startTimer() {
	let level=document.getElementById('selectDrop').value;
    console.log(level,"level");
    let currentTime = level ? 120 : 200;
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
	clearInterval(timerInterval);
	mainObj.startTimer();
   
}


// Creating the upperside bubbles 
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
        //let startIndex = row % colors.length; 
		
       
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


// Creating the shooter bubbles 

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

   // Arrow on the bubble 
   // const arrowWidth = 10;
   // const arrowHeight = 20;
    context.beginPath();
    context.moveTo(325,600);
    context.lineTo(320,570); 
    context.lineTo(325,570); 
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
    context.strokeStyle = 'rgba(239, 246, 254 0.5)';
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

	if(bubbles.length <=0){
	 displayWinAlert(score);
	 redrawCanvas();
	 score=0;
	 return;
	 }
     let clickedBubble = null;

   
    // Check if there are any bubbles directly below the clicked position
    const isBubbleBelowClickedPosition = bubbles.some(bubble =>
        bubble.y > event.offsetY &&
        Math.abs(bubble.x - event.offsetX) <= bubble.radius
    );

    // If there are bubbles directly below the clicked position, not select upper bubble
    if (isBubbleBelowClickedPosition && event.offsetY < canvasFrame.height / 2) {
        event.preventDefault();
       console.log("Cannot click on upper row bubbles if there are bubbles directly below");
	   score -=200;
        return;
    }
    
    // Find the clicked bubble where the user clicked
    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];
        const distance = Math.sqrt((bubble.x - event.offsetX) ** 2 + (bubble.y - event.offsetY) ** 2);
        if (distance <= bubble.radius) {
            clickedBubble = bubble;
            break;
        }
    }

    //specified the distance 
    const checkDistanceAround = 60;
	//check they are adjacent and  have same color 
    function areAdjacentAndSameColor(bubble1, bubble2) {
    const dx = bubble1.x - bubble2.x;
    const dy = bubble1.y - bubble2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= checkDistanceAround && bubble1.color === bubble2.color;
     }
	 
	
   
    if (clickedBubble) {
		
       // console.log(clickedBubble.color, "Clicked on color bubble");
       // console.log(shooterBubble.color, "Clicked on color shooterbubble");
		
        //-----------------------------------------------------------------Color matched--------------------------------------
        if (clickedBubble.color === shooterBubble.color) {
            console.log("Colors match");        
            // Check if there are  three bubbles of the same color

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
                // If there are not three adjacent bubbles of the same color, place the shooter bubble at the clicked position
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
		else {
            console.log("Colors don't match");
        
            let adjacentBubble = null;

			//find the adjecent bubble to stick the shooter bubble
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
                const adjacentY = adjacentBubble.y + 2 * adjacentBubble.radius + shooterBubble.radius+4; 
                const newBubble = {
                    x: adjacentX,
                    y: adjacentY,
                    radius: shooterBubble.radius,
                    color: shooterBubble.color
                };
                console.log("not matche if");
                bubbles.push(newBubble);
                redrawCanvas();
            } else {

                // There are no adjacent bubbles, place the shooter bubble at clicked position 
                
                const newBubble = {
                    x: clickedBubble.x,
                    y: clickedBubble.y + clickedBubble.radius + 2 + shooterBubble.radius+5,
                    radius: shooterBubble.radius,
                    color: shooterBubble.color 
                };
                console.log("not matche else");
                bubbles.push(newBubble);
                redrawCanvas();
            }
        }
        
        

    }

	// else {
    //     console.log("Clicked outside of any bubble");
    //     // Find the nearest bubble of click position 
    //     let nearestBubble = 0;
    //     let minDistance = 0;
    //     for (let i = 0; i < bubbles.length; i++) {
    //         const bubble = bubbles[i];
    //         const distance = Math.sqrt((bubble.x - event.offsetX) ** 2 + (bubble.y - event.offsetY) ** 2);
    //         if (distance < minDistance) {
    //             nearestBubble = bubble;
    //             minDistance = distance;
    //         }
    //     }
    
    //     if (nearestBubble) {
    //         const adjacentX = nearestBubble.x;
    //         const adjacentY = nearestBubble.y + 2 * nearestBubble.radius + shooterBubble.radius+4; 
    //         const newBubble = {
    //             x: adjacentX,
    //             y: adjacentY,
    //             radius: shooterBubble.radius,
    //             color: shooterBubble.color
    //         };
    //         console.log("near ifff");
				
    //         bubbles.push(newBubble);
    //     } 
	// 	//  if not present then placed on clicked position
	// 	else {

    //         const newBubble = {
    //             x: event.offsetX+4,
    //             y: event.offsetY+10,
    //             radius: shooterBubble.radius,
    //             color: shooterBubble.color
    //         };
    //         console.log("else block");
    //         bubbles.push(newBubble);
    //     }

    
        
    //     redrawCanvas();
    // }
    else {
         console.log("Clicked outside of any bubble");
        // Find the nearest bubble of click position 
        let nearestBubble = null;
        let minDistance = Infinity;
        let overlap ;
        for (let i = 0; i < bubbles.length; i++) {
            const bubble = bubbles[i];
            const distance = Math.sqrt((bubble.x - event.offsetX) ** 2 + (bubble.y - event.offsetY) ** 2);
            if (distance < minDistance) {
                nearestBubble = bubble;
                minDistance = distance;
            }
        }
    
        if (nearestBubble) {
            // Calculate position adjacent to the nearest bubble
            const adjacentX = nearestBubble.x;
            const adjacentY = nearestBubble.y + 2 * nearestBubble.radius + shooterBubble.radius + 4; 
    
            // Check if the adjacent position overlaps with any existing bubble
             overlap = false;
            for (let i = 0; i < bubbles.length; i++) {
                const bubble = bubbles[i];
                const distance = Math.sqrt((bubble.x - adjacentX) ** 2 + (bubble.y - adjacentY) ** 2);
                if (distance < 40) {
                    overlap = true;
                    break;
                }
            }
    
            // If no overlap, place the bubble adjacent to the nearest bubble
            if (!overlap) {
                const newBubble = {
                    x: adjacentX,
                    y: adjacentY,
                    radius: shooterBubble.radius,
                    color: shooterBubble.color
                };
                //console.log("near ifff");
                bubbles.push(newBubble);
            }
        } 
        // If no nearest bubble found or there's an overlap, place the bubble at the clicked position
        if (!nearestBubble || overlap) {
            const newBubble = {
                x: event.offsetX ,
                y: event.offsetY +3,
                radius: shooterBubble.radius,
                color: shooterBubble.color
            };
            //console.log("else block");
            bubbles.push(newBubble);
        }
    
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
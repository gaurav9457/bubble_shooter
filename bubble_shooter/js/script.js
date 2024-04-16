var mainObj = new Main();
let shooterBubble;
let score=0;
window.onload = function() {
    let canvasFrame = document.getElementById("myCanvas");
    let context = canvasFrame.getContext('2d');
    mainObj.createBubble(context);
    mainObj.createShooterBubble(context);
};

function Main(){
  this.startTimer=startTimer;
  this.updateTimerDisplay=updateTimerDisplay;
  this.createBubble=createBubble;
  this.createShooterBubble=createShooterBubble;
  this.generateRandomColor=generateRandomColor;
  
  //this.gameLoop=gameLoop;

const targetTimeInSeconds = 90;

function updateTimerDisplay(seconds) {
	let timerDisplay = document.getElementById('timmerDisplay');
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.innerHTML = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


function startTimer() {
    let currentTime = targetTimeInSeconds;
    updateTimerDisplay(currentTime);

    const timerInterval = setInterval(() => {
        currentTime--;
        updateTimerDisplay(currentTime);

        if (currentTime <= 0) {
            clearInterval(timerInterval);
            //timerDisplay.innerHTML = 'Time\'s up!';
            
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

   
    const arrowWidth = 10;
    const arrowHeight = 20;
    context.beginPath();
    context.moveTo(shooterX + arrowWidth / 2, shooterY - bubbleRadius - arrowHeight);
    context.lineTo(shooterX - arrowWidth / 2, shooterY - bubbleRadius - arrowHeight); 
    context.lineTo(shooterX, shooterY - bubbleRadius); 
    context.closePath();
    context.fillStyle = 'black';
    context.fill();

   
    shooterBubble = { x: shooterX, y: shooterY, radius: bubbleRadius, color:color ,speed: 5};
}




function moveShooterBubbleToward(clickedBubble) {
    console.log("moveFun");
    const dx = clickedBubble.x - shooterBubble.x;
    const dy = clickedBubble.y - shooterBubble.y;

    
    const distance = Math.sqrt(dx ** 2 + dy ** 2);

    
    const unitX = dx / distance;
    const unitY = dy / distance;

   
    const speed = 3;

    
    shooterBubble.x += unitX * speed;
    shooterBubble.y += unitY * speed;

  
    //redrawCanvas();
	
	
}

canvasFrame.addEventListener('click', function(event) {
     let clickedBubble = null;

   //let clickedBubble = null;

    // Check if there are any bubbles directly below the clicked position
    const isBubbleBelowClickedPosition = bubbles.some(bubble =>
        bubble.y > event.offsetY &&
        Math.abs(bubble.x - event.offsetX) <= bubble.radius
    );

    // If there are bubbles directly below the clicked position, prevent selection in the upper row
    if (isBubbleBelowClickedPosition && event.offsetY < canvasFrame.height / 2) {
        event.preventDefault();
        console.log("Cannot click on upper row bubbles if there are bubbles directly below");
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
      console.log(bubbles);

     if(bubbles.length==1){
	 alert("Winner");
	 redrawCanvas();
	 score=0;

	 }

    if (clickedBubble) {
		

        console.log(clickedBubble.color, "Clicked on color bubble");
        console.log(shooterBubble.color, "Clicked on color shooterbubble");
        
        if (clickedBubble.color === shooterBubble.color) {
            console.log("Colors match");
           score += 200;
		   displayScore(score);
           // bubbles = bubbles.filter(bubble => bubble.color !== clickedBubble.color);
		   moveShooterBubbleToward(clickedBubble);

		 // setTimeout(function(){
		 // requestAnimationFrame(() =>console.log("animation"), moveShooterBubbleToward(clickedBubble));
		  //},2000);
		   
            bubbles = bubbles.filter(bubble => {
              return !areAdjacentAndSameColor(clickedBubble, bubble);
         });
            redrawCanvas();

        }
		
               

		else {
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
				//createShooterBubble(context, clickedBubble);
            } else {
               
                const newBubble = {
                    x: clickedBubble.x,
                    y: clickedBubble.y + clickedBubble.radius + shooterBubble.radius,
                    radius: shooterBubble.radius,
                    color: shooterBubble.color 
                };
                bubbles.push(newBubble);
            }
            redrawCanvas();
        }

    }
	else {
        console.log("Clicked outside of any bubble");

       
       let nearestBubble = null;
        let minDistance = Infinity;
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
           // moveShooterBubbleTowards(clickedBubble);
            const newBubble = {
                x: adjacentX,
                y: adjacentY,
                radius: shooterBubble.radius,
                color: shooterBubble.color
            };
            bubbles.push(newBubble);
        } else {
          
            const newBubble = {
                x: event.offsetX,
                y: event.offsetY,
                radius: shooterBubble.radius,
                color: shooterBubble.color
            };
            bubbles.push(newBubble);
        }
    }
	createShooterBubble(context);
});

/*canvasFrame.addEventListener('click', function(event) {
    let clickedBubble = null;

    // Check if the click event occurred on any bubble
    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];
        const distance = Math.sqrt((bubble.x - event.offsetX) ** 2 + (bubble.y - event.offsetY) ** 2);
        if (distance <= bubble.radius) {
            clickedBubble = bubble;
            break;
        }
    }

    if (clickedBubble) {
        console.log(clickedBubble.color, "Clicked on color bubble");
        console.log(shooterBubble.color, "Clicked on color shooterbubble");
        
        if (clickedBubble.color === shooterBubble.color) {
    console.log("Colors match");
    // Find adjacent bubbles with the same color
    const adjacentSameColorBubbles = bubbles.filter(bubble =>
        bubble !== clickedBubble &&
        bubble.color === clickedBubble.color &&
        Math.sqrt((bubble.x - clickedBubble.x) ** 2 + (bubble.y - clickedBubble.y) ** 2) <= bubble.radius * 2
    );

    // Remove the adjacent bubbles with the same color
    for (const bubbleToRemove of adjacentSameColorBubbles) {
        bubbles = bubbles.filter(bubble => bubble !== bubbleToRemove);
    }

    // Redraw the canvas without the removed bubbles
    redrawCanvas();
} else {
            console.log("Colors don't match");
            let adjacentBubble = null;
            // Check if there's any bubble adjacent to the clicked bubble
            for (let i = 0; i < bubbles.length; i++) {
                const bubble = bubbles[i];
                if (bubble !== clickedBubble) {
                    const distance = Math.sqrt((bubble.x - clickedBubble.x) ** 2 + (bubble.y - clickedBubble.y) ** 2);
                    if (distance <= bubble.radius * 2) { // Adjust the radius multiplier as needed
                        adjacentBubble = bubble;
                        break;
                    }
                }
            }

            if (adjacentBubble) {
                // Place the new bubble adjacent to the adjacent bubble
                const adjacentX = adjacentBubble.x;
                const adjacentY = adjacentBubble.y + 2 * adjacentBubble.radius + shooterBubble.radius; // Adjust as needed
                
                const newBubble = {
                    x: adjacentX,
                    y: adjacentY,
                    radius: shooterBubble.radius,
                    color: shooterBubble.color
                };
                bubbles.push(newBubble);
            } else {
                // Place the new bubble adjacent to the clicked bubble
                const newBubble = {
                    x: clickedBubble.x,
                    y: clickedBubble.y + clickedBubble.radius + shooterBubble.radius,
                    radius: shooterBubble.radius,
                    color: shooterBubble.color 
                };
                bubbles.push(newBubble);
            }
            redrawCanvas();
        }
    } else {
        console.log("Clicked outside of any bubble");

        // Place the new bubble at the clicked position
        const newBubble = {
            x: event.offsetX,
            y: event.offsetY,
            radius: shooterBubble.radius,
            color: shooterBubble.color
        };
        bubbles.push(newBubble);
      
        redrawCanvas();
    }
	createShooterBubble(context);
});*/





function redrawCanvas() {
    
    context.clearRect(0, 0, canvasFrame.width, canvasFrame.height);
    
    
    bubbles.forEach(bubble => {
        context.beginPath();
        context.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        context.fillStyle = bubble.color;
        context.fill();
        context.closePath();
    });

    
    context.beginPath();
    context.arc(shooterBubble.x, shooterBubble.y, shooterBubble.radius, 0, Math.PI * 2);
    context.fillStyle = shooterBubble.color;
    context.fill();
    context.closePath();
}






    

            

}
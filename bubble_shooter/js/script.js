var mainObj = new Main();
window.onload = function() {
    let canvasFrame = document.getElementById("myCanvas");
    let context = canvasFrame.getContext('2d');
    mainObj.createBubble(context);
    mainObj.createShooterBubble(context, generateRandomColor());
};
function Main(){
  this.startTimer=startTimer;
  this.updateTimerDisplay=updateTimerDisplay;
  this.createBubble=createBubble;
  this.createShooterBubble=createShooterBubble;
  this.generateRandomColor=generateRandomColor;
  //this.gameLoop=gameLoop;

const targetTimeInSeconds = 120;

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

let canvasFrame = document.getElementById("myCanvas");
let context = canvasFrame.getContext('2d');
let bubbles = []; // Initialize the bubbles array

canvasFrame.addEventListener('click', function(event) {
    // Check if shooter bubble exists
    if (shooterBubble) {
        // Loop through bubbles to check for collision with shooter bubble
        for (let i = 0; i < bubbles.length; i++) {
            const bubble = bubbles[i];
            // Calculate distance between shooter bubble and current bubble
            const distance = Math.sqrt((bubble.x - shooterBubble.x) ** 2 + (bubble.y - shooterBubble.y) ** 2);
            // Check if shooter bubble collides with current bubble
            if (distance <= shooterBubble.radius + bubble.radius) {
                // Check if colors match
                if (bubble.color === shooterBubble.color) {
                    // Remove collided bubble from the array
                    bubbles.splice(i, 1);
                    // Generate a new shooter bubble at the bottom with a random color
                    createShooterBubble(context, generateRandomColor());
                }
                // Exit the loop after shooting
                break;
            }
        }
    }
});


function createBubble(context) {
    const numRows = 4; // Number of rows
    const numColumns = 15; // Number of bubbles in a row
    const bubbleRadius = 20; // Radius of each bubble
    const bubbleGap = 6; // Gap between bubbles

    let colors = ['red', 'green', 'blue', 'yellow']; // Colors for the bubbles

    shuffleArray(colors); // Shuffle the colors array

    const startX = (canvasFrame.width - (numColumns * (2 * bubbleRadius + bubbleGap))) / 2; // Starting x-coordinate for the first bubble

    // Loop to create bubbles in each row
    for (let row = 0; row < numRows; row++) {
        const y = bubbleRadius + row * (2 * bubbleRadius + bubbleGap); // Calculate y-coordinate for each row
        let startIndex = row % colors.length; // Start index for the color in each row

        // Loop to create bubbles in a row
        for (let col = 0; col < numColumns; col++) {
            const x = startX + col * (2 * bubbleRadius + bubbleGap); // Calculate x-coordinate for each bubble

            // Draw the bubble
            context.beginPath();
            context.arc(x, y, bubbleRadius, 0, Math.PI * 2);
            context.fillStyle = colors[(startIndex + col) % colors.length]; // Set color based on the index
            context.fill();
            context.closePath();

            // Store bubble data if needed
            bubbles.push({ x, y, radius: bubbleRadius, color: colors[(startIndex + col) % colors.length] });
        }
    }
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function generateRandomColor() {
    const colors = ['red', 'green', 'blue', 'yellow']; // Colors for the bubbles
    return colors[Math.floor(Math.random() * colors.length)];
}

function createShooterBubble(context) {
    const bubbleRadius = 20;
    const shooterX = canvasFrame.width / 2; // X-coordinate for the shooter bubble
    const shooterY = canvasFrame.height - bubbleRadius; // Y-coordinate for the shooter bubble

    // Draw the shooter bubble
    context.beginPath();
    context.arc(shooterX, shooterY, bubbleRadius, 0, Math.PI * 2);
    context.fillStyle = color; // Set color for the shooter bubble
    context.fill();
    context.closePath();

    // Draw direction arrow (triangle)
    const arrowWidth = 10;
    const arrowHeight = 20;
    context.beginPath();
    context.moveTo(shooterX - arrowWidth / 2, shooterY - bubbleRadius - arrowHeight); // Top-left corner
    context.lineTo(shooterX + arrowWidth / 2, shooterY - bubbleRadius - arrowHeight); // Top-right corner
    context.lineTo(shooterX, shooterY - bubbleRadius); // Bottom corner (center of the shooter bubble)
    context.closePath();
    context.fillStyle = color; // Set color for the arrow (same as shooter bubble)
    context.fill();

    // Store shooter bubble data
    shooterBubble = { x: shooterX, y: shooterY, radius: bubbleRadius, color: color };
}

    

            

}
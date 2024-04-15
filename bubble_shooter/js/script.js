var mainObj = new Main();

function Main(){
  this.startTimer=startTimer;
  this.updateTimerDisplay=updateTimerDisplay;

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


}
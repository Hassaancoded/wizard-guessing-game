let guess = Math.floor(Math.random() * 100) + 1;
let turns = 5;
let wrongGuesses = 0;
let finalGuessMode = false;

const wizard = document.getElementById('wizard');
const message = document.getElementById('message');
const turnsDisplay = document.getElementById('turns');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const hintBtn = document.getElementById('hintBtn');

function checkGuess() {
  const userGuess = parseInt(document.getElementById('userGuess').value);

  if (finalGuessMode) {
    if (userGuess === guess) {
      message.textContent = "🎉 You guessed it right in the final try!";
      wizard.className = 'happy';
      correctSound.play();
    } else {
      message.textContent = `❌ Nope! The number was ${guess}.`;
      wizard.className = 'sad';
      wrongSound.play();
    }
    return;
  }

  if (turns <= 0) {
    message.textContent = "🧙‍♂️ Now tell us what you think the number was!";
    finalGuessMode = true;
    return;
  }

  if (userGuess === guess) {
    message.textContent = "🎉 You got it! Great job!";
    wizard.className = 'happy';
    correctSound.play();
    turns = 0;
  } else {
    message.textContent = userGuess < guess ? "🔼 Try a bigger number!" : "🔽 Try a smaller number!";
    wizard.className = 'sad';
    wrongSound.play();
    turns--;
    wrongGuesses++;

    if (wrongGuesses >= 3) {
      hintBtn.style.display = 'inline-block';
    }
  }

  turnsDisplay.textContent = turns;

  if (turns === 0 && userGuess !== guess) {
    message.textContent = "🧙‍♂️ Now tell us what you think the number was!";
    finalGuessMode = true;
  }
}

function restartGame() {
  guess = Math.floor(Math.random() * 100) + 1;
  turns = 5;
  wrongGuesses = 0;
  finalGuessMode = false;
  document.getElementById('userGuess').value = '';
  message.textContent = '';
  wizard.className = '';
  turnsDisplay.textContent = turns;
  hintBtn.style.display = 'none';
}

function showHint() {
  const hints = [];
  if (guess % 5 === 0) hints.push("The number is divisible by 5.");
  if (guess > 40) hints.push("The number is greater than 40.");
  if (guess < 60) hints.push("The number is less than 60.");
  alert("🧙 Hint: " + hints[Math.floor(Math.random() * hints.length)]);
}

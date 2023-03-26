let word;
let wordDisplay = [];
let incorrectGuesses = 0;
let guessedLetters = [];

const wordDisplayElement = document.querySelector('#word');
const guessedLettersSpan = document.querySelector('#guessed-letters-span');
const hangmanSvg = document.querySelector('#hangman-svg');

// Fetch word from API
fetch('https://random-word-api.herokuapp.com/word?number=1')
	.then(response => response.json())
	.then(data => {
		word = data[0].toLowerCase();
		
		// Generate game board
		for (let i = 0; i < word.length; i++) {
			wordDisplay.push('_');
		}
		wordDisplayElement.textContent = wordDisplay.join(' ');
	})
	.catch(error => console.error(error));

// Update hangman graphic
function drawHangman() {
	if (incorrectGuesses === 1) {
		hangmanSvg.innerHTML = '<line x1="10" y1="190" x2="70" y2="190"></line>';
	} else if (incorrectGuesses === 2) {
		hangmanSvg.innerHTML += '<line x1="40" y1="190" x2="40" y2="10"></line>';
	} else if (incorrectGuesses === 3) {
		hangmanSvg.innerHTML += '<line x1="40" y1="10" x2="120" y2="10"></line>';
	} else if (incorrectGuesses === 4) {
		hangmanSvg.innerHTML += '<line x1="120" y1="10" x2="120" y2="30"></line>';
	} else if (incorrectGuesses === 5) {
		hangmanSvg.innerHTML += '<circle cx="120" cy="50" r="20"></circle>';
    } else if (incorrectGuesses === 6) {
    hangmanSvg.innerHTML += '<line x1="120" y1="70" x2="120" y2="130"></line>';
    hangmanSvg.innerHTML += '<line x1="120" y1="80" x2="90" y2="100"></line>';
    hangmanSvg.innerHTML += '<line x1="120" y1="80" x2="150" y2="100"></line>';
    hangmanSvg.innerHTML += '<line x1="120" y1="130" x2="90" y2="170"></line>';
    hangmanSvg.innerHTML += '<line x1="120" y1="130" x2="150" y2="170"></line>';
    }
    }
    
    // Check if guess is correct
    function checkGuess(guess) {
    if (word.includes(guess)) {
    for (let i = 0; i < word.length; i++) {
    if (word[i] === guess) {
    wordDisplay[i] = guess;
    }
    }
    wordDisplayElement.textContent = wordDisplay.join(' ');
    if (!wordDisplay.includes('_')) {
    alert('Congratulations, you won!');
    }
    } else {
    incorrectGuesses++;
    drawHangman();
    if (incorrectGuesses === 6) {
    alert('Sorry, you lost. The word was "' + word + '".');
    }
    }
    guessedLetters.push(guess);
    guessedLettersSpan.textContent = guessedLetters.join(', ');
    }
    
    // Event listener for user input
    document.addEventListener('keyup', event => {
        const letterPattern = /^[a-zA-Z]+$/; // Regular expression to check for alphabetic characters only
        if (event.key.match(letterPattern)) {
          const guess = event.key.toLowerCase();
          if (!guessedLetters.includes(guess)) {
            checkGuess(guess);
          }
        }
      });
      
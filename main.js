// Array of words
const wordsEasy = [
  "Hello",
  "Code",
  "Town",
  "Scala",
  "Coding",
  "Funny",
  "Task",
  "Roles",
  "Test",
  "Rust",
];
const wordsNormal = [
  "Country",
  "Testing",
  "Youtube",
  "Twitter",
  "Internet",
  "Styling",
  "Working",
  "Github",
  "Python",
  "Runner",
];
const wordsHard = [
  "Programming",
  "Javascript",
  "Linkedin",
  "Leetcode",
  "Destructuring",
  "Paradigm",
  "Cascade",
  "Documentation",
  "Dependencies",
  "Playing",
];
// Catch selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".instrucitons .lvl");
let secondsSpan = document.querySelector(".instrucitons .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let c;
const words = [wordsEasy, wordsNormal, wordsHard];
let defaulLevelName;
let defaulLevelSeconds;
// Setting levles
const lvls = {
  Easy: 6,
  Normal: 5,
  Hard: 4,
};
// Default level
let lis = document.querySelectorAll(".message .shuffle li");
defaulLevelName = "Easy";
defaulLevelSeconds = lvls[defaulLevelName];
lvlNameSpan.innerHTML = defaulLevelName;
secondsSpan.innerHTML = defaulLevelSeconds;
c = words[0];

lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    if (li.getAttribute("data-set") === "Normal") {
      chooseLevel("Normal");
      c = words[1];
    } else if (li.getAttribute("data-set") === "Hard") {
      chooseLevel("Hard");
      c = words[2];
    } else {
      chooseLevel("Easy");
      c = words[0];
    }
    lis.forEach((li) => {
      li.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  });
});

// timeLeftSpan.innerHTML = defaulLevelSeconds;
scoreTotal.innerHTML = c.length;

// Disable paste event
input.onpaste = function () {
  return false;
};
// Function to choose levle
function chooseLevel(lvl) {
  defaulLevelName = lvl;
  defaulLevelSeconds = lvls[defaulLevelName];
  // Setting level name + seconds + score
  lvlNameSpan.innerHTML = defaulLevelName;
  secondsSpan.innerHTML = defaulLevelSeconds;
}
// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  // Generate word function

  genWords();
};
var a = [];
function genWords() {
  // Get random word from array
  let randomWord = c[Math.floor(Math.random() * c.length)];
  a.push(randomWord);
  // Get word index
  let wordIndex = c.lastIndexOf(randomWord);
  // Remove word from array
  c.splice(wordIndex, 1);
  // Show the random word
  theWord.innerHTML = randomWord;
  // Empty upcomming words
  upcomingWords.innerHTML = "";
  createDiv();
  // Call stat play function
  startPlay();
}
// Creates divs for words
function createDiv() {
  // Generate upcomming words
  for (let i = 0; i < c.length; i++) {
    // Create div
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(c[i]));
    upcomingWords.appendChild(div);
  }
}

function startPlay() {
  timeLeftSpan.innerHTML = defaulLevelSeconds;
  if (a.length === 1) {
    timeLeftSpan.innerHTML = +defaulLevelSeconds + 3;
  }
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      // Compare words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty input field
        input.value = "";
        // Increase score
        scoreGot.innerHTML++;
        if (c.length > 0) {
          // Call generate function
          genWords();
        } else {
          goodResult();
        }
      } else {
        badResult();
      }
    }
  }, 1000);
}
function goodResult() {
  let span = document.createElement("span");
  span.classList.add("good");
  span.appendChild(document.createTextNode("You Won"));
  finishMessage.appendChild(span);
  // Remove upcoming words
  upcomingWords.remove();
  window.localStorage.setItem(scoreGot.innerHTML, new Date());
}
function badResult() {
  let span = document.createElement("span");
  span.classList.add("bad");
  span.appendChild(document.createTextNode("You Lose"));
  finishMessage.appendChild(span);
  window.localStorage.setItem(scoreGot.innerHTML, new Date());
}

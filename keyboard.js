// ok: so to get this going with a rando keyboard every time i've got
// four rows :
// 1st row 0-5 letters, 6 delete
// 2nd row 0-6 letters
// 3rd row 0-6 letters
// 4th row 0-5 letters, 6 clear
// timer
// placeholder text in field
// generate field when finished with one like in codeBreaker
// once innertext matches word, new field appears / new keyboard appears, etc.

// let's get shuffle keyboard function down

// now to styling

const wordlist = [
  "PRINT",
  "VIGOR",
  "PLACE",
  "CLEAN",
  "QUIET",
  "NEEDS",
  "THEIR",
  "RUPEE",
  "HOPES",
  "FIELD",
  "PRICE",
  "UNITE",
  "POINT",
  "IONIC",
  "MONEY",
  "LEAST",
  "WATER",
  "OLIVE",
  "VAULT",
  "TOTAL",
  "UNCLE",
  "NIECE",
  "ARGUE",
  "CHILD",
  "ZONED",
  "YOUTH",
  "HOUSE",
  "PLANT",
  "GRIMY",
  "BOOST",
  "CHEER",
  "UNDUE",
  "CHECK",
  "BEERS",
  "GIVER",
  "APPLE",
  "ANGER",
  "AMBER",
  "BRACE",
  "BOINK",
  "BRAVE",
  "CRAZY",
  "COUNT",
  "CRIMP",
  "CREST",
  "CHEST",
  "CACHE",
  "DRUNK",
  "DRINK",
  "DRAIN",
  "DUNCE",
];

// shuffle wordList and add to placeholder text for each text field
// then deal with actual matching from keyboard and movement from there
// should have everything locked until the player hits start.
let playWordList = shuffleArray(wordlist);
let textField = document.getElementById("text-field");
textField.placeholder = playWordList[0];
textField.disabled = true; // disables other keyboards - can only use buttons

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

document.addEventListener("DOMContentLoaded", () => {
  let counter = 0;
  console.log(counter);
  let keys = document.querySelectorAll(".key");
  const textField = document.getElementById("text-field");
  const currentValue = textField.value;
  let scoreCount = document.getElementById("score");
  let clearBtn = document.querySelector(".clear");
  let deleteBtn = document.querySelector(".delete");
  let closeYDIBtn = document.getElementById("close-you-did-it");
  const keyboardBtn = document.querySelector(".newKeyboard");
  let timer = document.getElementById("timer");
  let startStopButton = document.getElementById("start-stop");
  let intervalId;
  let startTime;
  let timerStarted = false;
  scoreCount.innerText = 0;

  addKeyClickEventListener(keys);
  console.log("added key click event");

  clearBtn.addEventListener("click", () => {
    textField.value = "";
  });

  deleteBtn.addEventListener("click", deleteLastCharacter);

  console.log(textField.placeholder);

  function handleKeyClick(event) {
    textField.value += event.target.innerText;
    console.log(event.target.innerText);
    //NEED EVENT LISTENER ON KEY CAUSE INPUT IS SET TO KEYBOARD
    if (textField.value === textField.placeholder) {
      console.log("Inner text matches placeholder text");
      counter++;
      scoreCount.innerText = counter;
      textField.placeholder = playWordList[counter];
      textField.value = "";
      newKeyboard();
      console.log(counter);
    //   textField = document.getElementById("text-field" + counter);
      console.log(textField.value);
      let clearBtn = document.querySelector(".clear");
      let deleteBtn = document.querySelector(".delete");
      clearBtn.addEventListener("click", () => {
        textField.value = "";
      });
      deleteBtn.addEventListener("click", deleteLastCharacter);
      // Call the function to add the event listener
    } else {
      console.log("Inner text does not match placeholder text");
    }
  }

  function addKeyClickEventListener(keys) {
    keys.forEach((key) => {
      key.addEventListener("click", handleKeyClick);
      key.addEventListener("click", function (event) {
        if (!timerStarted) {
          startTimer();
          timerStarted = true;
        }
      });
    });
  }

  closeYDIBtn.addEventListener("click", () => {
    let youDidIt = document.querySelector(".you-did-it");
    console.log(youDidIt);
    console.log("clicked YDI close");
    youDidIt.classList.remove("show");
  });

  //   keyboardBtn.addEventListener("click", newKeyboard);

  function newKeyboard() {
    // get rows, clear rows,
    const buttonsToClear = document.querySelectorAll("h2.key");
    let clearBtn = document.querySelector(".clear");
    let deleteBtn = document.querySelector(".delete");
    deleteBtn.remove();
    clearBtn.remove();
    buttonsToClear.forEach((button) => button.remove());
    // populate rows.
    // data store of ABCs needed
    const alphabet = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    // shuffle array
    const useArray = shuffleArray(alphabet);
    // populate buttons 0-5, delete, 6-12, 13-19, 20-25, clear
    // for loops?
    //ROW 1
    const row1 = document.querySelector(".row1");
    for (let i = 0; i < 10; i++) {
      const button = document.createElement("h2");
      // Set the class and data-key attributes
      button.classList.add("key");
      button.textContent = useArray[i].toUpperCase();
      row1.appendChild(button);
    }

    //ROW 2
    const row2 = document.querySelector(".row2");
    for (let i = 10; i < 19; i++) {
      const button = document.createElement("h2");
      // Set the class and data-key attributes
      button.classList.add("key");
      button.textContent = useArray[i].toUpperCase();
      row2.appendChild(button);
    }

    const row3 = document.querySelector(".row3");

    const clearButton = document.createElement("h2");
    // Set the class and data-key attributes
    clearButton.classList.add("clear");
    clearButton.innerHTML = '<i class="fa fa-remove"></i>';
    row3.appendChild(clearButton);

    //ROW 3

    for (let i = 19; i < 26; i++) {
      const button = document.createElement("h2");
      // Set the class and data-key attributes
      button.classList.add("key");
      button.textContent = useArray[i].toUpperCase();
      row3.appendChild(button);
    }

    //add delete button
    const deleteButton = document.createElement("h2");
    // Set the class and data-key attributes
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = '<i class="fa fa-backspace"></i>';
    row3.appendChild(deleteButton);

    //ROW 4
    // const row4 = document.querySelector(".row4");
    // for (let i = 20; i < 26; i++) {
    //   const button = document.createElement("h2");
    //   // Set the class and data-key attributes
    //   button.classList.add("key");
    //   button.textContent = useArray[i].toUpperCase();
    //   row4.appendChild(button);
    // }

    //add clear button

    let keys = document.querySelectorAll(".key");
    addKeyClickEventListener(keys);
    // WOOHOO GOT IT! JUST HAD TO ADD ARRAY PARAM ... WOOT
    console.log("added key click event");
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function deleteLastCharacter() {
    // let textField = document.getElementById("text-field" + counter);
    const currentValue = textField.value;
    textField.value = currentValue.substring(0, currentValue.length - 1);
  }

  //   function startTimer() {
  //     startTime = Date.now();
  //     intervalId = setInterval(updateTimer, 1000);
  //   }

  //   function stopTimer() {
  //     clearInterval(intervalId);
  //   }

  //   function updateTimer() {
  //     let elapsedTime = Math.floor((Date.now() - startTime) / 1000); // calculate elapsed time in seconds
  //     let hours = Math.floor(elapsedTime / 3600);
  //     let minutes = Math.floor((elapsedTime - hours * 3600) / 60);
  //     let seconds = elapsedTime - hours * 3600 - minutes * 60;
  //     timer.innerText = `${minutes.toString().padStart(2, "0")}:${seconds
  //       .toString()
  //       .padStart(2, "0")}`;
  //   }

  // startStopButton.addEventListener("click", function () {
  //   if (startStopButton.innerText === "Start") {
  //     startStopButton.innerText = "Stop";
  //     startTimer();
  //   } else {
  //     startStopButton.innerText = "Start";
  //     stopTimer();
  //   }
  // });

  let duration = 60; // duration of the countdown in seconds

  function startTimer() {
    startTime = Date.now();
    intervalId = setInterval(updateTimer, 1000);
  }

  function stopTimer() {
    clearInterval(intervalId);
  }

  function updateTimer() {
    let remainingTime = Math.max(
      duration - Math.floor((Date.now() - startTime) / 1000),
      0
    ); // calculate remaining time in seconds
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    timer.innerText = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    if (remainingTime <= 0) {
      stopTimer();
      counter = 0;
      // show YOUDIDIT
      let youDidIt = document.querySelector(".you-did-it");
      youDidIt.classList.add("show");
    }
  }

  // so i'm going to need an event listener that's watching for when textfield inner text matches placeholder text
  textField.addEventListener("input", function () {
    console.log(textField.placeholder);
    console.log(textField.value);
    if (textField.value === textField.placeholder) {
      console.log("Inner text matches placeholder text");
    } else {
      console.log("Inner text does not match placeholder text");
    }
  });

  //dropdown stuff

  const dropIcons = document.querySelectorAll(".dropIcon");

  dropIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      console.log("you clicked a dropdown button");
      const dropdown = icon.parentNode;
      console.log(dropdown);
      const dropdownContent = dropdown.querySelector(".dropdown-content");
      console.log(dropdownContent);
      dropdownContent.classList.toggle("show");
    });
  });

  // disable dbl click behavior
  // add an event listener for the 'dblclick' event
  document.addEventListener("dblclick", function (event) {
    event.preventDefault();
  });
});

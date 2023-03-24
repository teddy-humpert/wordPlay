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

document.addEventListener("DOMContentLoaded", () => {
  const keys = document.querySelectorAll(".key");
  const textField = document.getElementById("text-field");
  const currentValue = textField.value;
  const clearBtn = document.querySelector(".clear");
  const deleteBtn = document.querySelector(".delete");
  const keyboardBtn = document.querySelector(".newKeyboard");
  let timer = document.getElementById("timer");
  let startStopButton = document.getElementById("start-stop");
  let intervalId;
  let startTime;

  keys.forEach((key) => {
    key.addEventListener("click", () => {
      textField.value += key.innerText;
    });
  });

  clearBtn.addEventListener("click", () => {
    textField.value = "";
  });

  deleteBtn.addEventListener("click", deleteLastCharacter);

  keyboardBtn.addEventListener("click", newKeyboard);

  function newKeyboard() {
    // get rows, clear rows, 
    const buttonsToClear = document.querySelectorAll("button.key");
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
    for (let i = 0; i < 6; i++) {
      const button = document.createElement("button");
      // Set the class and data-key attributes
      button.classList.add("key");
      button.textContent = useArray[i].toUpperCase();
      row1.appendChild(button);
    }

    //add delete button
    const deleteButton = document.createElement("button");
      // Set the class and data-key attributes
      deleteButton.classList.add("key");
      deleteButton.classList.add("delete");
      deleteButton.textContent = "Delete";
      row1.appendChild(deleteButton);

    //ROW 2
    const row2 = document.querySelector(".row2");
    for (let i = 6; i < 13; i++) {
      const button = document.createElement("button");
      // Set the class and data-key attributes
      button.classList.add("key");
      button.textContent = useArray[i].toUpperCase();
      row2.appendChild(button);
    }

    //ROW 3
    const row3 = document.querySelector(".row3");
    for (let i = 13; i < 20; i++) {
      const button = document.createElement("button");
      // Set the class and data-key attributes
      button.classList.add("key");
      button.textContent = useArray[i].toUpperCase();
      row3.appendChild(button);
    }

    //ROW 4
    const row4 = document.querySelector(".row4");
    for (let i = 20; i < 26; i++) {
      const button = document.createElement("button");
      // Set the class and data-key attributes
      button.classList.add("key");
      button.textContent = useArray[i].toUpperCase();
      row4.appendChild(button);
    }

    //add clear button
    const clearButton = document.createElement("button");
      // Set the class and data-key attributes
      clearButton.classList.add("key");
      clearButton.classList.add("clear");
      clearButton.textContent = "Clear";
      row4.appendChild(clearButton);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function deleteLastCharacter() {
    const textField = document.getElementById("text-field");
    const currentValue = textField.value;
    textField.value = currentValue.substring(0, currentValue.length - 1);
  }

  function startTimer() {
    startTime = Date.now();
    intervalId = setInterval(updateTimer, 1000);
  }

  function stopTimer() {
    clearInterval(intervalId);
  }

  function updateTimer() {
    let elapsedTime = Math.floor((Date.now() - startTime) / 1000); // calculate elapsed time in seconds
    let hours = Math.floor(elapsedTime / 3600);
    let minutes = Math.floor((elapsedTime - hours * 3600) / 60);
    let seconds = elapsedTime - hours * 3600 - minutes * 60;
    timer.innerText = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  startStopButton.addEventListener("click", function () {
    if (startStopButton.innerText === "Start") {
      startStopButton.innerText = "Stop";
      startTimer();
    } else {
      startStopButton.innerText = "Start";
      stopTimer();
    }
  });
});

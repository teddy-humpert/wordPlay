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

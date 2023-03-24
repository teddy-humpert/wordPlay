// const keys = document.querySelectorAll('.key');
// const textField = document.getElementById('text-field');

// function playSound(e) {
//   const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
//   const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
//   if (!audio) return;
//   audio.currentTime = 0;
//   audio.play();
//   key.classList.add('playing');
  
//   textField.value += key.innerText; // Update text field value with pressed key
// }

// function removeTransition(e) {
//   if (e.propertyName !== 'transform') return;
//   this.classList.remove('playing');
// }

// keys.forEach(key => key.addEventListener('transitionend', removeTransition));
// window.addEventListener('keydown', playSound);

const keys = document.querySelectorAll('.key');
const textField = document.getElementById('text-field');
const currentValue = textField.value;
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');


keys.forEach(key => {
  key.addEventListener('click', () => {
    textField.value += key.innerText;
  });
});

clearBtn.addEventListener('click', () => {
    textField.value = '';
});

deleteBtn.addEventListener('click', deleteLastCharacter);

function deleteLastCharacter() {
    const textField = document.getElementById('text-field');
    const currentValue = textField.value;
    textField.value = currentValue.substring(0, currentValue.length - 1);
  }
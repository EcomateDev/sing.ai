let lines = []; // Variable to store song lines
let singingIndex = 0; // Variable to track the singing index

function startSinging() {
  let songText = document.getElementById('user-input').value.trim();
  lines = songText.split('\n');

  if (lines.length === 0) {
    showMessage("Please enter the song lyrics!");
    return;
  }

  singingIndex = 0; // Start singing from the first line
  showMessage("Start singing the first line...");
  displayNextUserText();
}

function getCleanText(text) {
  return text.trim(); // Змінив цю функцію, щоб не видаляти текст в дужках
}


function singNextLine(userInput) {
  if (singingIndex < lines.length) {
    let botLine = lines[singingIndex];
    let botText = getCleanText(botLine);
    let userText = userInput.trim();

    if (userText === botText) {
      showMessage(`You: ${userInput}`, true);
      singingIndex++;
      if (singingIndex < lines.length) {
        showMessage(`Bot: ${lines[singingIndex]}`);
        singingIndex++;
        displayNextUserText();
      } else {
        showMessage("Song has ended!");
        clearUserText();
      }
    } else {
      showMessage(`Bot: Please try entering this line of the song: "${botText}"`);
    }
  } else {
    showMessage("Bot: Song has ended!");
    clearUserText();
  }
}


function showMessage(message, isUser = false) {
  let chatBox = document.getElementById('chat-box');
  let div = document.createElement('div');
  div.classList.add('message-container');
  
  if (isUser) {
    div.innerHTML = `<div class="message user-message">${message}</div>`;
  } else {
    div.innerHTML = `<div class="message bot-message">${message}</div>`;
  }
  
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function displayNextUserText() {
  let userText = lines[singingIndex];
  let userTextContainer = document.getElementById('user-text');
  userTextContainer.textContent = userText;
}

function clearUserText() {
  let userTextContainer = document.getElementById('user-text');
  userTextContainer.textContent = 'Write this text to continue the song...';
}

function fillUserInput() {
  let userInput = lines[singingIndex];
  document.getElementById('user-input').value = userInput;
}

// Останній ваш код тут...
document.getElementById('user-input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // Зупиняємо дію Enter за замовчуванням
    sendSongLine();
    this.value = ''; // Очищення поля вводу після відправки повідомлення
  }
});

function sendSongLine() {
  let userInput = document.getElementById('user-input').value;
  singNextLine(userInput);
  clearInput();
}

function clearInput() {
  document.getElementById('user-input').value = '';
}
// Останній ваш код тут...

const socket = io();

socket.on('chat-event', function(data) {
    addMessage(data)
})

const container = document.querySelector('.container');
const title = document.querySelector('.errors');
const messages = document.querySelector('.messages');

document.getElementById('submit').addEventListener('click', function (e) {
    title.innerHTML = '';
    const name = document.getElementById('name');
    const content = document.getElementById('content');
    if (!name.value || !content.value) {
        const alert = document.createElement('p');
        alert.textContent = 'Fill out (display name) and (message)';
        title.append(alert);
        return;
    }
    socket.emit('chat-event', {
        name: name.value,
        content: content.value,
        rgbaName: getRandomRGBA(),
        rgbaContent: getRandomRGBA(),
    })
    name.value = '';
    content.value = '';
});


function addMessage({name, content, rgbaName, rgbaContent}) {
    const nameEl = document.createElement('h3');
    const contentEl = document.createElement('p');
    const seperator = document.createElement('div');
    nameEl.textContent = name + ' (' + new Date().toLocaleTimeString() + ')';
    nameEl.style.color = rgbaName;
    contentEl.textContent = content;
    contentEl.style.color = rgbaContent;
    seperator.append(nameEl);
    seperator.append(contentEl);
    messages.prepend(seperator);
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  

function getRandomRGBA() {
    return `rgba(${randomBetween(0, 255)}, ${randomBetween(
      0,
      255
    )}, ${randomBetween(0, 255)}, ${randomBetween(7, 10) / 10})`;
  }
  
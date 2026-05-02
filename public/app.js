// import {micromark} from "https://esm.sh/micromark@3#?bundle";

// ik gebruik marked en niet de import versie omdat ik anders een security error krijg
import {marked} from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

window.addEventListener('load', init);
console.log("test")

let active = false

function init() {
    const form = document.querySelector('.form');
    console.log("test2")
    if (!active) {
        console.log("test4")
        form.addEventListener('submit', chatResponse);
    }
}


async function chatResponse(e) {
    e.preventDefault();
    console.log("test3")
    const button = document.getElementById('button');
    button.disabled = true;


    let plantInfo = {
        name: document.getElementById('name').value ?? undefined,
        temperature: document.getElementById('temperature').value ?? undefined,
        humidity: document.getElementById('humidity').value ?? undefined,
        ph: document.getElementById('ph').value ?? undefined,
    }


    console.log(plantInfo)

    const input = document.getElementById('prompt');

    const message = input.value.trim();
    console.log(message)
    if (!message) return;

    addMessage(message, 0, "user");
    input.value = "";

    const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt: message, info: plantInfo})
    });

    const data = await response.json();


    button.disabled = false;

    addMessage(data.response.message, data.response.tokens !== 0 ? data.response.tokens : 0, "bot",);
}

function addMessage(text, tokens, sender) {

    const chat = document.querySelector('.chat');
    const bubble = document.createElement('div');

    const p1 = document.createElement('p');
    const p2 = document.createElement('p');

    bubble.classList.add('bubble', sender);

    p1.innerHTML = marked.parse(text);
    if (tokens !== 0) {
        p2.innerText = ` tokens used: ${tokens}`
    }
    bubble.appendChild(p1);
    bubble.appendChild(p2);

    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
}
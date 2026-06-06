const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message-input");
const typing = document.getElementById("typing");

const channel = new BroadcastChannel("chat_app");

let userId = Math.random().toString(36).substring(2, 8);
let userName = "User";

let messages = JSON.parse(localStorage.getItem("messages")) || [];
messages.forEach(renderMessage);

function setName() {
    const name = document.getElementById("nameInput").value.trim();
    if (name) userName = name;
}


function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const msg = {
        id: userId,
        name: userName,
        text: text,
        time: Date.now()
    };

    messages.push(msg);
    save();

    renderMessage(msg);
    channel.postMessage(msg);

    input.value = "";
}


channel.onmessage = (event) => {
    renderMessage(event.data);
};


function renderMessage(msg) {
    const div = document.createElement("div");
    div.classList.add("message");

    div.classList.add(msg.id === userId ? "me" : "other");

    div.innerHTML = `
        <b>${msg.name}</b><br/>
        ${msg.text}
        <div class="actions">
            <span onclick="editMsg('${msg.time}')">Edit</span>
            <span onclick="deleteMsg('${msg.time}')">Delete</span>
        </div>
    `;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function deleteMsg(time) {
    messages = messages.filter(m => m.time != time);
    save();
    reload();
}

function editMsg(time) {
    const msg = messages.find(m => m.time == time);
    const newText = prompt("Edit message:", msg.text);

    if (newText) {
        msg.text = newText;
        save();
        reload();
    }
}


function reload() {
    chatBox.innerHTML = "";
    messages.forEach(renderMessage);
}

function save() {
    localStorage.setItem("messages", JSON.stringify(messages));
}

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// TYPING EFFECT (fake UX)
input.addEventListener("input", () => {
    typing.textContent = "typing...";
    clearTimeout(window.typingTimer);

    window.typingTimer = setTimeout(() => {
        typing.textContent = "";
    }, 800);
});
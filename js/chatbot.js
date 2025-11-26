const CHAT_STORAGE_KEY = "threads_chat_history";

const INTENT_REPLIES = {
    shipping:
        "We offer standard shipping within 5–7 business days. Tracking will be available once your order ships.",
    returns:
        "You can return unworn items within 30 days. Make sure tags are still attached.",
    sizing:
        "Our items generally fit true to size. If you're between sizes, we suggest sizing up for comfort.",
    orders:
        "Please share your order ID and we’ll help you track the status. You can also use the Contact page for assistance."
};

function detectIntent(text) {
    text = text.toLowerCase();

    if (text.includes("ship")) return "shipping";
    if (text.includes("deliver")) return "shipping";
    if (text.includes("return")) return "returns";
    if (text.includes("refund")) return "returns";
    if (text.includes("size")) return "sizing";
    if (text.includes("fit")) return "sizing";
    if (text.includes("order")) return "orders";
    if (text.includes("track")) return "orders";

    return null;
}

function loadHistory() {
    try {
        return JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveHistory(history) {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));
}

export function initChatbot() {
    if (document.getElementById("threads-chatbot-root")) return;

    const root = document.createElement("div");
    root.id = "threads-chatbot-root";

    root.innerHTML = `
    <button id="chatbot-btn">💬</button>

    <div id="chatbot-box">
      <div id="chatbot-header">
        <div>
          <h3 class="chatbot-title">Threads Assistant</h3>
          <p class="chatbot-subtitle">Ask about orders, shipping & more</p>
        </div>
        <button id="chatbot-close">×</button>
      </div>

      <div id="chatbot-messages"></div>

      <div id="chatbot-quick">
        <button data-intent="shipping">Shipping</button>
        <button data-intent="returns">Returns</button>
        <button data-intent="sizing">Sizing</button>
        <button data-intent="orders">Orders</button>
      </div>

      <div id="chatbot-input-area">
        <input type="text" id="chatbot-input" placeholder="Type your message..." />
        <button id="chatbot-send">Send</button>
      </div>
    </div>
  `;

    document.body.appendChild(root);

    const btn = document.getElementById("chatbot-btn");
    const box = document.getElementById("chatbot-box");
    const close = document.getElementById("chatbot-close");
    const messagesEl = document.getElementById("chatbot-messages");
    const input = document.getElementById("chatbot-input");
    const send = document.getElementById("chatbot-send");
    const quickButtons = document.querySelectorAll("#chatbot-quick button");

    let history = loadHistory();

    function scrollBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function renderHistory() {
        messagesEl.innerHTML = "";
        history.forEach((msg) => {
            addMessage(msg.text, msg.from, false);
        });
        scrollBottom();
    }

    function addMessage(text, from = "bot", persist = true) {
        const div = document.createElement("div");
        div.className = from === "user" ? "msg user" : "msg bot";
        div.textContent = text;
        messagesEl.appendChild(div);

        if (persist) {
            history.push({ text, from });
            saveHistory(history);
        }
        scrollBottom();
    }

    // Show chat
    btn.onclick = () => {
        box.classList.add("open");
        btn.classList.add("hidden");
    };

    // Close chat
    close.onclick = () => {
        box.classList.remove("open");
        btn.classList.remove("hidden");
        input.value = "";

        // messagesEl.innerHTML = "";
    };

    send.onclick = () => {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, "user");
        input.value = "";

        const intent = detectIntent(text);
        const reply = intent ? INTENT_REPLIES[intent] : "I'm here to help! Try asking about shipping, sizing, or orders.";

        setTimeout(() => addMessage(reply), 350);
    };

    // Enter key
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") send.click();
    });

    quickButtons.forEach((btn) => {
        btn.onclick = () => {
            const intent = btn.dataset.intent;
            addMessage(btn.textContent, "user");
            setTimeout(() => addMessage(INTENT_REPLIES[intent]), 250);
        };
    });

    if (history.length === 0) {
        addMessage("Hi! How can I help you today?", "bot");
    }
}

document.addEventListener("DOMContentLoaded", initChatbot);
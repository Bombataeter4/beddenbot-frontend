
const apiUrl = "https://beddenbot-backend.onrender.com/chat"; // Je Render backend URL

async function fetchResponse(userMessage) {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
    });

    if (!response.ok) {
        console.error("Error:", response.statusText);
        return "Sorry, I couldn't fetch an answer right now.";
    }

    const data = await response.json();
    return data.response || "Sorry, I don't have an answer for that.";
}

document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    appendMessage("You", userInput);
    const botResponse = await fetchResponse(userInput);
    appendMessage("BeddenBot", botResponse);
    document.getElementById("user-input").value = "";
});

function appendMessage(sender, message) {
    const chatOutput = document.getElementById("chat-output");
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

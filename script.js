
const apiUrl = "https://beddenbot-backend.onrender.com/chat"; // Render backend URL

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
        return "Sorry, ik kon geen antwoord vinden.";
    }

    const data = await response.json();
    return data.response || "Sorry, ik heb daar geen antwoord op.";
}

document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    appendMessage("Jij", userInput);
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


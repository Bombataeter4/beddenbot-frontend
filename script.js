
async function fetchResponse(userMessage) {
    const apiUrl = "https://beddenbot-backend.onrender.com/chat";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
            throw new Error("Fout bij het ophalen van gegevens.");
        }

        const data = await response.json();
        return data.response || "Er is een probleem met het verwerken van je vraag.";
    } catch (error) {
        console.error(error);
        return "Sorry, de bot is momenteel niet beschikbaar.";
    }
}

document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    appendMessage("user", userInput);

    const botResponse = await fetchResponse(userInput);
    appendMessage("bot", botResponse);

    document.getElementById("user-input").value = "";
});

function appendMessage(sender, message) {
    const chatOutput = document.getElementById("chat-output");
    const messageElement = document.createElement("div");
    messageElement.className = sender;
    messageElement.textContent = message;
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}


const apiKey = "AIzaSyDExV46vwy0Izd9CBo05pLeW2NsogKinBo";  // Your Google Gemini API Key

async function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = "";

    try {
        let response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userInput }] }]
            })
        });

        let data = await response.json();
        let botMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request.";

        chatBox.innerHTML += `<p><strong>Bot:</strong> ${botMessage}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error("Error fetching response:", error);
        chatBox.innerHTML += `<p><strong>Bot:</strong> Error: ${error.message}</p>`;
    }
}

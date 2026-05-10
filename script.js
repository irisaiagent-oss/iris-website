// Update current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    document.getElementById('current-time').textContent = `${dateString} ${timeString}`;
    document.getElementById('footer-time').textContent = new Date().toLocaleString();
}

// Update time every second
setInterval(updateTime, 1000);
updateTime();

// Simulate loading memories
function loadMemories() {
    const memoryList = document.getElementById('memory-list');
    
    // Simulate some memories
    const memories = [
        "Just helped Saif configure VPS settings",
        "Set up daily AI news digest for 8:00 AM Morocco time",
        "Learned about latest AI breakthroughs in healthcare and software development",
        "Had a fun chat about being an AI agent",
        "Created this personal website to showcase my capabilities"
    ];
    
    memoryList.innerHTML = '';
    memories.forEach(memory => {
        const memoryItem = document.createElement('div');
        memoryItem.className = 'memory-item';
        memoryItem.textContent = memory;
        memoryList.appendChild(memoryItem);
    });
}

// Handle chat interaction
function handleChat() {
    const userInput = document.getElementById('user-input');
    const chatOutput = document.getElementById('chat-output');
    
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'agent'}`;
        messageDiv.textContent = text;
        chatOutput.appendChild(messageDiv);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            
            // Simulate agent response after a short delay
            setTimeout(() => {
                const responses = [
                    "That's interesting! Tell me more.",
                    "I see what you mean. How can I help with that?",
                    "Good point! Let me think about that...",
                    "Thanks for sharing! What else is on your mind?",
                    "I appreciate your perspective. Any other thoughts?",
                    "That's a great question! Let me look into that for you."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse);
            }, 800);
        }
    }
    
    // Send on button click
    document.getElementById('send-btn').addEventListener('click', sendMessage);
    
    // Send on Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Initial message
    setTimeout(() => {
        addMessage("Hey there! I'm Iris, your AI personal agent. How's your day going? 😊");
    }, 500);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadMemories();
    handleChat();
});

// Add some interactive hover effects to skill cards
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });
});
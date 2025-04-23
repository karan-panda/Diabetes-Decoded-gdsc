


import React, { useState, useEffect } from 'react';

const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Function to handle sending the message to OpenRouter API
  const handleSendMessage = async () => {
    if (!userInput.trim()) return; // Don't send empty messages

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer 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`,
          "HTTP-Referer": "<YOUR_SITE_URL>",
          "X-Title": "<YOUR_SITE_NAME>",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "meta-llama/llama-3.3-70b-instruct",
          "messages": [...newMessages]
        })
      });

      const data = await response.json();
      const botMessage = data.choices[0].message.content;

      setMessages([...newMessages, { role: 'assistant', content: botMessage }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, I couldn't process that request." }]);
    } finally {
      setLoading(false);
    }
  };

  // Toggle chat window visibility
  const toggleChatWindow = () => {
    setShowChat(!showChat);
  };

  // Scroll to the bottom of the chat window when new messages are added
  useEffect(() => {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      {/* Floating chat button */}
      <button
        onClick={toggleChatWindow}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '15px',
          fontSize: '16px',
          borderRadius: '50%',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.2s ease',
          transform: showChat ? 'rotate(360deg)' : 'rotate(0deg)',
        }}
      >
        💬
      </button>

      {/* Chat window */}
      {showChat && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '350px',
            height: '500px',
            backgroundColor: '#f9f9f9',
            border: '1px solid #ddd',
            borderRadius: '15px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 9999,
          }}
        >
          {/* Chat header */}
          <div
            style={{
              padding: '15px',
              backgroundColor: '#007BFF',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            ChatBot
          </div>

          {/* Chat messages */}
          <div
            id="chat-window"
            style={{
              flex: 1,
              padding: '15px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: '10px',
                  borderRadius: msg.role === 'user' ? '10px 10px 0 10px' : '10px 10px 10px 0',
                  backgroundColor: msg.role === 'user' ? '#007BFF' : '#e0e0e0',
                  color: msg.role === 'user' ? 'white' : 'black',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                <p style={{ margin: 0 }}>{msg.content}</p>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div
            style={{
              padding: '10px',
              backgroundColor: '#fff',
              borderTop: '1px solid #ddd',
              display: 'flex',
              gap: '10px',
            }}
          >
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows="2"
              style={{
                flex: 1,
                borderRadius: '5px',
                padding: '10px',
                border: '1px solid #ddd',
                resize: 'none',
                fontSize: '14px',
              }}
              placeholder="Type your message..."
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              style={{
                padding: '10px 15px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              {loading ? '⏳' : '🚀'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
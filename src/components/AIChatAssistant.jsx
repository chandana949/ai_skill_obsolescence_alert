import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import aiService from "../services/aiService";

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your AI career advisor. I can help you understand your skill risk, suggest learning paths, and answer questions about your career. How can I help you today?",
      suggestions: [
        "What skills should I learn?",
        "How does automation affect me?",
        "What's my career outlook?"
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { role, skills } = useContext(UserContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      // Pass conversation history to maintain context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        text: msg.text,
        content: msg.text
      }));
      
      const response = await aiService.chat(currentInput, { role, skills }, conversationHistory);
      
      setMessages(prev => [...prev, {
        role: "assistant",
        text: response.text,
        suggestions: response.suggestions || []
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        text: "I'm sorry, I encountered an error. Please try again.",
        suggestions: []
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuggestionClick(suggestion) {
    setInput(suggestion);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #44A3F7 0%, #4ECDC4 100%)",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(68, 163, 247, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          zIndex: 1000,
          transition: "transform 0.2s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        💬
      </button>
    );
  }

  return (
    <div style={{
      position: "fixed",
      bottom: "24px",
      right: "24px",
      width: "400px",
      maxWidth: "calc(100vw - 48px)",
      height: "600px",
      maxHeight: "calc(100vh - 48px)",
      background: "white",
      borderRadius: "20px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      zIndex: 1000,
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #44A3F7 0%, #4ECDC4 100%)",
        padding: "20px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
            AI Career Advisor
          </h3>
          <p style={{ margin: "4px 0 0 0", fontSize: "12px", opacity: 0.9 }}>
            Ask me anything about your career
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        background: "#F5F5F5"
      }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: msg.role === "user" ? "flex-end" : "flex-start"
            }}
          >
            <div style={{
              maxWidth: "80%",
              padding: "12px 16px",
              borderRadius: "16px",
              background: msg.role === "user" 
                ? "linear-gradient(90deg, #44A3F7 0%, #4ECDC4 100%)"
                : "white",
              color: msg.role === "user" ? "white" : "#2C3E50",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
            }}>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5" }}>
                {msg.text}
              </p>
            </div>
            {msg.suggestions && msg.suggestions.length > 0 && (
              <div style={{
                marginTop: "8px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px"
              }}>
                {msg.suggestions.map((suggestion, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      background: "white",
                      border: "1px solid #E0E0E0",
                      borderRadius: "12px",
                      cursor: "pointer",
                      color: "#44A3F7"
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "16px"
          }}>
            <div style={{
              padding: "12px 16px",
              borderRadius: "16px",
              background: "white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
            }}>
              <span style={{ fontSize: "14px" }}>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "16px",
        background: "white",
        borderTop: "1px solid #E0E0E0"
      }}>
        <div style={{
          display: "flex",
          gap: "8px"
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "1px solid #E0E0E0",
              borderRadius: "12px",
              fontSize: "14px",
              outline: "none"
            }}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            style={{
              padding: "12px 20px",
              background: input.trim() && !isLoading
                ? "linear-gradient(90deg, #44A3F7 0%, #4ECDC4 100%)"
                : "#E0E0E0",
              color: input.trim() && !isLoading ? "white" : "#9E9E9E",
              border: "none",
              borderRadius: "12px",
              cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
              fontSize: "14px",
              fontWeight: "600"
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}


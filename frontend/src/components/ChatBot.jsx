import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const messagesEndRef = useRef(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username && messages.length === 0) {
      setMessages([{
        id: Date.now(),
        content: `Hello ${username}, how can I help you today?`,
        sender: "bot"
      }]);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      content: inputMessage,
      sender: "user"
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("YOUR_BACKEND_URL/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          userId: username
        })
      });

      const data = await response.json();
      const botMessage = {
        id: Date.now() + 1,
        content: data.response,
        sender: "bot"
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        content: "Sorry, I'm having trouble connecting. Please try again.",
        sender: "bot"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    setShowDialog(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', username);

    try {
      const response = await fetch('https://3a1e-34-16-161-25.ngrok-free.app/process_pdf', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          content: "File processed successfully. What would you like to know about it?",
          sender: "bot"
        }]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        content: "Sorry, there was an error processing your file.",
        sender: "bot"
      }]);
    } finally {
      setShowDialog(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-slate-900 text-slate-100 p-4">
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-center">Processing your file. Please wait...</p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto h-screen flex flex-col bg-slate-800 rounded-lg">
        <div className="p-4 border-b border-slate-700 flex justify-end">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            accept=".pdf,.doc,.docx,.txt"
          />
          <label 
            htmlFor="fileInput" 
            className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg cursor-pointer"
          >
            Upload Document
          </label>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-3xl p-4 rounded-lg ${
                  message.sender === "user" 
                    ? "bg-blue-600 text-white ml-12" 
                    : "bg-slate-700 text-white mr-12"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-slate-700">
          <div className="flex gap-2">
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-slate-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
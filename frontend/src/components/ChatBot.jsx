import React, { useState, useRef } from 'react';
import { Send, Paperclip, Trash2, Plus, Menu, X } from 'lucide-react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const fileInputRef = useRef(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() || uploadedFiles.length > 0) {
      const newMessage = {
        id: Date.now(),
        content: inputMessage,
        files: [...uploadedFiles],
        sender: 'user'
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      setUploadedFiles([]);
    }
  };

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (fileToRemove) => {
    setUploadedFiles(uploadedFiles.filter(file => file !== fileToRemove));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to send the file to Colab
  const sendFileToColab = async () => {
    if (uploadedFiles.length > 0) {
      const formData = new FormData();
      formData.append('file', uploadedFiles[0]);
      formData.append('user_id', 'your_user_id');  // Replace this with actual user ID if needed

      try {
        const response = await fetch('https://8de3-34-105-91-239.ngrok-free.app/finetune', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          console.log("File uploaded successfully", data);
        } else {
          console.error("Error uploading file", data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex w-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="w-64 bg-slate-800 p-4 border-r border-slate-700 transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mr-2 flex items-center justify-center">
              <Plus size={20} className="mr-2" /> New Chat
            </button>
            <button 
              onClick={toggleSidebar}
              className="bg-slate-700 hover:bg-slate-600 p-2 rounded"
            >
              <X size={20} />
            </button>
          </div>
          <div className="space-y-2">
            <div className="text-slate-400">Previous Chats</div>
            {/* Previous chat list would go here */}
            <div className="bg-slate-700 p-2 rounded hover:bg-slate-600 cursor-pointer">
              Chat History 1
            </div>
            <div className="bg-slate-700 p-2 rounded hover:bg-slate-600 cursor-pointer">
              Chat History 2
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 relative">
        {/* Sidebar Toggle Button */}
        {!isSidebarOpen && (
          <button 
            onClick={toggleSidebar}
            className="absolute top-4 left-4 z-10 bg-slate-700 hover:bg-slate-600 p-2 rounded"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xl p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-slate-700 text-white'
                }`}
              >
                {message.content}
                {message.files && message.files.map((file) => (
                  <div key={file.name} className="mt-2 text-sm text-slate-200">
                    📄 {file.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* File Upload Preview */}
        {uploadedFiles.length > 0 && (
          <div className="bg-slate-800 p-2 flex space-x-2 items-center">
            {uploadedFiles.map((file) => (
              <div 
                key={file.name} 
                className="flex items-center bg-slate-700 p-1 rounded"
              >
                <span className="mr-2 text-sm">{file.name}</span>
                <button 
                  onClick={() => removeFile(file)}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="bg-slate-800 p-4 border-t border-slate-700">
          <div className="flex space-x-2">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple 
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="bg-slate-700 hover:bg-slate-600 p-2 rounded"
            >
              <Paperclip size={20} />
            </button>
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Send a message..."
              className="flex-1 bg-slate-700 text-white p-2 rounded"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={() => {
                handleSendMessage();
                sendFileToColab(); // Call the function to upload the file
              }}
              className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
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

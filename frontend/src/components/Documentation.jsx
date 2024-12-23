import React, { useState } from 'react';

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    { 
      id: 'getting-started', 
      title: 'Getting Started',
      content: (
        <div>
          <p>Welcome to BotForge! Follow these steps to begin:</p>
          <div className="bg-gray-900 p-6 rounded-lg my-4">
            <pre className="text-sm text-gray-300"><code>{`

import requests

# Define the API endpoint and your API key
api_endpoint = "https://api.yourdomain.com/chatbot"
api_key = "YOUR_API_KEY"

# Define the prompt for the chatbot
prompt = {"prompt": "Explain how our custom chatbot works"}

# Send a POST request to the API
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

response = requests.post(api_endpoint, json=prompt, headers=headers)

# Check if the request was successful
if response.status_code == 200:
    chatbot_response = response.json().get("response", "No response received")
    print(chatbot_response)
else:
    print(f"Error: {response.status_code} - {response.text}")


            `.trim()}</code></pre>
          </div>
          <p>Make sure to replace <code>YOUR_API_KEY</code> with your actual BotForge API key.</p>
        </div>
      )
    },
    {
      id: 'installation',
      title: 'Installation',
      content: (
        <div>
          <h3>Installation Options</h3>
    
          {/* Direct Download Instructions */}
          <h4>Direct Download</h4>
          <div className="bg-gray-900 p-6 rounded-lg my-4">
            <p>1. Clone the repository:</p>
            <code className="block bg-gray-800 p-2 rounded">git clone https://github.com/your-org/custom-chatbot.git</code>
            <p>2. Install dependencies:</p>
            <code className="block bg-gray-800 p-2 rounded">cd custom-chatbot</code>
            <code className="block bg-gray-800 p-2 rounded">pip install -r requirements.txt</code>
          </div>
    
          {/* Using Python's pip Package Manager */}
          <h4>Using Python's <code>pip</code> Package Manager</h4>
          <div className="bg-gray-900 p-6 rounded-lg my-4">
            <p>1. Install the custom chatbot package:</p>
            <code className="block bg-gray-800 p-2 rounded">pip install custom-chatbot</code>
          </div>
    
          {/* Using HTTP API Integration */}
          <h4>Using HTTP API Integration (No Installation Required)</h4>
          <div className="bg-gray-900 p-6 rounded-lg my-4">
            <p>1. Install <code>requests</code>:</p>
            <code className="block bg-gray-800 p-2 rounded">pip install requests</code>
            <p>2. Follow the integration guide to call your chatbot's API directly.</p>
          </div>
        </div>
      )
    },
    
    {
      id: 'api-reference',
      title: 'API Reference',
      content: (
        <div>
          <h3>Core API Methods</h3>
          <ul className="space-y-4 bg-gray-900 p-6 rounded-lg">
            <li>
              <strong>initialize()</strong>
              <p className="text-gray-400">Initializes the custom chatbot client with configuration.</p>
            </li>
            <li>
              <strong>createConversation()</strong>
              <p className="text-gray-400">Creates a new conversation instance for the chatbot.</p>
            </li>
            <li>
              <strong>sendMessage()</strong>
              <p className="text-gray-400">Sends a message to the chatbot and receives a response.</p>
            </li>
            <li>
              <strong>fetchAPIData()</strong>
              <p className="text-gray-400">Fetches data from the chatbot API for integration.</p>
            </li>
            <li>
              <strong>closeConversation()</strong>
              <p className="text-gray-400">Ends the current conversation session with the chatbot.</p>
            </li>
          </ul>
        </div>
      )
    },
    
    {
      id: 'examples',
      title: 'Examples',
      content: (
        <div>
          <h3>Basic Usage Example</h3>
          <div className="bg-gray-900 p-6 rounded-lg">
            <pre className="text-sm text-gray-300"><code>{`
    # Initialize the custom chatbot client
    const chatbot = new CustomChatbotClient();
    
    # Start a new conversation
    const conversation = chatbot.createConversation();
    
    # Send a message to the chatbot and get a response
    const response = await conversation.sendMessage(
      'Help me write a Python script to parse JSON.'
    );
    
    # Log the chatbot's response
    console.log(response.text);
            `.trim()}</code></pre>
          </div>
        </div>
      )
    }
    
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);

  const filteredSections = sections.filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-black text-white">
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 py-16 w-full">
          <aside className="w-full">
            <div className="sticky top-0 space-y-4">
              <input
                type="search"
                placeholder="Search documentation..."
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <nav className="space-y-1 w-full">
                {filteredSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      activeSection === section.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <main className="w-full">
            {sections.find(section => section.id === activeSection)?.content}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
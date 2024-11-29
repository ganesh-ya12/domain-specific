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
# Install the SDK
npm install @botforge/sdk

# Import and initialize
import { BotForge } from '@botforge/sdk';

const bot = new BotForge({
  apiKey: 'YOUR_API_KEY',
  model: 'gpt-4'
});

// Initialize the bot
await bot.initialize();
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
          <div className="bg-gray-900 p-6 rounded-lg my-4">
            <h4>NPM</h4>
            <code className="block bg-gray-800 p-2 rounded">npm install @botforge/sdk</code>
            
            <h4>Yarn</h4>
            <code className="block bg-gray-800 p-2 rounded mt-2">yarn add @botforge/sdk</code>
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
              <p className="text-gray-400">Initializes the BotForge client with configuration.</p>
            </li>
            <li>
              <strong>createConversation()</strong>
              <p className="text-gray-400">Creates a new conversation instance.</p>
            </li>
            <li>
              <strong>sendMessage()</strong>
              <p className="text-gray-400">Sends a message and receives a response.</p>
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
const conversation = bot.createConversation();

const response = await conversation.sendMessage(
  'Help me write a Python script to parse JSON.'
);

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
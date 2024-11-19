// Documentation.jsx
const Documentation = () => {
    const sections = [
      { id: 'getting-started', title: 'Getting Started' },
      { id: 'installation', title: 'Installation' },
      { id: 'api-reference', title: 'API Reference' },
      { id: 'examples', title: 'Examples' }
    ];
  
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-24">
            <div className="grid lg:grid-cols-[300px_1fr] gap-8">
              {/* Sidebar */}
              <aside className="lg:block">
                <div className="sticky top-24 space-y-8">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search docs..."
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-4 pr-10 py-2 text-white placeholder-gray-400"
                    />
                  </div>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg"
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
  
              {/* Main Content */}
              <main className="prose prose-invert max-w-none">
                <h1>Documentation</h1>
                <p className="lead">Learn how to integrate BotForge into your applications.</p>
  
                <section id="getting-started">
                  <h2>Getting Started</h2>
                  <p>Follow these steps to start building with BotForge.</p>
  
                  <div className="bg-gray-900 p-6 rounded-lg mb-6">
                    <pre className="text-sm text-gray-300"><code>{`
  npm install @botforge/sdk
  
  import { BotForge } from '@botforge/sdk';
  
  const bot = new BotForge({
    apiKey: 'your-api-key',
    model: 'gpt-4'
  });
  
  await bot.initialize();
                    `}</code></pre>
                  </div>
                </section>
  
                <section id="api-reference">
                  <h2>API Reference</h2>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <h3>Key Concepts</h3>
                    <ul className="space-y-4">
                      <li>
                        <strong>Conversations</strong>
                        <p className="text-gray-400">Manage chat sessions and message history.</p>
                      </li>
                      <li>
                        <strong>Models</strong>
                        <p className="text-gray-400">Choose and configure AI models for your use case.</p>
                      </li>
                      <li>
                        <strong>Customization</strong>
                        <p className="text-gray-400">Fine-tune responses and behavior.</p>
                      </li>
                    </ul>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export { Documentation };
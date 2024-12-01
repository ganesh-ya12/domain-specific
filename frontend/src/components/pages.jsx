// Home.jsx
import React from 'react';
import { Bot, Code, Shield, Zap, ChevronRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                Build Powerful AI Chatbots
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Deploy intelligent chatbots in minutes. Enhance your application with AI-powered conversations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/chat" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:opacity-90"
                >
                  Try Demo
                </Link>
                <Link 
                  to="/docs" 
                  className="bg-white/10 text-white px-8 py-3 rounded-lg hover:bg-white/20 backdrop-blur-sm"
                >
                  View Docs
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20 backdrop-blur-3xl" />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Powerful Features</h2>
            <p className="text-gray-400 mt-4">Everything you need to build amazing conversational experiences</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Code}
              title="Easy Integration"
              description="Simple API and SDKs for all major platforms"
            />
            <FeatureCard 
              icon={Shield}
              title="Enterprise Security"
              description="End-to-end encryption and data privacy"
            />
            <FeatureCard 
              icon={MessageCircle}
              title="Smart Responses"
              description="Powered by advanced language models"
            />
          </div>
        </div>
      </section>

      {/* Code Preview */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Simple to Integrate</h2>
              <p className="text-gray-400 mb-8">Add a powerful chatbot to your application with just a few lines of code.</p>
              <Link to="/docs" className="text-purple-400 hover:text-purple-300 flex items-center group">
                Read Documentation 
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-black rounded-lg p-6 shadow-2xl">
              <pre className="text-sm text-gray-300">
                <code>{`
import { BotForge } from '@botforge/sdk';

const bot = new BotForge({
  apiKey: 'your-api-key'
});

// Initialize the chatbot
await bot.initialize();

// Handle user messages
bot.on('message', async (msg) => {
  const response = await bot.reply(msg);
  console.log(response);
});`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to get started?</h2>
          <Link 
            to="/docs" 
            className="bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 inline-flex items-center"
          >
            Get Started
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all">
    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-purple-400" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

// Documentation.jsx
const Documentation = () => (
  <div className="bg-black min-h-screen pt-20">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-[300px_1fr] gap-8">
      <aside className="hidden md:block">
        <div className="sticky top-24 space-y-6">
          <div className="relative">
            <input
              type="search"
              placeholder="Search..."
              className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
          <nav className="space-y-1">
            {[
              { title: 'Getting Started', icon: Book },
              { title: 'API Reference', icon: Code },
              { title: 'SDK Documentation', icon: Terminal },
              { title: 'Examples', icon: MessageCircle }
            ].map(item => (
              <a
                key={item.title}
                href="#"
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>
      <main className="pt-4 pb-20">
        <div className="prose prose-invert max-w-none">
          <h1>Getting Started</h1>
          <p>Learn how to integrate BotForge into your application in minutes.</p>

          <h2>Installation</h2>
          <pre className="bg-gray-900 p-4 rounded-lg">
            <code>npm install @botforge/sdk</code>
          </pre>

          <h2>Basic Usage</h2>
          <pre className="bg-gray-900 p-4 rounded-lg">
            <code>{`
import { BotForge } from '@botforge/sdk';

const bot = new BotForge({
  apiKey: 'your-api-key',
  model: 'gpt-4',
  temperature: 0.7
});

// Initialize the chatbot
await bot.initialize();

// Handle user input
bot.on('message', async (message) => {
  const response = await bot.reply(message);
  console.log(response);
});
            `}</code>
          </pre>
        </div>
      </main>
    </div>
  </div>
);

// About.jsx
const About = () => (
  <div className="bg-black min-h-screen pt-20">
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">About BotForge</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-gray-400">
            We're on a mission to make AI-powered conversations accessible to every developer. 
            Our platform provides the tools and infrastructure needed to build the next generation 
            of intelligent applications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Technology</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Advanced AI Models</h3>
              <p className="text-gray-400">
                Powered by state-of-the-art language models including GPT-4 and Claude
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Scalable Infrastructure</h3>
              <p className="text-gray-400">
                Built on distributed systems for high availability and performance
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Alex Chen', role: 'CEO', image: '/placeholder.jpg' },
              { name: 'Sarah Kim', role: 'CTO', image: '/placeholder.jpg' },
              { name: 'Mike Ross', role: 'Head of AI', image: '/placeholder.jpg' }
            ].map(member => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 rounded-full bg-gray-800 mx-auto mb-4" />
                <h3 className="text-white font-medium">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

// Contact.jsx
const Contact = () => (
  <div className="bg-black min-h-screen pt-20">
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-400 mb-6">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-400">
              <Mail className="w-5 h-5" />
              <span>support@botforge.ai</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <MapPin className="w-5 h-5" />
              <span>123 AI Street, Tech City</span>
            </div>
          </div>
        </div>
        
        <form className="space-y-6 bg-gray-900 p-6 rounded-lg">
          <div>
            <label className="block text-gray-400 mb-2">Name</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Email</label>
            <input
              type="email"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Message</label>
            <textarea
              rows="4"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            ></textarea>
          </div>
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:opacity-90">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
);

export { Home, Documentation, About, Contact };
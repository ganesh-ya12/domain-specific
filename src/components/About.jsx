// About.jsx
import React from 'react';
import { Bot, Server, ShieldCheck } from 'lucide-react';

const About = () => (
  <div className="min-h-screen bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">About BotForge</h1>
        <p className="text-lg text-gray-400">
          Building the future of conversational AI, making it accessible to every developer.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-20">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            We're on a mission to make AI-powered conversations accessible to every developer. Our platform 
            provides the tools and infrastructure needed to build the next generation of intelligent applications.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <Bot className="h-8 w-8 text-indigo-500 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-4">Advanced AI Models</h3>
          <p className="text-gray-400">
            Powered by state-of-the-art language models including GPT-4 and Claude, delivering human-like 
            conversations with deep understanding.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <Server className="h-8 w-8 text-indigo-500 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-4">Scalable Infrastructure</h3>
          <p className="text-gray-400">
            Built on distributed systems for high availability and performance, handling millions of 
            conversations seamlessly.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-12">Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Alex Chen', role: 'CEO & Founder', image: 'alex.jpg' },
            { name: 'Sarah Kim', role: 'CTO', image: 'sarah.jpg' },
            { name: 'Mike Ross', role: 'Head of AI', image: 'mike.jpg' }
          ].map((member) => (
            <div key={member.name} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="w-24 h-24 rounded-full bg-gray-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default About;
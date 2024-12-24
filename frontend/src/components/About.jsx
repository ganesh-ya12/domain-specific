// About.jsx
import React from 'react';
import { Bot, Server, ShieldCheck } from 'lucide-react';

const About = () => (
  <div className="min-h-screen w-screen bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">About BotForge</h1>
        <p className="text-lg text-gray-400">
          Revolutionizing customer support and business automation by creating domain-specific chatbots tailored to your industry needs.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-20">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            At BotForage, we aim to empower businesses with custom-built, domain-specific chatbots. By tailoring chatbots to your industry's needs, we enable smarter customer interactions, streamline workflows, and drive growth.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <Bot className="h-8 w-8 text-indigo-500 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-4">Customizable AI Models</h3>
          <p className="text-gray-400">
            BotForge is powered by adaptable AI models, fine-tuned to understand and respond based on your specific industry knowledge, ensuring relevant and accurate conversations.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <Server className="h-8 w-8 text-indigo-500 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-4">Scalable Infrastructure</h3>
          <p className="text-gray-400">
            Built on scalable cloud infrastructure, BotForage can handle high volumes of interactions, providing consistent and efficient service at scale.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-12">Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Alex Chen', role: 'CEO & Founder', image: '/businessman-with-glasses-manager-work-employee-vector-12131842.svg' },
            { name: 'Sarah Kim', role: 'CTO', image: '/employee-woman-vector-23342236.svg' },
            { name: 'Mike Ross', role: 'Head of AI', image: '/front-face-portrait-avatar-office-employee-vector-3212413.svg' }
          ].map((member) => (
            <div key={member.name} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="w-24 h-24 rounded-full bg-gray-800 mx-auto mb-4">
                <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover" />
              </div>
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

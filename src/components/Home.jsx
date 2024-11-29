// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Code, Shield, Zap, ChevronRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-indigo-500/50 transition-all">
    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-indigo-500" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="relative overflow-hidden bg-black w-screen">
      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Build Smarter AI Chatbots
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 leading-relaxed">
              Deploy intelligent chatbots in minutes. Enhance your application with AI-powered conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/chat" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all transform hover:scale-105"
              >
                Try Demo
              </Link>
              <Link 
                to="/docs" 
                className="group bg-white/5 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-all transform hover:scale-105 backdrop-blur-sm"
              >
                View Docs
                <ChevronRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to build amazing conversational experiences
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Code}
              title="Easy Integration"
              description="Simple API and SDKs for all major platforms. Get started with just a few lines of code."
            />
            <FeatureCard 
              icon={Shield}
              title="Enterprise Security"
              description="End-to-end encryption and data privacy. SOC2 compliance and custom data residency options."
            />
            <FeatureCard 
              icon={Zap}
              title="Smart Responses"
              description="Powered by state-of-the-art language models including GPT-4 and Claude."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of developers building the future of conversation.
          </p>
          <Link 
            to="/docs" 
            className="inline-flex items-center bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Get Started
            <ChevronRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
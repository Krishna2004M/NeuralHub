import React from 'react';
import { Image, MessageSquare, MicIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ToolsList() {
  const tools = [
    {
      id: 'image-generation',
      name: 'Image Generation',
      description: 'Create stunning images from text descriptions using state-of-the-art AI models.',
      icon: <Image className="h-6 w-6" />,
      status: 'Available',
    },
    {
      id: 'chatbot',
      name: 'Chatbot Assistant',
      description: 'Engage with our advanced AI chatbot for help, conversation, and problem-solving.',
      icon: <MessageSquare className="h-6 w-6" />,
      status: 'Available',
    },
    {
      id: 'text-analysis',
      name: 'Voice Assistance',
      description: 'Provide seamless voice assistance, interpret spoken commands, deliver intelligent responses, and create an interactive audio experience.',
      icon: <MicIcon className="h-6 w-6" />,
      status: 'Available',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">AI Tools</h1>
        <p className="mt-2 text-slate-600">Select a tool to get started with your AI-powered tasks.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.id}
            className="group relative bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
          >
            <div>
              <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-600 ring-4 ring-white">
                {tool.icon}
              </span>
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-slate-900">{tool.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {tool.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
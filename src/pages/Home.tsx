import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain,
  Image,
  MessageSquare,
  MicIcon,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Image className="h-6 w-6" />,
      title: 'Image Generation',
      description: 'Create stunning images from text descriptions using state-of-the-art AI models.'
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Chatbot Assistant',
      description: 'Engage with our advanced AI chatbot for help, conversation, and problem-solving.'
    },
    {
      icon: <MicIcon className="h-6 w-6" />,
      title: 'Voice Assistance',
      description: 'Provide seamless voice assistance, interpret spoken commands, deliver intelligent responses, and create an interactive audio experience.'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
                Harness the Power of AI
              </h1>
              <p className="mt-6 text-xl lg:text-2xl">
                Access powerful AI tools for image generation, text analysis, and more. Transform your ideas into reality with our suite of AI-powered solutions.
              </p>
              <div className="mt-10 flex gap-4">
                <Link
                  to="/tools"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
                >
                  Try AI Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/auth"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-100 bg-indigo-900 hover:bg-indigo-800"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="relative">
                <div className="aspect-w-5 aspect-h-3">
                  <img
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80"
                    alt="AI Visualization"
                    className="rounded-lg shadow-xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Powerful AI Tools at Your Fingertips
            </h2>
            <p className="mt-4 text-xl text-slate-600">
              Everything you need to bring your ideas to life with AI
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-600 ring-4 ring-white">
                      {feature.icon}
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-slate-900">
                      <Link to="/tools" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {feature.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                  <span
                    className="pointer-events-none absolute top-6 right-6 text-slate-300 group-hover:text-indigo-400 transition-colors"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-200">Start using our AI tools today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
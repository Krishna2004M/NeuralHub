import React from 'react';
import { HelpCircle, Book, MessageCircle, Mail } from 'lucide-react';

export default function Help() {
  const faqs = [
    {
      question: 'How do I get started with the AI tools?',
      answer: 'Sign up for an account, navigate to the Tools section, and select the tool you want to use. Each tool has its own interface and instructions.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and cryptocurrency payments for premium features and API credits.',
    },
    {
      question: 'How do I manage my API keys?',
      answer: 'You can manage your API keys in the Dashboard under the API Keys section. You can create, revoke, and monitor usage for each key.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900">Help Center</h1>
        <p className="mt-2 text-slate-600">Find answers to common questions and learn how to use our AI tools.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <Book className="h-6 w-6 text-indigo-600" />
          <h3 className="mt-4 text-lg font-medium text-slate-900">Documentation</h3>
          <p className="mt-2 text-sm text-slate-500">
            Detailed guides and API documentation for all our tools.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <MessageCircle className="h-6 w-6 text-indigo-600" />
          <h3 className="mt-4 text-lg font-medium text-slate-900">Community Support</h3>
          <p className="mt-2 text-sm text-slate-500">
            Join our community forum for discussions and peer support.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <Mail className="h-6 w-6 text-indigo-600" />
          <h3 className="mt-4 text-lg font-medium text-slate-900">Contact Support</h3>
          <p className="mt-2 text-sm text-slate-500">
            Get in touch with our support team for personalized help.krishbabu2004@gmail.com
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="px-6 py-5 border-b border-slate-200">
          <h2 className="text-lg font-medium text-slate-900">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {faqs.map((faq, index) => (
            <div key={index} className="px-6 py-4">
              <h3 className="text-sm font-medium text-slate-900">{faq.question}</h3>
              <p className="mt-2 text-sm text-slate-500">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
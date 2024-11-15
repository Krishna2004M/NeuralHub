import React from 'react';
import { Brain, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-slate-900">NeuralHub</span>
            </Link>
            <p className="mt-4 text-sm text-slate-600">
              Empowering creativity and innovation through AI technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/tools" className="text-base text-slate-600 hover:text-slate-900">
                  AI Tools
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-base text-slate-600 hover:text-slate-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-base text-slate-600 hover:text-slate-900">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/privacy" className="text-base text-slate-600 hover:text-slate-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-slate-600 hover:text-slate-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">
              Connect With Us
            </h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-slate-600 hover:text-slate-900">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <p className="text-base text-slate-500 text-center">
            © {new Date().getFullYear()} NeuralHub. All rights reserved.Developed by M Krishna
          </p>
        </div>
      </div>
    </footer>
  );
}
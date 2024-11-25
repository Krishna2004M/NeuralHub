import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-slate-900">NeuralHub</span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              <Link to="/tools" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100">
                AI Tools
              </Link>
              <Link to="/help" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100">
                Help Center
              </Link>
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </button>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/tools"
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              AI Tools
            </Link>
            <Link
              to="/help"
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              Help Center
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
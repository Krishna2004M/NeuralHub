import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, Key, History, BarChart } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name}!</h1>
        <p className="mt-2 text-slate-600">Manage your account and view your AI usage statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-900">API Credits</h3>
            <BarChart className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">1,500</p>
          <p className="text-sm text-slate-600">Credits remaining</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-900">API Keys</h3>
            <Key className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">2</p>
          <p className="text-sm text-slate-600">Active keys</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="px-6 py-5 border-b border-slate-200">
          <h3 className="text-lg font-medium text-slate-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {[1, 2, 3].map((item) => (
            <div key={item} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <History className="h-5 w-5 text-slate-500" />
                  <span className="ml-3 text-sm text-slate-900">Image Generation</span>
                </div>
                <span className="text-sm text-slate-500">2 hours ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
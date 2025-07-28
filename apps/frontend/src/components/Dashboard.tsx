import { useState, useEffect } from 'react';
import { authService } from '../services/auth';
import { candidateService } from '../services/candidate';
import type { User } from '../services/auth';
import type { CandidateStatistics } from '../types/candidate';
import CandidateList from './CandidateList';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<CandidateStatistics | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await candidateService.getStatistics();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to load statistics:', error);
      }
    };

    loadStats();
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    onLogout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                PeopleBox ATS
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-700">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Welcome Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Welcome back, {user?.name}!
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Manage your candidates and track applications.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Quick Stats */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-indigo-600">Total Candidates</p>
                      <p className="text-xl font-bold text-gray-900">{stats?.total || 0}</p>
                    </div>
                    <div className="h-6 w-6 bg-indigo-100 rounded-md flex items-center justify-center">
                      <svg className="h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-green-600">New Applications</p>
                      <p className="text-xl font-bold text-gray-900">{stats?.by_status?.new || 0}</p>
                    </div>
                    <div className="h-6 w-6 bg-green-100 rounded-md flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Account Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-indigo-700">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Member since</span>
                    <span className="font-medium text-gray-900">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Development Status */}
            <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Development Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">✅ Auth system (Sanctum + React Login)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">✅ Candidate model and CRUD operations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
                  <span className="text-xs text-gray-500">⏳ Meilisearch live search</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
                  <span className="text-xs text-gray-500">⏳ Tailwind UI development</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
                  <span className="text-xs text-gray-500">⏳ Queue + Redis email notifications</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Candidates List */}
        <CandidateList />
      </main>
    </div>
  );
};

export default Dashboard; 
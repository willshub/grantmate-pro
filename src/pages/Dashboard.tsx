import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { ClientCard } from '../components/ui/ClientCard';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { Client } from '../types';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // State for real data from Supabase
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch clients from Supabase
  useEffect(() => {
    const fetchClients = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching clients:', error);
          setError('Failed to load clients');
          setClients([]);
        } else {
          setClients(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [user?.id]);

  const [stats] = useState({
    totalClients: clients.length,
    activeDrafts: 4,
    completedApplications: 12,
    upcomingDeadlines: 2
  });

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-bg">
      {/* Header */}
      <header className="bg-white border-b border-slate-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-consultant-blue rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">GM</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">GrantMate Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.user_metadata?.full_name || user?.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to your Grant Writing Workspace
          </h1>
          <p className="text-lg text-gray-600">
            Manage your clients, track applications, and accelerate your grant writing process.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-slate-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Clients</CardTitle>
              <svg className="w-4 h-4 text-consultant-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? '...' : clients.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Drafts</CardTitle>
              <svg className="w-4 h-4 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.activeDrafts}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed Applications</CardTitle>
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.completedApplications}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Upcoming Deadlines</CardTitle>
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.upcomingDeadlines}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white border-slate-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <svg className="w-5 h-5 text-consultant-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Client
              </CardTitle>
              <CardDescription>
                Create a new client profile to start managing their grant applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/clients/new">
                <Button className="w-full">
                  Create Client Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <svg className="w-5 h-5 text-success-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                AI Application Writer
              </CardTitle>
              <CardDescription>
                Start a new grant application with AI-powered assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/writer/new">
                <Button variant="outline" className="w-full">
                  Start New Application
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Clients Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Your Clients</h2>
            <Link to="/client-form">
              <Button className="bg-consultant-blue hover:bg-blue-700">
                Add New Client
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg border border-slate-border p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : clients.length === 0 ? (
            <Card className="bg-white border-slate-border">
              <CardContent className="py-12 text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
                <p className="text-gray-600 mb-6">
                  Start by adding your first client to begin managing grant applications.
                </p>
                <Link to="/client-form">
                  <Button className="bg-consultant-blue hover:bg-blue-700">
                    Add Your First Client
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => (
                <ClientCard 
                  key={client.id} 
                  client={client} 
                  onClientUpdate={(updatedClient) => {
                    setClients(prev => prev.map(c => 
                      c.id === updatedClient.id ? updatedClient : c
                    ));
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
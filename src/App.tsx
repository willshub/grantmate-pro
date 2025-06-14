import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Homepage from './pages/Homepage';
import ComponentDemo from './pages/ComponentDemo';
import GrantSearch from './pages/GrantSearch';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Dashboard from './pages/Dashboard';
import ClientProfile from './pages/ClientProfile';
import ClientForm from './pages/ClientForm';
import ApplicationWriter from './pages/ApplicationWriter';
import './App.css';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-consultant-blue rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">GM</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }
  
  return <>{children}</>;
};

// Public Route component (redirects to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-consultant-blue rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">GM</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/demo" element={<ComponentDemo />} />
            <Route path="/search" element={<GrantSearch />} />
            
            {/* Auth Routes */}
            <Route path="/auth/signin" element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            } />
            <Route path="/auth/signup" element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Client Management */}
            <Route path="/client-form" element={
              <ProtectedRoute>
                <ClientForm />
              </ProtectedRoute>
            } />
            <Route path="/clients/new" element={
              <ProtectedRoute>
                <ClientForm />
              </ProtectedRoute>
            } />
            <Route path="/clients/:clientId" element={
              <ProtectedRoute>
                <ClientProfile />
              </ProtectedRoute>
            } />
            <Route path="/clients/:clientId/edit" element={
              <ProtectedRoute>
                <ClientForm />
              </ProtectedRoute>
            } />
            
            {/* Application Writer */}
            <Route path="/writer/new" element={
              <ProtectedRoute>
                <ApplicationWriter />
              </ProtectedRoute>
            } />
            <Route path="/writer/:applicationId" element={
              <ProtectedRoute>
                <ApplicationWriter />
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

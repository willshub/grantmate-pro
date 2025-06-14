import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { GrantPreview } from '../components/ui/GrantPreview';
import type { Client, Grant, Application } from '../types';

const ClientProfile: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();

  // Mock data - in real app, this would come from Supabase
  const [client] = useState<Client>({
    id: clientId || '1',
    user_id: 'user1',
    name: 'Community Education Foundation',
    industry_focus_area: 'Education & Workforce Development',
    mission_statement: 'The Community Education Foundation is dedicated to empowering underserved communities through innovative educational programs and digital literacy initiatives. Our mission is to bridge the opportunity gap by providing access to quality educational resources, technology training, and workforce development programs that enable individuals and families to achieve economic stability and long-term success.',
    contact_person: 'Sarah Johnson',
    contact_info: 'sarah.johnson@cedfoundation.org | (555) 123-4567',
    tags: ['Education', 'Rural', 'Technology', 'Workforce Development'],
    created_at: '2024-01-15',
    updated_at: '2024-03-10'
  });

  const [applications] = useState<Application[]>([
    {
      id: '1',
      client_id: client.id,
      grant_id: '1',
      title: 'Rural Digital Literacy Initiative',
      status: 'draft',
      created_at: '2024-03-01',
      updated_at: '2024-03-10',
      deadline: '2024-04-15'
    },
    {
      id: '2',
      client_id: client.id,
      grant_id: '2',
      title: 'Community Workforce Development Program',
      status: 'submitted',
      created_at: '2024-02-15',
      updated_at: '2024-02-28',
      deadline: '2024-03-30'
    }
  ]);

  const [availableGrants] = useState<Grant[]>([
    {
      id: '3',
      funding_opportunity_number: 'DOL-WD-2024-0789',
      category: 'Workforce Development',
      posted_date: '2024-03-05',
      deadline: '2024-05-20',
      total_funding: 3000000,
      max_award_amount: 200000,
      eligibility: 'Non-profit organizations serving rural or underserved populations with workforce development programs.',
      program_summary: 'Supporting comprehensive workforce development programs that provide job training, career counseling, and placement services for underemployed and unemployed individuals.',
      application_link: 'https://grants.gov/dol-wd-2024-0789',
      created_at: '2024-03-05',
      updated_at: '2024-03-05'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-success-green/10 text-success-green';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'submitted':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        );
      case 'approved':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-bg">
      {/* Header */}
      <header className="bg-white border-b border-slate-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-slate-border" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{client.name}</h1>
                <p className="text-sm text-gray-600">{client.industry_focus_area}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link to={`/writer/new?client=${client.id}`}>
                <Button>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Application
                </Button>
              </Link>
              <Button variant="outline">
                Edit Client
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Client Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Client Information */}
            <Card className="bg-white border-slate-border">
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Organization Name</label>
                  <p className="text-gray-900 mt-1">{client.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Focus Area</label>
                  <p className="text-gray-900 mt-1">{client.industry_focus_area}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Primary Contact</label>
                  <p className="text-gray-900 mt-1">{client.contact_person}</p>
                  <p className="text-sm text-gray-600">{client.contact_info}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Tags</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {client.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-consultant-blue/10 text-consultant-blue text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mission Statement */}
            <Card className="bg-white border-slate-border">
              <CardHeader>
                <CardTitle>Mission Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{client.mission_statement}</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Applications & Grants */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Applications */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Applications</h2>
                  <p className="text-gray-600">Track progress on grant applications</p>
                </div>
                <Link to={`/writer/new?client=${client.id}`}>
                  <Button>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Start New Application
                  </Button>
                </Link>
              </div>

              {applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <Card key={application.id} className="bg-white border-slate-border">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{application.title}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                                {getStatusIcon(application.status)}
                                <span className="ml-1 capitalize">{application.status}</span>
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>Created: {new Date(application.created_at).toLocaleDateString()}</span>
                              <span>Deadline: {new Date(application.deadline).toLocaleDateString()}</span>
                              <span>Last updated: {new Date(application.updated_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Link to={`/writer/${application.id}`}>
                              <Button variant="outline" size="sm">
                                {application.status === 'draft' ? 'Continue' : 'View'}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white border-slate-border">
                  <CardContent className="py-12 text-center">
                    <div className="w-16 h-16 bg-success-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-600 mb-6">Start your first grant application for this client</p>
                    <Link to={`/writer/new?client=${client.id}`}>
                      <Button>Start First Application</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </section>

            {/* Available Grants */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Recommended Grants</h2>
                  <p className="text-gray-600">Funding opportunities that match this client</p>
                </div>
                <Link to="/grants">
                  <Button variant="outline">
                    Browse All Grants
                  </Button>
                </Link>
              </div>

              <div className="space-y-6">
                {availableGrants.map((grant) => (
                  <GrantPreview
                    key={grant.id}
                    grant={grant}
                    onAttachToClient={() => console.log('Attach grant to client')}
                    onViewDetails={() => console.log('View grant details')}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile; 
import React, { useState } from 'react';
import { ClientCard } from '../components/ui/ClientCard';
import { GrantPreview } from '../components/ui/GrantPreview';
import { WizardStepper } from '../components/ui/WizardStepper';
import { AISectionEditor } from '../components/ui/AISectionEditor';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import type { Client, Grant } from '../types';

const ComponentDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [content, setContent] = useState(`Problem Statement

Our client, the Community Education Foundation, faces significant challenges in providing quality educational resources to underserved populations in rural areas. Despite having a strong track record of success in urban settings, the foundation struggles with limited infrastructure, reduced internet connectivity, and a lack of qualified instructional staff in these remote locations.

The digital divide has become increasingly pronounced, particularly in the wake of the COVID-19 pandemic, which highlighted the critical need for accessible educational technology solutions. Current statistics indicate that 25% of rural households lack access to reliable internet services, directly impacting student learning outcomes and educational equity.

This funding will enable the foundation to address these systemic barriers through innovative program development and strategic partnerships with local organizations.`);

  // Mock data
  const sampleClient: Client = {
    id: '1',
    user_id: 'user1',
    name: 'Community Education Foundation',
    industry_focus_area: 'Education & Workforce Development',
    mission_statement: 'Empowering underserved communities through innovative educational programs and digital literacy initiatives that bridge the opportunity gap.',
    contact_person: 'Sarah Johnson',
    contact_info: 'sarah.johnson@cedfoundation.org',
    tags: ['Education', 'Rural', 'Technology'],
    created_at: '2024-01-15',
    updated_at: '2024-03-10'
  };

  const sampleGrant: Grant = {
    id: '1',
    funding_opportunity_number: 'DOE-EDU-2024-0123',
    category: 'Educational Technology',
    posted_date: '2024-02-01',
    deadline: '2024-04-15',
    total_funding: 2500000,
    max_award_amount: 150000,
    eligibility: 'Non-profit organizations with 501(c)(3) status, public school districts, and accredited institutions of higher education serving rural or underserved populations.',
    program_summary: 'The Rural Education Technology Initiative supports innovative programs that improve educational outcomes through technology integration, professional development, and community partnerships in underserved areas.',
    application_link: 'https://grants.gov/doe-edu-2024-0123',
    created_at: '2024-02-01',
    updated_at: '2024-02-01'
  };

  const wizardSteps = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      description: 'Organization details',
      isCompleted: true,
      isActive: false
    },
    {
      id: 'project-overview',
      title: 'Project Overview',
      description: 'Goals and objectives',
      isCompleted: true,
      isActive: false
    },
    {
      id: 'problem-statement',
      title: 'Problem Statement',
      description: 'Current section',
      isCompleted: false,
      isActive: true
    },
    {
      id: 'methodology',
      title: 'Methodology',
      description: 'Approach and timeline',
      isCompleted: false,
      isActive: false
    },
    {
      id: 'budget',
      title: 'Budget',
      description: 'Financial planning',
      isCompleted: false,
      isActive: false
    }
  ];

  const comments = [
    {
      id: '1',
      text: 'Consider adding specific statistics about internet connectivity in the target region to strengthen the problem statement.',
      author: 'Sarah Johnson',
      timestamp: '2 hours ago',
      resolved: false
    },
    {
      id: '2',
      text: 'Great connection to COVID-19 impact. This adds urgency to the proposal.',
      author: 'Grant Writer',
      timestamp: '1 day ago',
      resolved: true
    }
  ];

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
              <span className="text-sm text-gray-500 ml-4">Component Demo</span>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Design System Components</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Showcasing the professional, minimalist UI components designed specifically for grant consultants.
          </p>
        </div>

        <div className="space-y-12">
          {/* Client Cards Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Client Cards</h2>
              <p className="text-gray-600">Card-based design for client management with clear hierarchy and quick actions.</p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <ClientCard
                client={sampleClient}
                applicationCount={3}
                lastUpdated="2 days ago"
                onViewDetails={() => console.log('View details')}
                onNewApplication={() => console.log('New application')}
              />
              <ClientCard
                client={{
                  ...sampleClient,
                  name: 'Healthcare Access Initiative',
                  industry_focus_area: 'Public Health & Community Services',
                  mission_statement: 'Improving healthcare access and outcomes in underserved communities through innovative service delivery models.',
                  tags: ['Healthcare', 'Community', 'Access'],
                  contact_person: 'Dr. Michael Chen'
                }}
                applicationCount={1}
                lastUpdated="1 week ago"
                onViewDetails={() => console.log('View details')}
                onNewApplication={() => console.log('New application')}
              />
            </div>
          </section>

          {/* Grant Preview Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Grant Previews</h2>
              <p className="text-gray-600">Professional grant opportunity cards with deadline tracking and clear funding information.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <GrantPreview
                grant={sampleGrant}
                onAttachToClient={() => console.log('Attach to client')}
                onViewDetails={() => console.log('View grant details')}
                isDeadlineSoon={true}
              />
              <GrantPreview
                grant={{
                  ...sampleGrant,
                  funding_opportunity_number: 'NSF-STEM-2024-0456',
                  category: 'STEM Education',
                  deadline: '2024-06-30',
                  total_funding: 5000000,
                  max_award_amount: 250000,
                  program_summary: 'Supporting innovative STEM education programs that increase participation and achievement among underrepresented groups in science, technology, engineering, and mathematics fields.'
                }}
                onAttachToClient={() => console.log('Attach to client')}
                onViewDetails={() => console.log('View grant details')}
              />
            </div>
          </section>

          {/* Wizard Stepper Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Wizard Progress</h2>
              <p className="text-gray-600">Clear progress indication with autosave status for the application wizard.</p>
            </div>
            <Card className="bg-white border-slate-border">
              <CardContent className="p-0">
                <WizardStepper
                  steps={wizardSteps}
                  currentStepIndex={currentStep}
                  onStepClick={setCurrentStep}
                  lastSaved="2:34 PM"
                  autoSaving={false}
                />
              </CardContent>
            </Card>
          </section>

          {/* AI Section Editor */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">AI Section Editor</h2>
              <p className="text-gray-600">Two-panel layout with content editing and collaborative feedback system.</p>
            </div>
            <Card className="bg-white border-slate-border overflow-hidden">
              <CardContent className="p-0 h-[600px]">
                <AISectionEditor
                  sectionTitle="Problem Statement"
                  content={content}
                  onContentChange={setContent}
                  onSave={() => console.log('Saving content')}
                  onRegenerateAI={() => console.log('Regenerating with AI')}
                  comments={comments}
                  lastSaved="2:34 PM"
                />
              </CardContent>
            </Card>
          </section>

          {/* Design Principles */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Design Principles</h2>
              <p className="text-gray-600">Key principles guiding the GrantMate Pro interface design.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border-slate-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-consultant-blue/10 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-consultant-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <CardTitle className="text-lg">Card-Based Design</CardTitle>
                  <p className="text-sm text-gray-600">Clear visual hierarchy with card containers for organized information display.</p>
                </CardHeader>
              </Card>

              <Card className="bg-white border-slate-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-success-green/10 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <CardTitle className="text-lg">Professional Spacing</CardTitle>
                  <p className="text-sm text-gray-600">Generous whitespace and consistent spacing for a clean, professional feel.</p>
                </CardHeader>
              </Card>

              <Card className="bg-white border-slate-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <CardTitle className="text-lg">Two-Panel Layouts</CardTitle>
                  <p className="text-sm text-gray-600">Efficient workflows with navigation and content split for better productivity.</p>
                </CardHeader>
              </Card>

              <Card className="bg-white border-slate-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <CardTitle className="text-lg">Accessible Interactions</CardTitle>
                  <p className="text-sm text-gray-600">Keyboard navigation, focus states, and clear interactive elements for all users.</p>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Color Palette */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Color Palette</h2>
              <p className="text-gray-600">Professional color scheme with accessible contrast ratios.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-3">
                <div className="h-20 bg-consultant-blue rounded-xl flex items-center justify-center">
                  <span className="text-white font-medium">#2D6CDF</span>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">Consultant Blue</p>
                  <p className="text-sm text-gray-600">Primary brand color</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="h-20 bg-success-green rounded-xl flex items-center justify-center">
                  <span className="text-white font-medium">#5FD068</span>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">Success Green</p>
                  <p className="text-sm text-gray-600">Approvals & success</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="h-20 bg-slate-bg rounded-xl flex items-center justify-center border border-slate-border">
                  <span className="text-gray-700 font-medium">#F8FAFC</span>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">Slate Background</p>
                  <p className="text-sm text-gray-600">Light background areas</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="h-20 bg-white rounded-xl flex items-center justify-center border border-slate-border">
                  <span className="text-gray-700 font-medium">#FFFFFF</span>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">Pure White</p>
                  <p className="text-sm text-gray-600">Card & content areas</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComponentDemo; 
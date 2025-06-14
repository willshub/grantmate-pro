import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { WizardStepper } from '../components/ui/WizardStepper';
import { AISectionEditor } from '../components/ui/AISectionEditor';

const ApplicationWriter: React.FC = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams<{ applicationId: string }>();
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get('client');
  
  const isEditing = !!applicationId;
  const [currentStep, setCurrentStep] = useState(0);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState('');

  // Wizard form data
  const [wizardData, setWizardData] = useState({
    applicationTitle: '',
    selectedClient: clientId || '',
    grantOpportunity: '',
    projectTitle: '',
    projectDescription: '',
    fundingAmount: '',
    projectDuration: '',
    targetPopulation: '',
    geographicArea: '',
    organizationCapacity: ''
  });

  // AI-generated content for sections
  const [sections, setSections] = useState<{ [key: string]: string }>({
    'problem-statement': '',
    'project-description': '',
    'methodology': '',
    'evaluation': '',
    'budget-narrative': '',
    'organizational-capacity': ''
  });

  const [currentSection, setCurrentSection] = useState('problem-statement');
  const [showWizard, setShowWizard] = useState(!isEditing);

  const wizardSteps = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      description: 'Application setup',
      isCompleted: currentStep > 0,
      isActive: currentStep === 0
    },
    {
      id: 'project-overview',
      title: 'Project Overview',
      description: 'Goals and scope',
      isCompleted: currentStep > 1,
      isActive: currentStep === 1
    },
    {
      id: 'organization',
      title: 'Organization Details',
      description: 'Capacity and experience',
      isCompleted: currentStep > 2,
      isActive: currentStep === 2
    },
    {
      id: 'review',
      title: 'Review & Generate',
      description: 'Generate AI draft',
      isCompleted: currentStep > 3,
      isActive: currentStep === 3
    }
  ];

  const sectionSteps = [
    {
      id: 'problem-statement',
      title: 'Problem Statement',
      description: 'Define the need',
      isCompleted: !!sections['problem-statement'],
      isActive: currentSection === 'problem-statement'
    },
    {
      id: 'project-description',
      title: 'Project Description',
      description: 'Outline your solution',
      isCompleted: !!sections['project-description'],
      isActive: currentSection === 'project-description'
    },
    {
      id: 'methodology',
      title: 'Methodology',
      description: 'Implementation approach',
      isCompleted: !!sections['methodology'],
      isActive: currentSection === 'methodology'
    },
    {
      id: 'evaluation',
      title: 'Evaluation Plan',
      description: 'Measuring success',
      isCompleted: !!sections['evaluation'],
      isActive: currentSection === 'evaluation'
    },
    {
      id: 'budget-narrative',
      title: 'Budget Narrative',
      description: 'Financial justification',
      isCompleted: !!sections['budget-narrative'],
      isActive: currentSection === 'budget-narrative'
    },
    {
      id: 'organizational-capacity',
      title: 'Organizational Capacity',
      description: 'Qualifications and experience',
      isCompleted: !!sections['organizational-capacity'],
      isActive: currentSection === 'organizational-capacity'
    }
  ];

  const handleWizardInputChange = (field: string, value: string) => {
    setWizardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateDraft = async () => {
    setAutoSaving(true);
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI-generated content
      setSections({
        'problem-statement': `The ${wizardData.targetPopulation} in ${wizardData.geographicArea} faces significant challenges that ${wizardData.projectTitle} aims to address. Current data indicates a critical need for intervention in this area.\n\nSpecific challenges include:\n• Limited access to essential services\n• Lack of infrastructure and resources\n• Barriers to participation and engagement\n\nThis project will directly address these systemic issues through targeted interventions and community-based solutions.`,
        'project-description': `${wizardData.projectTitle} is a comprehensive initiative designed to ${wizardData.projectDescription}. The project will operate over ${wizardData.projectDuration} and serve ${wizardData.targetPopulation} in ${wizardData.geographicArea}.\n\nKey project components include:\n• Direct service delivery\n• Capacity building and training\n• Community engagement and outreach\n• Sustainable program development\n\nThe total project budget of $${wizardData.fundingAmount} will support these activities and ensure measurable outcomes.`,
        'methodology': `Our methodology combines evidence-based practices with community-driven approaches to ensure effectiveness and sustainability.\n\nImplementation phases:\n1. Planning and preparation (Months 1-2)\n2. Service delivery and implementation (Months 3-10)\n3. Evaluation and sustainability planning (Months 11-12)\n\nEach phase includes specific milestones, deliverables, and quality assurance measures.`,
        'evaluation': `The evaluation plan employs both formative and summative assessment strategies to measure project impact and effectiveness.\n\nKey performance indicators:\n• Number of participants served\n• Quality of services delivered\n• Participant satisfaction and outcomes\n• Sustainability measures\n\nData collection methods include surveys, interviews, focus groups, and administrative data analysis.`,
        'budget-narrative': `The requested funding of $${wizardData.fundingAmount} will be allocated across key budget categories to maximize impact and ensure fiscal responsibility.\n\nBudget breakdown:\n• Personnel (60%): Project staff and benefits\n• Direct services (25%): Program materials and supplies\n• Administrative costs (10%): Overhead and management\n• Evaluation (5%): Assessment and reporting activities`,
        'organizational-capacity': `${wizardData.organizationCapacity}\n\nOur organization brings extensive experience and proven capacity to successfully implement this project. Key strengths include:\n\n• Track record of successful grant management\n• Qualified and experienced staff\n• Strong community partnerships\n• Established infrastructure and systems\n• Commitment to quality and accountability`
      });
      
      setShowWizard(false);
      setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (error) {
      console.error('Error generating draft:', error);
    } finally {
      setAutoSaving(false);
    }
  };

  const handleSectionSave = () => {
    setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const handleRegenerateAI = async () => {
    setAutoSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simulate regenerated content
      const newContent = sections[currentSection] + "\n\n[AI Regenerated] Additional insights and recommendations based on current best practices and recent research findings.";
      setSections(prev => ({
        ...prev,
        [currentSection]: newContent
      }));
    } finally {
      setAutoSaving(false);
    }
  };

  const comments = [
    {
      id: '1',
      text: 'Consider adding specific statistics to strengthen this section.',
      author: 'AI Assistant',
      timestamp: '5 min ago',
      resolved: false
    },
    {
      id: '2',
      text: 'Great connection to community needs. This aligns well with the funder\'s priorities.',
      author: 'Grant Writer',
      timestamp: '1 hour ago',
      resolved: true
    }
  ];

  if (showWizard) {
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
                  <h1 className="text-xl font-semibold text-gray-900">AI Application Writer</h1>
                  <p className="text-sm text-gray-600">Step-by-step grant application creation</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Wizard Progress */}
          <Card className="bg-white border-slate-border mb-8">
            <CardContent className="p-0">
              <WizardStepper
                steps={wizardSteps}
                currentStepIndex={currentStep}
                onStepClick={setCurrentStep}
                lastSaved={lastSaved}
                autoSaving={autoSaving}
              />
            </CardContent>
          </Card>

          {/* Wizard Content */}
          <Card className="bg-white border-slate-border">
            <CardHeader>
              <CardTitle>{wizardSteps[currentStep].title}</CardTitle>
              <CardDescription>{wizardSteps[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 0 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={wizardData.applicationTitle}
                      onChange={(e) => handleWizardInputChange('applicationTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent"
                      placeholder="Enter a name for this grant application"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grant Opportunity
                    </label>
                    <input
                      type="text"
                      value={wizardData.grantOpportunity}
                      onChange={(e) => handleWizardInputChange('grantOpportunity', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent"
                      placeholder="Grant name or funding opportunity number (optional)"
                    />
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={wizardData.projectTitle}
                      onChange={(e) => handleWizardInputChange('projectTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent"
                      placeholder="Enter the project title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={wizardData.projectDescription}
                      onChange={(e) => handleWizardInputChange('projectDescription', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent resize-vertical"
                      placeholder="Briefly describe what this project will do and accomplish"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Funding Amount Requested
                      </label>
                      <input
                        type="text"
                        value={wizardData.fundingAmount}
                        onChange={(e) => handleWizardInputChange('fundingAmount', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent"
                        placeholder="e.g., 150,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Duration
                      </label>
                      <input
                        type="text"
                        value={wizardData.projectDuration}
                        onChange={(e) => handleWizardInputChange('projectDuration', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent"
                        placeholder="e.g., 12 months"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Population
                      </label>
                      <input
                        type="text"
                        value={wizardData.targetPopulation}
                        onChange={(e) => handleWizardInputChange('targetPopulation', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent"
                        placeholder="Who will benefit from this project?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Geographic Area
                      </label>
                      <input
                        type="text"
                        value={wizardData.geographicArea}
                        onChange={(e) => handleWizardInputChange('geographicArea', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent"
                        placeholder="Where will the project take place?"
                      />
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organizational Capacity *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={wizardData.organizationCapacity}
                    onChange={(e) => handleWizardInputChange('organizationCapacity', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent resize-vertical"
                    placeholder="Describe your organization's experience, qualifications, and capacity to implement this project. Include relevant past projects, staff expertise, and organizational strengths."
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-success-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Generate Your Draft</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Our AI will create a professional grant application draft based on your inputs. You can then edit and refine each section.
                  </p>
                  <Button onClick={handleGenerateDraft} disabled={autoSaving} size="lg">
                    {autoSaving ? 'Generating Draft...' : 'Generate AI Draft'}
                  </Button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-border">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={currentStep === 3 ? handleGenerateDraft : handleNextStep}
                  disabled={currentStep === 3 ? autoSaving : false}
                >
                  {currentStep === 3 ? (autoSaving ? 'Generating...' : 'Generate Draft') : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Editor view after wizard completion
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
                <h1 className="text-xl font-semibold text-gray-900">{wizardData.applicationTitle || 'Grant Application'}</h1>
                <p className="text-sm text-gray-600">Edit and refine your application sections</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">Export Draft</Button>
              <Button>Save & Close</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Section Navigation */}
        <div className="w-80 bg-white border-r border-slate-border p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Application Sections</h2>
            <p className="text-sm text-gray-600">Click on any section to edit</p>
          </div>
          
          <WizardStepper
            steps={sectionSteps}
            currentStepIndex={sectionSteps.findIndex(step => step.id === currentSection)}
            onStepClick={(index) => setCurrentSection(sectionSteps[index].id)}
            lastSaved={lastSaved}
            autoSaving={autoSaving}
            layout="vertical"
          />
        </div>

        {/* Main Content - AI Section Editor */}
        <div className="flex-1">
          <AISectionEditor
            sectionTitle={sectionSteps.find(s => s.id === currentSection)?.title || ''}
            content={sections[currentSection] || ''}
            onContentChange={(content) => setSections(prev => ({ ...prev, [currentSection]: content }))}
            onSave={handleSectionSave}
            onRegenerateAI={handleRegenerateAI}
            comments={comments}
            lastSaved={lastSaved}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationWriter; 
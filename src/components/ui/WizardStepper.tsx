import React from 'react';

interface Step {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface WizardStepperProps {
  steps: Step[];
  currentStepIndex: number;
  onStepClick: (stepIndex: number) => void;
  lastSaved?: string;
  autoSaving?: boolean;
  layout?: 'horizontal' | 'vertical';
}

export const WizardStepper: React.FC<WizardStepperProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
  lastSaved,
  autoSaving = false,
  layout = 'horizontal'
}) => {
  if (layout === 'vertical') {
    return (
      <div className="space-y-4">
        {/* Autosave Status */}
        {(lastSaved || autoSaving) && (
          <div className="flex items-center text-sm text-gray-600 mb-4">
            {autoSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-consultant-blue border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-success-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Last saved {lastSaved}</span>
              </>
            )}
          </div>
        )}

        {/* Vertical Steps */}
        {steps.map((step, index) => {
          const isClickable = index <= currentStepIndex || step.isCompleted;
          
          return (
            <div key={step.id} className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                    step.isActive
                      ? 'border-consultant-blue bg-consultant-blue text-white'
                      : step.isCompleted
                      ? 'border-success-green bg-success-green text-white'
                      : isClickable
                      ? 'border-gray-300 bg-white text-gray-600 hover:border-consultant-blue'
                      : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {step.isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </button>
                
                {/* Connecting line for vertical layout */}
                {index < steps.length - 1 && (
                  <div className="w-px h-8 bg-slate-border ml-4 mt-2"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={`text-left w-full p-3 rounded-lg border transition-colors ${
                    step.isActive
                      ? 'border-consultant-blue bg-consultant-blue/5'
                      : isClickable
                      ? 'border-slate-border bg-white hover:border-consultant-blue hover:bg-consultant-blue/5'
                      : 'border-slate-border bg-gray-50 cursor-not-allowed'
                  }`}
                >
                  <div className={`font-medium ${
                    step.isActive ? 'text-consultant-blue' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {step.description}
                  </div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Original horizontal layout
  return (
    <div className="bg-white">
      {/* Progress Bar and Steps */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isClickable = index <= currentStepIndex || step.isCompleted;
            
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => isClickable && onStepClick(index)}
                    disabled={!isClickable}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                      step.isActive
                        ? 'border-consultant-blue bg-consultant-blue text-white'
                        : step.isCompleted
                        ? 'border-success-green bg-success-green text-white'
                        : isClickable
                        ? 'border-gray-300 bg-white text-gray-600 hover:border-consultant-blue'
                        : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {step.isCompleted ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </button>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${
                      step.isActive ? 'text-consultant-blue' : 'text-gray-900'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {step.description}
                    </div>
                  </div>
                </div>
                
                {/* Progress line between steps */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-slate-border mx-4 mt-[-20px]"></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Autosave Status */}
      {(lastSaved || autoSaving) && (
        <div className="px-6 py-3 border-t border-slate-border bg-slate-bg">
          <div className="flex items-center text-sm text-gray-600">
            {autoSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-consultant-blue border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-success-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Last saved {lastSaved}</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 
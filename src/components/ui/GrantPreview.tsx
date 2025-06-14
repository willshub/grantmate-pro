import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Button } from './Button';
import type { Grant } from '../../types';

interface GrantPreviewProps {
  grant: Grant;
  onAttachToClient: () => void;
  onViewDetails: () => void;
  isDeadlineSoon?: boolean;
}

export const GrantPreview: React.FC<GrantPreviewProps> = ({
  grant,
  onAttachToClient,
  onViewDetails,
  isDeadlineSoon = false,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysUntilDeadline = () => {
    const deadline = new Date(grant.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDeadline();

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 bg-white border-slate-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-gray-900 text-lg font-semibold leading-tight">
              {grant.funding_opportunity_number}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {grant.category}
            </p>
          </div>
          <div className={`px-2 py-1 text-xs font-medium rounded-full ${
            isDeadlineSoon || daysLeft <= 30
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}>
            {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Program Summary */}
          <p className="text-sm text-gray-700 line-clamp-3">
            {grant.program_summary}
          </p>
          
          {/* Key Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500 font-medium">Deadline:</span>
              <p className="text-gray-900">{formatDate(grant.deadline)}</p>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Max Award:</span>
              <p className="text-gray-900 font-semibold">
                {formatCurrency(grant.max_award_amount)}
              </p>
            </div>
          </div>
          
          <div>
            <span className="text-gray-500 font-medium text-sm">Total Funding:</span>
            <p className="text-gray-900 font-semibold">
              {formatCurrency(grant.total_funding)}
            </p>
          </div>
          
          {/* Eligibility */}
          <div>
            <span className="text-gray-500 font-medium text-sm">Eligibility:</span>
            <p className="text-sm text-gray-700 line-clamp-2 mt-1">
              {grant.eligibility}
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onViewDetails}
              className="flex-1"
            >
              View Details
            </Button>
            <Button
              size="sm"
              onClick={onAttachToClient}
              className="flex-1 bg-consultant-blue hover:bg-consultant-blue/90"
            >
              Attach to Client
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 
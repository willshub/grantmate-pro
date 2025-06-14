import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Button } from './Button';
import type { Client } from '../../types';

interface ClientCardProps {
  client: Client;
  lastUpdated: string;
  onViewDetails: () => void;
  onNewApplication: () => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({
  client,
  lastUpdated,
  onViewDetails,
  onNewApplication,
}) => {
  const navigate = useNavigate();

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate time since last update
  const getTimeSinceUpdate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return '1 month ago';
    return `${diffMonths} months ago`;
  };

  const handleViewDetails = () => {
    // For now, navigate to the client form in edit mode
    navigate(`/client-form?edit=${client.id}`);
  };

  const handleNewApplication = () => {
    // Navigate to application writer with this client pre-selected
    navigate(`/application-writer?client=${client.id}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 bg-white border-slate-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-gray-900 text-lg font-semibold">
              {client.name}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {client.industry_focus_area}
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {client.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-consultant-blue/10 text-consultant-blue rounded-full"
              >
                {tag}
              </span>
            ))}
            {client.tags.length > 2 && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                +{client.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Mission Statement Preview */}
          <p className="text-sm text-gray-700 line-clamp-2">
            {client.mission_statement}
          </p>
          
          {/* Stats and Last Updated */}
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600">
              Created {formatDate(client.created_at)}
            </div>
            <div className="text-gray-600">
              Updated {getTimeSinceUpdate(client.updated_at)}
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="text-xs text-gray-500">
            Contact: {client.contact_person}
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewDetails}
              className="flex-1"
            >
              View Details
            </Button>
            <Button
              size="sm"
              onClick={handleNewApplication}
              className="flex-1 bg-consultant-blue hover:bg-blue-700"
            >
              New Application
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 
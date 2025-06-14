import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const ClientForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Check if we're editing (from URL params)
  const searchParams = new URLSearchParams(location.search);
  const editingClientId = searchParams.get('edit');
  const isEditing = !!editingClientId;

  const [formData, setFormData] = useState({
    name: '',
    industry_focus_area: '',
    mission_statement: '',
    contact_person: '',
    contact_info: '',
    tags: [] as string[]
  });

  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [error, setError] = useState('');

  // Load existing client data if editing
  useEffect(() => {
    const loadClientData = async () => {
      if (!isEditing || !editingClientId) return;
      
      setInitialLoading(true);
      try {
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('id', editingClientId)
          .eq('user_id', user?.id)
          .single();

        if (error) {
          console.error('Error loading client:', error);
          setError('Failed to load client data');
          return;
        }

        if (data) {
          setFormData({
            name: data.name,
            industry_focus_area: data.industry_focus_area,
            mission_statement: data.mission_statement,
            contact_person: data.contact_person,
            contact_info: data.contact_info,
            tags: data.tags || []
          });
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setInitialLoading(false);
      }
    };

    loadClientData();
  }, [isEditing, editingClientId, user?.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      setError('You must be logged in to save a client');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const clientData = {
        ...formData,
        user_id: user.id,
        updated_at: new Date().toISOString()
      };

      if (isEditing && editingClientId) {
        // Update existing client
        const { error } = await supabase
          .from('clients')
          .update(clientData)
          .eq('id', editingClientId)
          .eq('user_id', user.id);

        if (error) {
          console.error('Error updating client:', error);
          setError('Failed to update client. Please try again.');
          return;
        }
      } else {
        // Create new client
        const { error } = await supabase
          .from('clients')
          .insert([{
            ...clientData,
            created_at: new Date().toISOString()
          }]);

        if (error) {
          console.error('Error creating client:', error);
          setError('Failed to create client. Please try again.');
          return;
        }
      }
      
      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const industryOptions = [
    'Education & Workforce Development',
    'Public Health & Community Services',
    'Environmental & Sustainability',
    'Arts & Culture',
    'Technology & Innovation',
    'Social Services',
    'Community Development',
    'Research & Development',
    'Youth & Family Services',
    'Economic Development',
    'Other'
  ];

  // Show loading spinner while loading client data
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-bg flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-consultant-blue mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading client data...</p>
        </div>
      </div>
    );
  }

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
                <h1 className="text-xl font-semibold text-gray-900">
                  {isEditing ? 'Edit Client' : 'New Client'}
                </h1>
                <p className="text-sm text-gray-600">
                  {isEditing ? 'Update client information' : 'Create a new client profile'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card className="bg-white border-slate-border">
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Client Information' : 'Client Information'}</CardTitle>
            <CardDescription>
              {isEditing 
                ? 'Update the client details below' 
                : 'Enter the details for your new client to get started with grant applications'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent"
                  placeholder="Enter the organization name"
                />
              </div>

              {/* Industry Focus Area */}
              <div>
                <label htmlFor="industry_focus_area" className="block text-sm font-medium text-gray-700 mb-2">
                  Industry Focus Area *
                </label>
                <select
                  id="industry_focus_area"
                  name="industry_focus_area"
                  required
                  value={formData.industry_focus_area}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent"
                >
                  <option value="">Select an industry focus</option>
                  {industryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact Person */}
              <div>
                <label htmlFor="contact_person" className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Contact Person *
                </label>
                <input
                  id="contact_person"
                  name="contact_person"
                  type="text"
                  required
                  value={formData.contact_person}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent"
                  placeholder="Enter the primary contact name"
                />
              </div>

              {/* Contact Information */}
              <div>
                <label htmlFor="contact_info" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Information *
                </label>
                <input
                  id="contact_info"
                  name="contact_info"
                  type="text"
                  required
                  value={formData.contact_info}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent"
                  placeholder="Email and/or phone number"
                />
              </div>

              {/* Mission Statement */}
              <div>
                <label htmlFor="mission_statement" className="block text-sm font-medium text-gray-700 mb-2">
                  Mission Statement *
                </label>
                <textarea
                  id="mission_statement"
                  name="mission_statement"
                  required
                  rows={4}
                  value={formData.mission_statement}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent resize-vertical"
                  placeholder="Describe the organization's mission and goals. This will help with grant matching and application writing."
                />
                <p className="text-xs text-gray-500 mt-1">
                  A clear mission statement helps our AI generate more relevant grant applications.
                </p>
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    id="tags"
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-3 py-2 border border-slate-border rounded-lg focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent"
                    placeholder="Add tags (e.g., Rural, Technology, Youth)"
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-consultant-blue/10 text-consultant-blue text-sm rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-consultant-blue/60 hover:text-consultant-blue"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Tags help categorize and filter clients, and improve grant matching.
                </p>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="min-w-[120px]"
                >
                  {loading ? 'Saving...' : (isEditing ? 'Update Client' : 'Create Client')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientForm; 
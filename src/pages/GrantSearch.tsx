import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useGrantFinder } from '../hooks/useGrantFinder';
import type { FoundGrant } from '../lib/grantFinder';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/Dialog';

interface SearchHistoryItem {
  query: string;
  timestamp: Date;
  isRefinement: boolean;
}

const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  
  return date.toLocaleDateString();
};

const GrantSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoundGrant[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);
  const [clarificationDialog, setClarificationDialog] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: ''
  });

  const { searchGrants, isSearching, error, clearError } = useGrantFinder();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setHasSearched(true);
    clearError();
    setSearchHistory(prev => [...prev, {
      query: searchQuery,
      timestamp: new Date(),
      isRefinement: false
    }]);
    try {
      const result = await searchGrants({ searchTerm: searchQuery });
      if (Array.isArray(result)) {
        setSearchResults(result);
      } else if ('needsClarification' in result) {
        setClarificationDialog({
          isOpen: true,
          message: result.message
        });
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setSearchResults([]);
    }
  };

  const handleClarificationSubmit = async (clarifiedQuery: string) => {
    setClarificationDialog({ isOpen: false, message: '' });
    setSearchQuery(clarifiedQuery);
    
    // Add refinement to search history
    setSearchHistory(prev => [...prev, {
      query: clarifiedQuery,
      timestamp: new Date(),
      isRefinement: true
    }]);
    
    try {
      const grants = await searchGrants({
        searchTerm: clarifiedQuery
      });
      setSearchResults(grants);
    } catch (err) {
      console.error('Search failed:', err);
      setSearchResults([]);
    }
  };

  const handleHistoryItemClick = async (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
    clearError();
    try {
      const result = await searchGrants({ searchTerm: query });
      if (Array.isArray(result)) {
        setSearchResults(result);
      } else if ('needsClarification' in result) {
        setClarificationDialog({
          isOpen: true,
          message: result.message
        });
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setSearchResults([]);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  // COMMENTED OUT FOR TESTING - Rate limiting
  // const isRateLimited = searchCount >= 3;
  const isRateLimited = false; // Disabled for testing

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white border-b border-slate-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-consultant-blue rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">GM</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">GrantMate Pro</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/auth/signin">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button className="shadow-sm">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Find Your Perfect Grant
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Search thousands of funding opportunities with AI-powered matching.
            {/* COMMENTED OUT FOR TESTING - searchCount > 0 && searchCount < 3 && (
              <span className="block mt-2 text-sm text-gray-500">
                {3 - searchCount} free searches remaining
              </span>
            ) */}
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="e.g., community development, environmental education, small business..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isRateLimited}
                className="w-full pl-12 pr-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-consultant-blue focus:border-transparent shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <Button
              type="submit"
              disabled={isSearching || !searchQuery.trim() || isRateLimited}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 text-sm"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </form>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <svg 
                  className={`w-4 h-4 transition-transform ${isHistoryExpanded ? 'rotate-0' : '-rotate-90'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                <span>Search History</span>
              </button>
              <button
                onClick={clearHistory}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear History
              </button>
            </div>
            
            {isHistoryExpanded && (
              <div className="space-y-2">
                {searchHistory.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      item.isRefinement
                        ? 'bg-consultant-blue/10 text-consultant-blue hover:bg-consultant-blue/20'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <button
                      onClick={() => handleHistoryItemClick(item.query)}
                      className="flex items-center space-x-2 flex-1 text-left"
                    >
                      {item.isRefinement && (
                        <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                      <span className="truncate">{item.query}</span>
                    </button>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 max-w-2xl mx-auto">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* COMMENTED OUT FOR TESTING - Rate Limit Message */}
        {/* {isRateLimited && (
          <div className="text-center mb-8">
            <Card className="border-orange-200 bg-orange-50 max-w-lg mx-auto">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-orange-900 mb-2">
                  Free Search Limit Reached
                </h3>
                <p className="text-orange-700 mb-4">
                  You've used your 3 free searches. Sign up to continue finding grants with unlimited searches!
                </p>
                <Link to="/auth/signup">
                  <Button className="w-full">
                    Start Free Trial - Unlimited Searches
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )} */}

        {/* Search Results */}
        {hasSearched && !isSearching && (
          <div>
            {searchResults.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {searchResults.length} grants found
                  </h2>
                  <span className="text-xs text-gray-500">
                    AI-powered results for "{searchQuery}"
                  </span>
                </div>
                <div className="space-y-3">
                  {searchResults.map((grant, index) => (
                    <Card key={index} className="border-slate-border hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 pr-4">
                            <CardTitle className="text-lg text-consultant-blue hover:text-consultant-blue/80 mb-1 leading-tight">
                              {grant.title}
                            </CardTitle>
                          </div>
                          <div className="flex flex-wrap gap-1 ml-2 flex-shrink-0">
                            {grant.category.map((category, idx) => (
                              <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-consultant-blue/10 text-consultant-blue font-medium">
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* Grant Details Grid */}
                        <div className="grid md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg text-sm">
                          <div>
                            <p className="text-xs text-gray-600 mb-0.5 font-medium">Opportunity #</p>
                            <p className="text-xs font-mono text-gray-900">{grant.opportunityNumber}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-0.5 font-medium">Expected Awards</p>
                            <p className="text-xs text-gray-900 font-medium text-green-600">🏆 {grant.expectedAwards || 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-0.5 font-medium">Closing Date</p>
                            <p className="text-xs text-gray-900 font-medium text-red-600">📅 {grant.deadline}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-0.5 font-medium">Posted Date</p>
                            <p className="text-xs text-gray-900">{grant.postedDate}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-xs text-gray-600 mb-0.5 font-medium">Total Program Funding</p>
                            <p className="text-xs text-gray-900 font-medium">{grant.totalFunding}</p>
                          </div>
                          {/* Eligibility moved here */}
                        {grant.eligibility.length > 0 && (
                            <div className="md:col-span-3">
                              <p className="text-xs text-gray-600 mb-1 font-medium">Eligibility</p>
                              <div className="flex flex-wrap gap-1">
                              {grant.eligibility.map((eligibility, idx) => (
                                  <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-green-50 text-green-700 border border-green-200">
                                  {eligibility}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        </div>

                        {/* Details */}
                        <div>
                          <p className="text-xs text-gray-600 mb-1 font-medium">Description</p>
                          <p className="text-sm text-gray-700 leading-relaxed">{grant.description}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                          <div className="flex gap-2">
                            {grant.applicationLink && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-consultant-blue border-consultant-blue hover:bg-consultant-blue hover:text-white text-xs"
                                onClick={() => {
                                  window.open(grant.applicationLink, '_blank', 'noopener,noreferrer');
                                }}
                              >
                                🔗 Apply Here
                              </Button>
                            )}
                            {grant.moreInfoUrl && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-900 text-xs"
                                onClick={() => {
                                  window.open(grant.moreInfoUrl, '_blank', 'noopener,noreferrer');
                                }}
                              >
                                📋 More Info
                              </Button>
                            )}
                            <Button 
                              size="sm"
                              className="bg-consultant-blue hover:bg-consultant-blue/90 text-xs"
                              onClick={() => {
                                window.location.href = '/auth/signup';
                              }}
                            >
                              Save & Get Help Writing
                            </Button>
                          </div>
                          <span className="text-xs text-gray-500">
                            Sign up for AI assistance
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* CTA after results */}
                <div className="mt-8 text-center">
                  <Card className="border-consultant-blue/20 bg-consultant-blue/5 max-w-2xl mx-auto">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-12 h-12 bg-consultant-blue/10 rounded-2xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-consultant-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Ready to Apply for These Grants?
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        Create your free account to save these grants, get AI writing assistance, and manage your applications.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Link to="/auth/signup">
                          <Button className="px-6">
                            Start Free Trial
                          </Button>
                        </Link>
                        <Link to="/">
                          <Button variant="outline" className="px-6">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No grants found
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Try adjusting your search terms or explore different categories.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setHasSearched(false);
                    clearError();
                  }}
                >
                  Start New Search
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Sample searches for inspiration */}
        {!hasSearched && (
          <div className="mt-12 text-center">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Popular searches:
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {['Community Development', 'Environment', 'Education', 'Health', 'Economic Development', 'Arts & Culture', 'Rural Development', 'Research'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  disabled={isRateLimited}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Clarification Dialog */}
      <Dialog 
        open={clarificationDialog.isOpen} 
        onOpenChange={(open: boolean) => setClarificationDialog(prev => ({ ...prev, isOpen: open }))}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Clarify Your Search</DialogTitle>
            <DialogDescription>
              Which Community Development grants are you interested in?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 gap-2">
              {[
                'Economic Development',
                'Social Development',
                'Health',
                'Innovation',
                'Climate/Environment'
              ].map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  className="w-full justify-start text-left hover:bg-gray-50"
                  onClick={() => handleClarificationSubmit(`${searchQuery} focusing on ${option}`)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setClarificationDialog({ isOpen: false, message: '' })}
                className="text-gray-600 hover:text-gray-900"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GrantSearch; 
import { useState, useCallback } from 'react';
import GrantFinderService, { type GrantFinderQuery, type FoundGrant } from '../lib/grantFinder';

export interface UseGrantFinderReturn {
  searchGrants: (query: GrantFinderQuery) => Promise<FoundGrant[] | { needsClarification: true; message: string }>;
  getGrantSuggestions: (orgName: string, mission: string, focusAreas: string[]) => Promise<FoundGrant[] | { needsClarification: true; message: string }>;
  isSearching: boolean;
  error: string | null;
  clearError: () => void;
  lastSearchQuery: string | null;
}

export const useGrantFinder = (): UseGrantFinderReturn => {
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchQuery, setLastSearchQuery] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const searchGrants = useCallback(async (query: GrantFinderQuery): Promise<FoundGrant[] | { needsClarification: true; message: string }> => {
    setIsSearching(true);
    setError(null);
    setLastSearchQuery(query.searchTerm);

    try {
      const grants = await GrantFinderService.findGrants(query);
      return grants;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search grants';
      setError(errorMessage);
      throw err;
    } finally {
      setIsSearching(false);
    }
  }, []);

  const getGrantSuggestions = useCallback(async (
    orgName: string,
    mission: string,
    focusAreas: string[]
  ): Promise<FoundGrant[] | { needsClarification: true; message: string }> => {
    setIsSearching(true);
    setError(null);
    setLastSearchQuery(`Suggestions for ${orgName}`);

    try {
      const grants = await GrantFinderService.getGrantSuggestions(orgName, mission, focusAreas);
      return grants;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get grant suggestions';
      setError(errorMessage);
      throw err;
    } finally {
      setIsSearching(false);
    }
  }, []);

  return {
    searchGrants,
    getGrantSuggestions,
    isSearching,
    error,
    clearError,
    lastSearchQuery,
  };
}; 
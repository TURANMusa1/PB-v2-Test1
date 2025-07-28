import { useState, useRef } from 'react';
import { searchService } from '../services/search';
import type { Candidate } from '../types/candidate';

interface SearchBarProps {
  onSearchResults: (candidates: Candidate[]) => void;
  onSearching: (searching: boolean) => void;
  onQueryChange?: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearchResults, onSearching, onQueryChange, placeholder = "Search candidates..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      // If query is too short, don't search and let parent load all candidates
      onSearchResults([]);
      onSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      onSearching(true);
      
      const response = await searchService.searchCandidates(searchQuery, {
        per_page: 10
      });
      
      onSearchResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      onSearchResults([]);
    } finally {
      setIsSearching(false);
      onSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onQueryChange?.(newQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch(query);
    }
  };

  const handleSearch = () => {
    performSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onQueryChange?.('');
    // Clear search results and let parent load all candidates
    onSearchResults([]);
    onSearching(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
        
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isSearching || query.trim().length < 2}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-600 hover:text-indigo-800 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {isSearching ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>

        {/* Clear Button */}
        {query && !isSearching && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-12 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Tips */}
      {query.length > 0 && query.length < 2 && (
        <div className="mt-2 text-sm text-gray-500">
          Type at least 2 characters to search...
        </div>
      )}
    </div>
  );
};

export default SearchBar; 
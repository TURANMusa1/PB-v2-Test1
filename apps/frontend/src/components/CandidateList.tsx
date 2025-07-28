import { useState, useEffect, useCallback } from 'react';
import { candidateService } from '../services/candidate';
import type { Candidate, CreateCandidateData, UpdateCandidateData } from '../types/candidate';
import SearchBar from './SearchBar';
import Modal from './Modal';
import CandidateForm from './CandidateForm';
import Notification from './Notification';

const CandidateList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Track actual search query

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Notification states
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'interviewed', label: 'Interviewed' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' },
  ];

  useEffect(() => {
    // Only load candidates if not searching
    if (!isSearching) {
      const fetchCandidates = async () => {
        try {
          setLoading(true);
          const response = await candidateService.getCandidates({
            page: currentPage,
            search: searchQuery, // Use searchQuery from state
            status: statusFilter,
            sort_by: 'created_at',
            sort_order: 'desc',
          });
          setCandidates(response.data);
          setTotalPages(response.pagination.last_page);
        } catch (err: any) {
          setError(err.response?.data?.message || 'Failed to load candidates');
        } finally {
          setLoading(false);
        }
      };
      
      fetchCandidates();
    }
  }, [currentPage, searchQuery, statusFilter, isSearching]);

  const handleSearchResults = useCallback((searchResults: Candidate[]) => {
    setCandidates(searchResults);
    // Reset pagination when searching
    setCurrentPage(1);
    setTotalPages(1);
  }, []);

  const handleSearchingChange = useCallback((searching: boolean) => {
    setIsSearching(searching);
    // If search is cleared, the useEffect will handle loading candidates
  }, []);

  const handleSearchQueryChange = useCallback((query: string) => {
    setSearchQuery(query);
    // Don't trigger search automatically - let user press Enter or click Search button
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({
      message,
      type,
      isVisible: true,
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      isVisible: false,
    }));
  };

  const handleAddCandidate = () => {
    setEditingCandidate(null);
    setShowModal(true);
  };

  const handleEditCandidate = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setShowModal(true);
  };

  const handleDeleteCandidate = async (id: number) => {
    if (!confirm('Are you sure you want to delete this candidate?')) {
      return;
    }

    try {
      const response = await candidateService.deleteCandidate(id);
      setCandidates(prev => prev.filter(c => c.id !== id));
      showNotification(response.message, 'success');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to delete candidate';
      showNotification(errorMessage, 'error');
      setError(errorMessage);
    }
  };

  const handleFormSubmit = async (data: CreateCandidateData | UpdateCandidateData) => {
    try {
      setFormLoading(true);
      
      if (editingCandidate) {
        // Update existing candidate
        const response = await candidateService.updateCandidate(editingCandidate.id, data as UpdateCandidateData);
        showNotification(response.message, 'success');
      } else {
        // Create new candidate
        const response = await candidateService.createCandidate(data as CreateCandidateData);
        showNotification(response.message, 'success');
      }
      
      setShowModal(false);
      setEditingCandidate(null);
      
      // Reload candidates after a short delay to show the notification
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to save candidate';
      showNotification(errorMessage, 'error');
      setError(errorMessage);
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowModal(false);
    setEditingCandidate(null);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      reviewed: 'bg-yellow-100 text-yellow-800',
      shortlisted: 'bg-purple-100 text-purple-800',
      interviewed: 'bg-orange-100 text-orange-800',
      hired: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading && candidates.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Candidates</h2>
        <button 
          onClick={handleAddCandidate}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add Candidate
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-6">
        <SearchBar
          onSearchResults={handleSearchResults}
          onSearching={handleSearchingChange}
          onQueryChange={handleSearchQueryChange}
          placeholder="Search by name, email, position, or company..."
        />
      </div>

      {/* Status Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex gap-4">
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Candidates List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-indigo-700">
                          {candidate.first_name.charAt(0)}{candidate.last_name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {candidate.first_name} {candidate.last_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {candidate.current_company || 'No company'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {candidate.position_applied || 'Not specified'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {candidate.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(candidate.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEditCandidate(candidate)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteCandidate(candidate.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {candidates.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No candidates</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding a new candidate.</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && !isSearching && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Candidate Form Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleFormCancel}
        title={editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}
        size="xl"
      >
        <CandidateForm
          candidate={editingCandidate || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          loading={formLoading}
        />
      </Modal>

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        duration={3000}
      />
    </div>
  );
};

export default CandidateList; 
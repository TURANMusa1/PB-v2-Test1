import api from './api';
import type { Candidate, CandidateListResponse } from '../types/candidate';

export const searchService = {
  // Search candidates with real-time results
  async searchCandidates(query: string, params: {
    page?: number;
    per_page?: number;
  } = {}): Promise<CandidateListResponse> {
    const response = await api.get('/candidates-search', { 
      params: { 
        q: query,
        ...params 
      } 
    });
    return response.data;
  },
}; 